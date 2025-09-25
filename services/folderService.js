async function findOrCreateFolder(prisma, name, userId, parentId) {
  const existing = await prisma.folder.findFirst({
    where: { name, userId, parentId }
  });

  if (existing) return existing;

  return await prisma.folder.create({
    data: { name, userId, parentId }

  });
}

async function uploadFolder(prisma, userId, files) {
    for (const file of files) {
        const parts = file.originalname.split('/');
        const fileName = parts.pop();
        let parentId = null;
        console.log(`Folder: folders: ${parts} \n File: ${fileName}`);
       
        // Create/find each folder in the file's path
        for (const folderName of parts) {
            const folder = await findOrCreateFolder(prisma, folderName, userId, parentId);
            parentId = folder.id;
        }

        const fileData = {
            name: fileName,
            size: file.size,
            mimeType: file.mimetype,
            data: file.buffer,
            user: {
                connect: { id: userId }
            }
        };

        if (parentId) {
            fileData.folder = {
                connect: { id: parentId }
            };
        }

        await prisma.file.create({ data: fileData });
    }
    
}

module.exports = { uploadFolder };
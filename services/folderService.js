async function findOrCreateFolder(prisma, name, userId, parentId) {
  const existing = await prisma.folder.findFirst({
    where: { name, userId, parentId },
  });

  if (existing) return existing;

  return await prisma.folder.create({
    data: { name, userId, parentId },
  });
}

export async function uploadFolder(prisma, userId, files, parentId = null) {
  for (const file of files) {
    const parts = file.originalname.split("/");
    const fileName = parts.pop();

    // IMPORTANT: start fresh for each file
    let currentParentId = parentId;

    // Create/find each folder in the file's path
    for (const folderName of parts) {
      const folder = await findOrCreateFolder(
        prisma,
        folderName,
        userId,
        currentParentId,
      );

      currentParentId = folder.id; // only mutate the local variable
    }

    const fileData = {
      name: fileName,
      size: file.size,
      mimeType: file.mimetype,
      data: file.buffer,
      user: { connect: { id: userId } },
      folder: currentParentId
        ? { connect: { id: currentParentId } }
        : undefined,
    };

    await prisma.file.create({ data: fileData });
  }
}

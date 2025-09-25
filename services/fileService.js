async function fetchFileById(prisma, fileId) {
  const file = await prisma.file.findUnique({
    where: { id: fileId }
  });
  
  if (!file) throw new Error('File not found');

  return { data: file.data, mimeType: file.mimeType, name: file.name };
}

module.exports = { fetchFileById };
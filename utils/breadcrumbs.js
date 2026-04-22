export async function getBreadcrumb(prisma, folderId) {
  const path = [];
  let current = await prisma.folder.findUnique({ where: { id: folderId } });

  while (current) {
    path.push(current);
    if (!current.parentId) break;
    current = await prisma.folder.findUnique({
      where: { id: current.parentId },
    });
  }

  return path.reverse();
}

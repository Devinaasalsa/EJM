function exclude<Mappingcode, created_at extends keyof Mappingcode>(
  mappingcode: Mappingcode,
  createdAt: created_at,
): Omit<Mappingcode, created_at> {
    delete mappingcode[createdAt]
  return mappingcode
}

// function main() {
//   const user = await prisma.user.findUnique({ where: 1 })
//   const userWithoutPassword = exclude(user, ['password'])
// }
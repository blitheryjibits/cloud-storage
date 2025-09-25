const prisma = require('./db/prisma');
const bcrypt = require('bcrypt');

async function main() {
    await prisma.user.deleteMany({ where: { username: "testuser" } });

    const hashedPassword = await bcrypt.hash("testpassword", 10);
    const user = await prisma.user.create({
        data: {
            username: "testuser",
            password: hashedPassword,
            email: "testuser@example.com"
        }
    })
    console.log('User created:', user);
}

main()
.catch(e => {
    console.error(e.message)
})
.finally(async () => {
    await prisma.$disconnect()
})
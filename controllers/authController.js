import bcrypt from "bcrypt";
import { prisma } from "../db/prisma.js";

const controller = {
  register: async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
        },
      });

      // Add a default root directory for user storage
      const defaultFolder = await prisma.folder.upsert({
        where: {
          name_userId_parentId: {
            name: "Root",
            userId: user.id,
            parentId: "",
          },
        },
        update: {},
        create: {
          name: "Root",
          userId: user.id,
        },
      });

      res.redirect("/api/auth/login");
    } catch (error) {
      console.error("Error creating user:", error);
      next(error);
    }
  },
};

export default controller;

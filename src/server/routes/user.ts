import { CreateUserSchema } from "@/shared/api";
import { prisma } from "../db";
import { procedure, router } from "../trpc";
import bcrypt from "bcryptjs";

export const userRouter = router({
  create: procedure.input(CreateUserSchema).mutation(async ({ input }) => {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      throw new Error("Ошибка при создании пользователя.");
    }
  }),
});

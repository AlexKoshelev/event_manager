import { CreateUserSchema } from "@/shared/api";
import { prisma } from "../db";
import { procedure, router } from "../trpc";
import bcrypt from "bcryptjs";
import { getSession } from "next-auth/react";
export const userRouter = router({
  create: procedure
    .input(CreateUserSchema)
    .mutation(async ({ input }, { req }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      console.log("req", req);
      try {
        const user = await prisma.user.create({
          data: {
            ...input,
            password: hashedPassword,
          },
        });
        const session = await getSession({ req });
        if (session) {
          req.session.set("user", user);
          await req.session.save();
        }

        return user;
      } catch (error) {
        throw new Error("Ошибка при создании пользователя.");
      }
    }),
});

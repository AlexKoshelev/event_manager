import RegisterForm from "@/features/create-event/ui/registerForm";
import { CreateUserSchema, trpc } from "@/shared/api";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const { mutate } = trpc.user.create.useMutation({
    onSuccess: () => {
      router.push(`/`);
    },
  });

  const handleSubmit = (data: CreateUserSchema) => {
    mutate(data);
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}

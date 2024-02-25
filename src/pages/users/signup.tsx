import RegisterForm from "@/features/create-event/ui/registerForm";
import { CreateUserSchema, trpc } from "@/shared/api";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  console.log("router", router);

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

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  console.log("session", session);

  return (
    <nav className="bg-gray-800 text-white p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="text-lg font-semibold"
        >
          Resault school
        </button>
        <div className="flex space-x-4">
          {session.status === "authenticated" && (
            <>
              <button
                onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition duration-300"
              >
                {session.data.user.name}
              </button>
              {router.pathname === "/events/create" ? (
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded transition duration-300"
                >
                  Назад
                </button>
              ) : (
                <button
                  onClick={() => router.push("/events/create")}
                  className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded transition duration-300"
                >
                  Создать событие
                </button>
              )}
            </>
          )}
          {session.status === "unauthenticated" && (
            <>
              <button
                onClick={() => router.push("/api/auth/signin")}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition duration-300"
              >
                Войти
              </button>
              <button
                onClick={() => router.push("/users/signup")}
                className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded transition duration-300"
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

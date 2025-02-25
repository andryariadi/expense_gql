import FormLogin from "@/components/FormLogin";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="b-fuchsia-500 min-h-screen flex items-center justify-center">
      <div className="b-rose-500 w-full max-w-5xl flex items-center">
        {/* Form */}
        <FormLogin />

        {/* Image */}
        <div className="b-fuchsia-500">
          <div className="relative size-[30rem]">
            <Image src="/login.svg" alt="Signup" fill />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

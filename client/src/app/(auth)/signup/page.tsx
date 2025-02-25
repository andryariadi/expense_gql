import FormSignup from "@/components/FormSignup";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <main className="b-fuchsia-500 min-h-screen flex items-center justify-center">
      <div className="b-rose-500 w-full max-w-5xl flex items-center">
        {/* Image */}
        <div className="b-fuchsia-500">
          <div className="relative size-[30rem]">
            <Image src="/signup.svg" alt="Signup" fill />
          </div>
        </div>

        {/* Form */}
        <FormSignup />
      </div>
    </main>
  );
};

export default SignUpPage;

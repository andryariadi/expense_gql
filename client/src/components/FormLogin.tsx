"use client";

import InputField from "./InputField";
import { CiUser } from "react-icons/ci";
import { VscLockSmall } from "react-icons/vsc";
import { PiEye } from "react-icons/pi";
import { RiEyeCloseFill } from "react-icons/ri";
import { TbLoader } from "react-icons/tb";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValidation } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const [openPass, setOpenPass] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
  });

  const [login] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleSubmitLogin: SubmitHandler<z.infer<typeof LoginFormValidation>> = async (data) => {
    console.log({ data }, "<---loginForm");

    try {
      const res = await login({
        variables: {
          input: data,
        },
      });

      console.log({ res }, "<---resLoginForm");

      if (res.data.login) {
        router.refresh();

        toast.success("Logged in successfully", {
          style: toastStyle,
        });

        reset();
      }
    } catch (error) {
      console.log(error, "<---errorLoginForm");
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";

      toast.error(errorMessage, {
        style: toastStyle,
      });
    }
  };

  console.log({ errors }, "<---loginForm");

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="b-sky-500 w-full min-h-[35rem] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full w-full max-w-md bg-gray-700 p-5 rounded-md border border-dark-500 space-y-7">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">
            Login to <span className="text-logo">Expense GQL</span>
          </h1>
          <p className="text-md text-gray-500">Join to keep track of your expenses</p>
        </div>

        {/* Form Input */}
        <div className="b-emerald-500 grid grid-cols-1 gap-8">
          <div className="relative">
            <InputField icon={<CiUser size={19} />} type="text" placeholder="Username" name="username" propData={{ ...register("username") }} />

            {errors.username && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.username.message as string}</p>}
          </div>

          <div className="relative">
            <InputField
              icon={<VscLockSmall size={22} />}
              passIcon={openPass ? <PiEye size={22} /> : <RiEyeCloseFill size={20} />}
              openPass={openPass}
              setOpenPass={setOpenPass}
              type={openPass ? "text" : "password"}
              placeholder="Password"
              propData={{ ...register("password") }}
            />

            {errors.password && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.password.message as string}</p>}
          </div>

          <motion.button
            className="py-3 px-4 w-full bg-gradient-to-r from-logo to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-logo transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <TbLoader scale={22} className="animate-spin mx-auto" /> : "Login"}
          </motion.button>
        </div>

        <div className="bg-gray-800 bg-opacity-50 px-8 py-4 text-sm">
          <p className="text-center text-gray-400">
            Dont have an account?
            <Link href="/signup" className="text-logo ml-2 inline-block hover:scale-110 transition-all duration-300">
              Singup
            </Link>
          </p>
        </div>
      </motion.div>
    </form>
  );
};

export default FormLogin;

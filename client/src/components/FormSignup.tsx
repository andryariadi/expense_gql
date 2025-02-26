"use client";

import InputField from "./InputField";
import { CiUser, CiCreditCard2 } from "react-icons/ci";
import { VscLockSmall } from "react-icons/vsc";
import { PiEye } from "react-icons/pi";
import { RiEyeCloseFill } from "react-icons/ri";
import { TbLoader } from "react-icons/tb";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GenderRadio from "./GenderRadio";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SingupFormValidation } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSignup = () => {
  const [openPass, setOpenPass] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"male" | "female">("male");

  const handleCheckboxChange = (gender?: "male" | "female") => {
    setValue("gender", gender ?? "male");
    setSelectedGender(gender ?? "male");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SingupFormValidation>>({
    resolver: zodResolver(SingupFormValidation),
    defaultValues: {
      gender: "male",
    },
  });

  const handleSubmitRegister: SubmitHandler<z.infer<typeof SingupFormValidation>> = async (data) => {
    console.log({ data }, "<---registerForm");
  };

  console.log({ errors }, "<---signupForm");

  return (
    <form onSubmit={handleSubmit(handleSubmitRegister)} className="b-sky-500 w-full min-h-[35rem] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full w-full max-w-md bg-gray-700 p-5 rounded-md border border-dark-500 space-y-7">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">
            Signup to <span className="bg-gradient-to-r from-logo to-pink-800 text-transparent bg-clip-text">Expense GQL</span>
          </h1>
          <p className="text-md text-gray-500">Join to keep track of your expenses</p>
        </div>

        {/* Form Input */}
        <div className="b-emerald-500 grid grid-cols-1 gap-8">
          <div className="relative">
            <InputField icon={<CiUser size={19} />} type="text" placeholder="Full Name" name="name" propData={{ ...register("name") }} />

            {errors.name && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.name.message as string}</p>}
          </div>

          <div className="relative">
            <InputField icon={<CiCreditCard2 size={19} />} type="text" placeholder="Username" name="username" propData={{ ...register("username") }} />

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

          <div className="relative g:col-span-2">
            <GenderRadio onRadioChange={handleCheckboxChange} selectedGender={selectedGender} errors={{ gender: errors?.gender as { message: string } }} />
          </div>

          <motion.button
            className="py-3 px-4 w-full bg-gradient-to-r from-logo to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-logo transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <TbLoader scale={22} className="animate-spin mx-auto" /> : "Sign Up"}
          </motion.button>
        </div>

        <div className="bg-gray-800 bg-opacity-50 px-8 py-4 text-sm">
          <p className="text-center text-gray-400">
            Already have an account?
            <Link href="/login" className="text-logo ml-2 inline-block hover:scale-110 transition-all duration-300">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </form>
  );
};

export default FormSignup;

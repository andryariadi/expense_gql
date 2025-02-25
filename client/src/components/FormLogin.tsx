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

const FormLogin = () => {
  const [openPass, setOpenPass] = useState(false);

  const loading = false;

  return (
    <form className="b-sky-500 w-full min-h-[35rem] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-full w-full max-w-md bg-gray-700 p-5 rounded-md border border-dark-500 space-y-7">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">
            Login to <span className="text-logo">Expense GQL</span>
          </h1>
          <p className="text-md text-gray-500">Join to keep track of your expenses</p>
        </div>

        {/* Form Input */}
        <div className="b-emerald-500 grid grid-cols-1 gap-5">
          <div className="relative">
            <InputField icon={<CiUser size={19} />} type="text" placeholder="Username" name="username" />

            {/* {errors.insuranceProvider && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.insuranceProvider.message as string}</p>} */}
          </div>

          <div className="relative">
            <InputField icon={<VscLockSmall size={22} />} passIcon={openPass ? <PiEye size={22} /> : <RiEyeCloseFill size={20} />} openPass={openPass} setOpenPass={setOpenPass} type={openPass ? "text" : "password"} placeholder="Password" />

            {/* {errors.insuranceProvider && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.insuranceProvider.message as string}</p>} */}
          </div>

          <motion.button
            className="py-3 px-4 w-full bg-gradient-to-r from-logo to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-logo transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
          >
            {loading ? <TbLoader scale={22} className="animate-spin mx-auto" /> : "Login"}
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

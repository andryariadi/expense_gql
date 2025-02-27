"use client";

import { motion } from "framer-motion";
import InputField from "./InputField";
import { CiCalendar, CiUser } from "react-icons/ci";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionFormValidation } from "@/libs/validations";
import { TbLoader } from "react-icons/tb";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import DatePicker from "react-datepicker";
import { Category, PaymentType } from "@/constant";
import { LiaSortAmountUpSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";

const UpdateTransactionForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setValue("date", date ?? new Date());
    setStartDate(date);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TransactionFormValidation),
  });

  const handleSubmitUpdateTransaction: SubmitHandler<z.infer<typeof TransactionFormValidation>> = async (data) => {
    console.log({ data }, "<---updateTransactionForm");
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitUpdateTransaction)} className="b-sky-700 w-full max-w-xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="b-fuchsia-500 p-5 space-y-7">
        <div className="b-emerald-500 grid grid-cols-3 gap-8">
          <div className="relative col-span-3">
            <InputField icon={<CiUser size={19} />} type="text" placeholder="Username" name="description" />

            {errors.description && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.description.message as string}</p>}
          </div>

          <div className="relative">
            <Select {...register("paymentType")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PaymentType.map((payment, i) => (
                    <SelectItem key={i} value={payment.name}>
                      <div className="flex items-center gap-2 bg-dark-300 border border-gray-700 p-1 rounded-lg">
                        <payment.icon size={20} />
                        <span>{payment.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Select {...register("category")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Category.map((cat, i) => (
                    <SelectItem key={i} value={cat.name}>
                      <div className="flex items-center gap-2 bg-dark-300 border border-gray-700 p-1 rounded-lg">
                        <cat.icon size={20} />
                        <span>{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <InputField icon={<LiaSortAmountUpSolid size={19} />} type="number" placeholder="Amount" name="amount" />

            {errors.amount && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.amount.message as string}</p>}
          </div>

          <div className="relative col-span-3 grid grid-cols-2 gap-8">
            <InputField icon={<CiLocationOn size={19} />} type="text" placeholder="Location" name="location1" />

            <div className="relative">
              <DatePicker selected={startDate} onChange={handleDateChange} timeInputLabel="Time:" dateFormat="yyyy/MM/dd - hh:mm aa" showTimeInput wrapperClassName="date-picker" />

              <CiCalendar size={22} className="absolute left-3 top-3 text-green-500" />

              {errors.date && startDate === null && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.date.message as string}</p>}
            </div>
          </div>

          <motion.button
            className="col-span-3 py-3 px-4 w-full bg-gradient-to-r from-logo to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-logo transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <TbLoader scale={22} className="animate-spin mx-auto" /> : "Update Transaction"}
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
};

export default UpdateTransactionForm;

"use client";

import { motion } from "framer-motion";
import InputField from "./InputField";
import { CiCalendar } from "react-icons/ci";
import { GiPayMoney } from "react-icons/gi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionFormValidation } from "@/libs/validations";
import { TbLoader } from "react-icons/tb";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Category, PaymentType } from "@/constant";
import { LiaSortAmountUpSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Transaction } from "@/types";
// import { updateTransactionAction } from "@/actions/transaction.action";
// import { createTransactionAction } from "@/actions/transaction.action";

const TransactionForm = ({ transaction }: { transaction?: Transaction }) => {
  console.log({ transaction }, "<---transactionForm");

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const router = useRouter();

  // const handleDateChange = (date: Date | null) => {
  //   setStartDate(date);
  //   setValue("date", date ?? new Date(), { shouldValidate: true });
  // };

  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(TransactionFormValidation),
    defaultValues: {
      description: transaction?.description ? transaction.description : "",
      paymentType: transaction?.paymentType ? transaction.paymentType : undefined,
      category: transaction?.category ? transaction.category : undefined,
      amount: transaction?.amount ? transaction.amount : undefined,
      location: transaction?.location ? transaction.location : "",
      date: transaction?.date ? new Date(Number(transaction.date)) : new Date(),
    },
  });

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    // refetchQueries: ["GetTransactions", "GetCategoryStatistics"], // how to update client-side rendered data in real time

    // how to update server-side rendered data in real time
    onCompleted: () => {
      // window.location.reload(); // it works but we see the page refreshed
      router.refresh(); // this is the best way to refresh the page without reloading
    },
  });

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    // refetchQueries: ["GetTransactions", "GetCategoryStatistics"], // how to update client-side rendered data in real time

    // how to update server-side rendered data in real time
    onCompleted: () => {
      // window.location.reload(); // it works but we see the page refreshed
      router.push("/"); // this is the best way to refresh the page without reloading
    },
  });

  const handleSubmitUpdateTransaction: SubmitHandler<z.infer<typeof TransactionFormValidation>> = async (data) => {
    console.log({ data }, "<---transactionForm");

    try {
      if (transaction) {
        const res = await updateTransaction({
          variables: {
            input: {
              ...data,
              transactionId: transaction._id,
            },
          },
        });

        if (res.data.updateTransaction) {
          toast.success("Transaction updated successfully", {
            style: toastStyle,
          });
        }

        // if using revalidatePath and sever action to update the data rendered on the server
        // const res = await updateTransactionAction(transaction._id, data);
        // if (res.data) {
        //   toast.success(res.message, {
        //     style: toastStyle,
        //   });

        //   router.push("/");
        // }

        console.log({ res }, "<---resTransactionForm");
      } else {
        const res = await createTransaction({
          variables: {
            input: data,
          },
        });

        if (res.data.createTransaction) {
          toast.success("Transaction created successfully", {
            style: toastStyle,
          });

          reset();
        }

        // if using revalidatePath to update the data rendered on the server
        // const res = await createTransactionAction(data);
        // if (res.data) {
        //   toast.success("Transaction created successfully", {
        //     style: toastStyle,
        //   });

        //   reset();
        // }

        console.log({ res }, "<---resTransactionForm");
      }
    } catch (error) {
      console.log(error, "<----errorTransactionForm");
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";

      toast.error(errorMessage, {
        style: toastStyle,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitUpdateTransaction)} className="b-sky-700 w-full max-w-xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="b-fuchsia-500 p-5 space-y-7">
        <div className="b-emerald-500 grid grid-cols-3 gap-8">
          <div className="relative col-span-3">
            <InputField icon={<GiPayMoney size={19} />} type="text" placeholder="Rent, Grocies, Salary, etc" name="description" propData={{ ...register("description") }} />

            {errors.description && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.description.message as string}</p>}
          </div>

          <div className="relative">
            <Controller
              name="paymentType"
              control={control}
              rules={{ required: "Payment type is required" }}
              render={({ field }) => (
                <Select onValueChange={(value) => field.onChange(value as "Cash" | "Card")} value={field.value}>
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
              )}
            />
            {errors.paymentType && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.paymentType.message}</p>}

            {errors.paymentType && !watch("paymentType") && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.paymentType.message as string}</p>}
          </div>

          <div className="relative">
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select onValueChange={(value) => field.onChange(value as "Saving" | "Expense" | "Investment")} value={field.value}>
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
              )}
            />

            {errors.category && !watch("category") && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.category.message as string}</p>}
          </div>

          <div className="relative">
            <InputField
              icon={<LiaSortAmountUpSolid size={19} />}
              type="number"
              placeholder="Amount"
              name="amount"
              propData={{
                ...register("amount", {
                  // Choose one of the following methods to handle number input
                  valueAsNumber: true,
                  //   setValueAs: (v) => (v === "" ? undefined : Number(v)),
                }),
              }}
            />

            {errors.amount && <p className="absolute -bottom-5 text-red-500 text-sm truncate">{errors.amount.message as string}</p>}
          </div>

          <div className="relative z-50 col-span-3 grid grid-cols-2 gap-8">
            <InputField icon={<CiLocationOn size={19} />} type="text" placeholder="Location" name="location" propData={{ ...register("location") }} />

            <div className="relative b-amber-600">
              {/* <DatePicker selected={transaction?.date ? new Date(Number(transaction.date)) : startDate} onChange={handleDateChange} timeInputLabel="Time:" dateFormat="yyyy/MM/dd" wrapperClassName="date-picker" /> */}

              {/* use controller to handle date input without useState */}
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                      setStartDate(date);
                    }}
                    dateFormat="yyyy/MM/dd"
                    wrapperClassName="date-picker"
                  />
                )}
              />

              <CiCalendar size={22} className="absolute left-3 top-[15px] text-logo" />

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
            {isSubmitting ? <TbLoader scale={22} className="animate-spin mx-auto" /> : transaction ? "Update Transaction" : "Create Transaction"}
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
};

export default TransactionForm;

import UpdateTransactionForm from "@/components/UpdateTransactionForm";

const UpdateTransactionPage = () => {
  return (
    <main className="b-fuchsia-500 min-h-[calc(100vh-12rem)] flex items-start justify-center">
      <div className="b-rose-500 w-full max-w-5xl flex flex-col items-center">
        {/* Title */}
        <h2 className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">Update this transaction</h2>

        {/* Form */}
        <UpdateTransactionForm />
      </div>
    </main>
  );
};

export default UpdateTransactionPage;

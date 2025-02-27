import Link from "next/link";

const Header = () => {
  return (
    <header className="b-amber-500 mb-10 h-[10rem] flex flex-col items-center justify-center">
      <h1 className="relative z-50 text-4xl md:text-6xl lg:text-8xl font-bold text-center text-white pt-10">
        Expense{" "}
        <Link href="/" className="text-logo">
          GQL
        </Link>
      </h1>

      {/* Gradient Light */}
      <div className="bg-fuchsia-500 relative mb-10 w-1/2 mx-auto hidden md:block">
        <div className="absolute inset-x-20 -top-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 -top-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 -top-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 -top-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>
    </header>
  );
};

export default Header;

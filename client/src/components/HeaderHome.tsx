"use client";
import { LOGOUT } from "@/graphql/mutations/user.mutation";
import { toastStyle } from "@/lib/utils";
import { User } from "@/types";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

const HeaderHome = ({ user }: { user: User }) => {
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logout();

      // Clear the Apollo Client cache
      client.resetStore();

      if (res.data.logout.message) {
        router.refresh();

        toast.success(res.data.logout.message, {
          style: toastStyle,
        });
      }

      console.log({ res }, "<---resLogout");
    } catch (error) {
      console.log(error, "<---errorLogout");
    }
  };

  // if (loading) {
  //   return <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>;
  // }

  console.log({ user }, "<---HeaderHomeUser");

  return (
    <div className="flex items-center gap-3">
      {/* Title */}
      <h2 className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">Spend wisely, track wisely</h2>

      <div className="flex items-center gap-2">
        <Image src={user.authUser.profilePicture} alt={user.authUser.name} width={35} height={35} />

        <span>{user.authUser.name}</span>

        {loading ? <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div> : <MdLogout className="mx-2 w-5 h-5 cursor-pointer" onClick={handleLogout} />}
      </div>
    </div>
  );
};

export default HeaderHome;

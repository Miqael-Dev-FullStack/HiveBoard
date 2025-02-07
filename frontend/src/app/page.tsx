"use client";
import { api } from "../../utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, signOut } from "../../auth";
const Dashboard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    picture: null,
  });
  const router = useRouter();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const userData = await api.me();
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.log("User not authenticated", error);
        router.push("/login");
      }
    };
    authCheck();
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col gap-2 items-center justify-center">
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <img src={user.picture} alt={user.name} />
      <button
        onClick={() => {
          api.logout();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

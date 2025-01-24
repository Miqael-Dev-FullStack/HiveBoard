"use client";
import { api } from "../../utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const userData = await api.me();
        setUser(userData);
      } catch (error) {
        console.error("User not authenticated", error);
        router.push("/login");
      }
    };
    authCheck();
  }, []);

  return (
    <div className="w-full h-dvh flex flex-col gap-2 items-center justify-center">
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
    </div>
  );
};

export default Dashboard;

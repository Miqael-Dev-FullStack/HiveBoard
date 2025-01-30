"use client";
import { SessionProvider } from "next-auth/react";
import Template from "../Template";

const AuthLauyout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ height: "100vh", background: "#FFFBFB" }}>
      <div
        style={{ backgroundImage: "URL('/background-1.png" }}
        className="flex flex-col items-center bg-no-repeat bg-cover bg-center justify-center  h-dvh"
      >
        <img
          src="/Logo-2x.png"
          className="w-[10%] mb-10 mt-[-5rem]"
          alt="Logo"
        />
        <div>
          <SessionProvider>{children}</SessionProvider>
        </div>
      </div>
    </div>
  );
};

export default AuthLauyout;

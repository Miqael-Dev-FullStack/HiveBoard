"use client";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="flex rounded-md shadow-md p-4 bg-white flex-col gap-2 items-center">
      <h2 className="text-[20px] mb-3 font-bold">Login</h2>
      <div className="flex flex-col gap-6">
        <div className="flex items-center border-2 border-gray-300 p-2 rounded-sm">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="mr-2 w-[18px] text-gray-500"
          />
          <input
            type="email"
            className="w-[15rem] border-none outline-none text-gray-500"
            placeholder="Email"
          />
        </div>
        <div className="flex items-center border-2 border-gray-300 p-2 rounded-sm">
          <FontAwesomeIcon
            icon={faLock}
            className="mr-2 w-[15px] text-gray-500"
          />
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="w-[15rem] border-none outline-none text-gray-500"
            placeholder="Password"
          />
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEye : faEyeSlash}
              className="w-[20px] text-gray-500"
            />
          </div>
        </div>
      </div>
      <p className="w-full text-blue-500 text-[14px] text-right">
        <Link href="/forgot-password" className="cursor-pointer">
          <u>Forgot Password</u>
        </Link>
      </p>
      <button className="bg-[#FFD700] mt-[10px] w-full hover:bg-[#efd22a] text-black font-[500] p-2 text-[15px] rounded-sm">
        Login
      </button>
      <div className=" w-full flex  items-center">
        <div className="bg-gray-300 w-full h-[1px]"></div>
        <p className="p-2 text-gray-500 text-[14px] text-center">Or</p>
        <div className="bg-gray-300 w-full h-[1px]"></div>
      </div>
      <div className="flex w-full gap-2">
        <div className="flex w-full justify-center items-center gap-2 border-2 border-gray-300 p-2 rounded-md">
          <img
            src="/google.png"
            alt="google"
            className="w-[16px] cursor-pointer"
          />
          <p className="text-[14px]">Google</p>
        </div>
        <div className="flex w-full justify-center items-center gap-2 border-2 border-gray-300 p-2 rounded-md">
          <img
            src="/linkedin.png"
            alt="linkedin"
            className="w-[16px] cursor-pointer"
          />
          <p className="text-[14px]">Linkedin</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 ">
        <p className=" text-gray-500 text-[14px]">Don't have an account?</p>
        <p className=" text-blue-500 text-[14px]">
          <Link href="/signup" className="cursor-pointer">
            <u>Sign up</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

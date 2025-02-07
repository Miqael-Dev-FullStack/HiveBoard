"use client";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginFormValues } from "../../utils/validationSchema";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { useRouter } from "next/navigation";
import { auth } from "../../auth";
import { signIn, useSession } from "next-auth/react";
import GoogleSignUpBtn from "./googleSignUpBtn";

export default function LoginForm() {
  const router = useRouter();
  const button = useRef<HTMLButtonElement>(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginFormValues) => {
    setLoading(true);
    try {
      const response = await api.login(data);
      if (response) {
        router.push("/");
      } else {
        alert("login failed please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading == true) {
      if (button.current) {
        button.current.disabled = true;
        button.current.style.background = "#cccccc";
      }
    }
  }, [loading]);

  const [error, setError] = useState("");
  console.log(error);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex rounded-md  w-[21rem] shadow-md p-4 bg-white flex-col gap-2 items-center">
        <h2 className="text-[20px] mb-3 font-bold">Login</h2>
        {error && (
          <p className="text-red-500 text-[12.5px] mb-3 w-[100%]">{error}</p>
        )}
        <div className="flex w-full flex-col">
          <div className="flex flex-col  mb-6">
            <div className="flex items-center border-2 border-gray-300 p-2 rounded-sm">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 w-[18px] text-gray-500"
              />
              <input
                type="email"
                className="w-full text-[14px] border-none outline-none text-gray-500"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-[13px] text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex w-full items-center border-2 border-gray-300 p-2 rounded-sm">
            <FontAwesomeIcon
              icon={faLock}
              className="mr-2 w-[15px] text-gray-500"
            />
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="w-[100%] text-[14px] border-none outline-none text-gray-500"
              placeholder="Password"
              {...register("password")}
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
          {errors.password && (
            <p className="text-[12px] text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <p className="w-full text-blue-500 text-[13px] text-right">
          <Link href="/forgot-password" className="cursor-pointer">
            <u>Forgot Password</u>
          </Link>
        </p>
        <button
          type="submit"
          ref={button}
          className="bg-[#FFD700]  mt-[10px] justify-center flex items-center w-full hover:bg-[#efd22a] text-black font-[500] p-2 text-[15px] rounded-sm"
        >
          {loading ? (
            <img src="/loading.gif" alt="loading" className="w-[25px]" />
          ) : (
            <p>Login</p>
          )}
        </button>
        <div className=" w-full flex  items-center">
          <div className="bg-gray-300 w-full h-[1px]"></div>
          <p className="p-2 text-gray-500 text-[14px] text-center">Or</p>
          <div className="bg-gray-300 w-full h-[1px]"></div>
        </div>
        <div className="flex w-full">
          <div className=" cursor-pointer flex w-full">
            <GoogleSignUpBtn setError={setError} />
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
    </form>
  );
}

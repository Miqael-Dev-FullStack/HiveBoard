"use client";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupFormValues } from "../../utils/validationSchema";
import { api } from "../../utils/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: signupFormValues) => {
    setLoading(true);
    try {
      const response = await api.signup(data);
      if (response) {
        router.push("/login");
      } else {
        alert("signup failed please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) {
      if (button.current) {
        button.current.disabled = true;
        button.current.style.background = "#cccccc";
      }
    }
  }, [loading]);

  return (
    <div className="flex rounded-md shadow-md p-4 bg-white flex-col gap-2 items-center">
      <h2 className="text-[20px] mb-3 font-bold">Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center border-2 border-gray-300 p-2 rounded-sm">
              <FontAwesomeIcon
                icon={faUser}
                className="mr-2 w-[18px] text-gray-500"
              />
              <input
                type="text"
                {...register("name")}
                className="w-[15rem] text-[14px] border-none outline-none text-gray-500"
                placeholder="Full name"
              />
            </div>
            {errors.name && (
              <p className="text-[13px] text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center border-2 border-gray-300 p-2 rounded-sm">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 w-[18px] text-gray-500"
              />
              <input
                type="email"
                {...register("email")}
                className="w-[15rem] text-[14px] border-none outline-none text-gray-500"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-[13px] text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center border-2 border-gray-300 p-2 rounded-sm">
              <FontAwesomeIcon
                icon={faLock}
                className="mr-2 w-[15px] text-gray-500"
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                {...register("password")}
                className="w-[15rem] text-[14px] border-none outline-none text-gray-500"
                placeholder="Password"
              />
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
              >
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  className="w-[20px]  text-gray-500"
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-[13px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          ref={button}
          className="bg-[#FFD700] mt-[10px] flex justify-center items-center w-full hover:bg-[#efd22a] text-black font-[500] p-2 text-[15px] rounded-sm"
        >
          {loading ? (
            <img src="/loading.gif" alt="loading" className="w-[25px]" />
          ) : (
            <p>Sign up</p>
          )}
        </button>
      </form>
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
          <p className="text-[13px]">Google</p>
        </div>
        <div className="flex w-full justify-center items-center gap-2 border-2 border-gray-300 p-2 rounded-md">
          <img
            src="/linkedin.png"
            alt="linkedin"
            className="w-[16px] cursor-pointer"
          />
          <p className="text-[13px]">Linkedin</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 ">
        <p className=" text-gray-500 text-[14px]">Already have an account?</p>
        <p className=" text-blue-500 text-[14px]">
          <Link href="/login" className="cursor-pointer">
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

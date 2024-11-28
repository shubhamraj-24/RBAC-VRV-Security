import React, { useContext, useState } from "react";
import LoginImg from "../../assets/login.webp";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
import { loginService } from "../services/authService.tsx";
//import Cookies from "js-cookie";
import { UserInfoContext } from "../Contexts/UserInfoContext.tsx";

const Login = () => {
  const [loginData, setLoginData] = useState(null);
  const [activeUser, setActiveUser] = useState("user");
  const Navigate = useNavigate();
  const { userInfoState, AddUserInfo } = useContext(UserInfoContext);

  const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter correct email" }),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters long" }),
  });
  type LoginSchemaType = z.infer<typeof LoginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const loginFormSubmit: SubmitHandler<LoginSchemaType> = async ({
    email,
    password,
  }) => {
    const logindata = {
      email,
      password,
      role: activeUser,
    };

    const loginApiResponse = await loginService(logindata);
    let errorMessage = loginApiResponse?.response?.data?.message;

    if (loginApiResponse.status === 200) {
      console.log("#####",loginApiResponse?.data)
      AddUserInfo(loginApiResponse?.data?.user);
      toast.success("Login successful!");
      Navigate("/");
    } else {
      toast.error(errorMessage || "Failed to Login");
    }
  };

  function selectActiveUser(userType) {
    setActiveUser(userType);
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <ToastContainer />
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-center bg-contain bg-no-repeat  lg:block lg:w-2/5  "
            style={{ backgroundImage: `url(${LoginImg})` }}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Login in your account now.
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>
              <p className="p">
                Dont have an account?{" "}
                <Link
                  to="/signup"
                  className="span underline hover:text-blue-600"
                >
                  Sign up{" "}
                </Link>
              </p>

              <div className="mt-6">
                <h1 className="text-gray-500 dark:text-gray-300">
                  Select type of account
                </h1>
                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <button
                    onClick={() => selectActiveUser("user")}
                    className={`flex justify-center  w-full px-6 py-3 m-2 ${
                      activeUser === "user"
                        ? "text-white  bg-indigo-600"
                        : "text-indigo-500 border border-indigo-500"
                    }  rounded-md md:w-auto md:mx-2 focus:outline-none `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span className="mx-2">User</span>
                  </button>

                  <button
                    onClick={() => selectActiveUser("manager")}
                    className={`flex justify-center  w-full px-6 py-3 m-2 ${
                      activeUser === "manager"
                        ? "text-white  bg-indigo-600"
                        : "text-indigo-500 border border-indigo-500"
                    }  rounded-md md:w-auto md:mx-2 focus:outline-none `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="mx-2">Manager</span>
                  </button>
                  <button
                    onClick={() => selectActiveUser("admin")}
                    className={`flex justify-center  w-full px-6 py-3 m-2 ${
                      activeUser === "admin"
                        ? "text-white  bg-indigo-600"
                        : "text-indigo-500 border border-indigo-500"
                    }  rounded-md md:w-auto md:mx-2 focus:outline-none `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="mx-2">Admin</span>
                  </button>
                </div>
              </div>

              <form
                className="grid grid-cols-2 gap-6 mt-8 md:grid-cols-2"
                onSubmit={handleSubmit(loginFormSubmit)}
              >
                <div>
                  <label className="block mb-2 text-sm font-semibold text-start text-gray-600 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="johnsnow@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <span className="text-sm text-red-700">
                    {errors?.email?.message}{" "}
                  </span>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-start text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="text"
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />

                  <span className="text-sm text-red-700">
                    {errors.password?.message}{" "}
                  </span>
                </div>

                <button
                  type="submit"
                  className="flex items-center  justify-between w-full px-6 py-3 text-sm font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                >
                  <span>Login </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

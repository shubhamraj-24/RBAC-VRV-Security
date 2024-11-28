import React, { useState } from "react";
import SignupImg from "../../assets/signup.webp";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupService } from "../services/authService.tsx";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState("user");

  interface SignupType {
    confirmPassword: string;
    email: string;
    password: string;
    username: string;
    department: string;
  }

  const SingupSchema = z
    .object({
      firstName: z
        .string()
        .min(2, { message: "Enter atleast 2 character" })
        .toLowerCase()
        .trim(),
      lastName: z
        .string()
        .min(2, { message: "Enter atleast 2 character" })
        .toLowerCase()
        .trim(),
      email: z.string().email({ message: "Please enter correct email" }).trim(),
      department: z
        .string()
        .min(2, { message: "Please select any option" })
        .toLowerCase()
        .trim(),
      password: z
        .string()
        .min(3, { message: "Username must be at least 4 characters long" })
        .max(10)
        .trim(),
      confirmPassword: z.string(),
    })
    .refine(
      (value) => {
        return value.password === value.confirmPassword;
      },

      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      }
    );

  type SignUpSchemaType = z.infer<typeof SingupSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SingupSchema) });

  const passwordStatus = () => {
    setPasswordShow(!passwordShow);
  };

  const singupFormSubmit = async ({
    firstName,
    lastName,
    email,
    password,
    department,
    }) => {
    const username = `${firstName} ${lastName}`;

    const formData = {
      username,
      email,
      password,
      role: activeUser,
      department,
    };

    console.log("formData" ,formData)
    const signupApiCall = await signupService(formData);
    let message = signupApiCall?.response?.data?.message;
    if (signupApiCall.status === true) {
      toast.success("User created successfully , Now please login");
      reset();
    }

    toast.error(message);

  };

  const selectActiveUser = (signupType) => {
    setActiveUser(signupType);
    console.log("type", signupType);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <ToastContainer />
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-center bg-contain bg-no-repeat  lg:block lg:w-2/5  "
          style={{ backgroundImage: `url(${SignupImg})` }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>
            <p className="p">
              Dont have an account?
              <Link to="/login" className="span underline hover:text-blue-600">
                Login
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
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={handleSubmit(singupFormSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-semibold text-start  text-gray-600 dark:text-gray-200">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <span className="text-sm text-red-700">
                  {errors.firstName?.message}{" "}
                </span>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-start  text-gray-600 dark:text-gray-200">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Wick"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <span className="text-sm text-red-700">
                  {errors.lastName?.message}{" "}
                </span>
              </div>

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
                  Department
                </label>
                <select
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("department")}
                >
                  <option value="">--Please choose a Department--</option>
                  {activeUser !== "user" ? (
                    <>
                      <option value="administrator">Administrator</option>
                      <option value="finance">Finance</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="public">Public</option>
                    </>
                  ) : (
                    <>
                  
                      <option value="public">Public</option>
                    </>
                  )}
                </select>

                <span className="text-sm text-red-700">
                  {errors?.department?.message}{" "}
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
              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-start text-gray-600 dark:text-gray-200">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  type={!passwordShow ? "password" : "text"}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <span className="absolute top-11 right-3">
                  {!passwordShow ? (
                    <svg
                      onClick={passwordStatus}
                      viewBox="0 0 576 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    </svg>
                  ) : (
                    <svg
                      onClick={passwordStatus}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-slash-fill cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-red-700">
                  {errors.confirmPassword?.message}{" "}
                </span>
              </div>

              <button
                type="submit"
                className="flex items-center  justify-between w-full px-6 py-3 text-sm font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              >
                <span>Sign up </span>

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
  );
};

export default Signup;

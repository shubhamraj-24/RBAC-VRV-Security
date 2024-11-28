import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PopupForm = ({
  toggleModal,
  roleType,
  createNewRole,
  editFormData,
  updateRole,
}) => {
  interface FormType {
    email: string;
    username: string;
    role: string;
    department: string;
  }

  const FormSchema = z.object({
    username: z
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
    role: z
      .string()
      .min(2, { message: "Please select any option" })
      .toLowerCase()
      .trim(),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const FormSubmit = (data) => {
 
    if (editFormData?._id) {
     let _id = editFormData?._id
      updateRole({...data ,_id });
  
    } else {
      createNewRole(data);
      
    }
    reset();

  };
 

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto bg-gray-700 bg-opacity-30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative  m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editFormData?._id
                ? editFormData?.role === "manager"
                  ? "Edit Manager role"
                  : "Edit User role"
                : roleType === "manager"
                ? "Create New Manager"
                : "Create New User"}
            </h3>
            <button
              type="button"
              onClick={toggleModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit(FormSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type name"
                  {...register("username")}
                  defaultValue={editFormData ? editFormData.username : ""}
                />
                <span className="text-sm text-red-700">
                  {errors?.username?.message}{" "}
                </span>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className={`${
                    editFormData?.email ? "cursor-not-allowed" : ""
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Type email"
                  readOnly={editFormData?.email ? true : false}
                  defaultValue={editFormData ? editFormData.email : ""}
                />
                <span className="text-sm text-red-700">
                  {errors?.email?.message}{" "}
                </span>
              </div>
              <div className="col-span-2 ">
                <label
                  htmlFor="Role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  id="Role"
                  {...register("role")}
                  defaultValue={editFormData ? editFormData?.role : ""}
                  className={`${
                    editFormData?.role ? "cursor-not-allowed" : ""
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                >
                  <option value="">Select Role</option>
                  {roleType === "manager" ? (
                    <option value="manager">Manager</option>
                  ) : (
                    <option value="user">User</option>
                  )}
                </select>
                <span className="text-sm text-red-700">
                  {errors?.role?.message}{" "}
                </span>
              </div>
              <div className="col-span-2 ">
                <label
                  htmlFor="Department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <select
                  id="Department"
                  {...register("department")}
                  defaultValue={editFormData ? editFormData?.department : ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select Department</option>

                  <option value="finance">Finance</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="public">Public</option>
                </select>
                <span className="text-sm text-red-700">
                  {errors?.department?.message}{" "}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {editFormData?.email
                ? "Update Role"
                : roleType === "manager"
                ? "Add New Manager"
                : "Add New User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;

import React, { useContext } from "react";
import PopupForm from "../utils/PopupForm.tsx";
import { UserInfoContext } from "../Contexts/UserInfoContext.tsx";

const UserDashboard = () => {

  const { userInfoState, RemoveUserInfo } = useContext(UserInfoContext);

  const userData = userInfoState.UserInfo;
console.log("yserdata",userData)
  return (
    <div>
      <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform duration-200 easy-in-out  m-auto   mt-5">
        <div className=" h-32 overflow-hidden">
          <img
            className="w-full"
            src="https://plus.unsplash.com/premium_photo-1708337889349-6164efa8eaaf?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex justify-center px-5  -mt-12">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full   "
            src="https://images.unsplash.com/photo-1599631438215-75bc2640feb8?q=80&w=2587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className=" ">
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-3xl font-bold">{userData?.username || "Demo"}</h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href="/"
              target="BLANK()"
            >
            {userData?.email || "Demo@gmail.com"}
            </a>
            <p className="mt-2 text-gray-500 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,{" "}
            </p>
          </div>
          <hr className="mt-6" />
          <div className="flex  bg-gray-50 ">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-semibold">Department 🏢</span> 
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                {" "}
                <span className="font-semibold">{userData?.department}</span>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import React, { useContext } from "react";
import { logoutService } from "../services/authService.tsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserInfoContext } from "../Contexts/UserInfoContext.tsx";


const Header = () => {
  
  const Navigate = useNavigate();
  const { userInfoState, RemoveUserInfo } = useContext(UserInfoContext);

  const userData = userInfoState.UserInfo;

  const logoutFunc = async () => {
    const logoutData = await logoutService();

    if (logoutData?.status === 200) {
      
      
     
      RemoveUserInfo();
      Cookies.remove("token");
      Navigate("/login");
      toast.success("You have logged out successfully!");
    } else {
      toast.error("There is an error while logout");
    }
  };

  return (
    <header className="bg-gray-50">
      <ToastContainer />
      <div className=" px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {`Welcome back, ${userData?.username || "REST"}`}
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Let's manage  🎉
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <div className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring">
              <span className="text-sm font-medium">
                {" "}
                Role : <b> {userData?.role || "User"} </b>{" "}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-check"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
              </svg>
            </div>
            <div className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring">
              <span className="text-sm font-medium">
                {" "}
                Department : <b> {userData?.department || "User"} </b>{" "}
              </span>
            </div>

            <button
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
              onClick={logoutFunc}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

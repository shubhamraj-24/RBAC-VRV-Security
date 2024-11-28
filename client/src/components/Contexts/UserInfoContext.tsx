import React, { createContext, useContext, useReducer } from "react";
import {
  UserInfoInitialState,
  UserInfoReducer,
} from "../Reducers/UserInfoReducer.ts";
import { USER_INFO } from "../utils/Constants.ts";

interface UserInfoContextType {
  userInfoState: {
    UserInfo: any;
  };
  AddUserInfo: (userData: any) => void;
  RemoveUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextType>({
  userInfoState: UserInfoInitialState,
  AddUserInfo: () => {},
  RemoveUserInfo: () => {},
});

const storedUserInfo = localStorage.getItem("UserInfo");

const initialUserInfo = storedUserInfo ? { UserInfo: JSON.parse(storedUserInfo)} : UserInfoInitialState;

const UserInfoProvider: React.FC = ({ children }: any) => {
  const [userInfoState, userReducer] = useReducer(
    UserInfoReducer,
    initialUserInfo
  );

  function AddUserInfo(userData: any) {
    userReducer({
      type: USER_INFO.ADD_USER,
      payload: userData,
    });
    localStorage.setItem("UserInfo", JSON.stringify(userData)); 
  }
  function RemoveUserInfo() {
    userReducer({
      type: USER_INFO.REMOVE_USER,
    });
    localStorage.removeItem("UserInfo");
  }

  return (
    <UserInfoContext.Provider
      value={{ userInfoState, AddUserInfo, RemoveUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoContext, UserInfoProvider };

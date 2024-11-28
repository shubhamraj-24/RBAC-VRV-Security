import axios from "axios";
import Cookies from "js-cookie";
interface userType {
  limit?: number;
  page?: number;
  role?: string;
  department?: string
}

interface createNewRoleType {
  username: string;
  email: string;
  role: string;
  department: string
  _id: string
}




export const allUserService = async ({ role, page, limit, department }: userType) => {
  try {
    const token = await Cookies.get("token");

    const apiRes = await axios(`http://localhost:5001/api/users?role=${role}&department=${department}&page=${page}&limit=${limit}`, {
      method: "get",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    });

    console.log("apiRes", apiRes)
    if (apiRes.status !== 200) {
      throw new Error("There is an error while fetching the data")
    }

    return apiRes


  } catch (error) {
    console.log("This is error", error);
    return error;
  }
};

export const createNewRoleService = async ({
  username,
  email,
  role,
  department
}: createNewRoleType) => {
  try {
    const token = await Cookies.get("token");
    const userData = { username, email, role, department };

    const signUpresposne = await axios.post(
      "http://localhost:5001/api/createNewRole",

      userData,
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      }

    );

    if (signUpresposne.data.status === false) {
      throw new Error(signUpresposne.data);
    }
    return signUpresposne.data;
  } catch (error) {
    console.log("This is error", error);
    return error;
  }
};

export const deleteRoleService = async (
  _id
) => {
  try {
    const token = await Cookies.get("token");
    const deleteResposne = await axios.delete(
      `http://localhost:5001/api/deleteRole?id=${_id}`,

      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      },
    );

    if (deleteResposne.data.status === false) {
      throw new Error(deleteResposne.data);
    }
    return deleteResposne.data;
  } catch (error) {
    console.log("This is error", error);
    return error;
  }
};

export const editExistsRole = async ({
  username,
  _id,
  department
}: createNewRoleType) => {
  try {
    const token = await Cookies.get("token");
    const userData = { username, _id, department };

    const resposne = await axios.patch(
      "http://localhost:5001/api/editExistsRole",
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (resposne.data.status === false) {
      throw new Error(resposne.data);
    }
    return resposne.data;
  } catch (error) {
    console.log("This is error", error);
    return error;
  }
};
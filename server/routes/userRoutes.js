const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcryptjs = require("bcrypt");

router.get("/users", async (req, res) => {
  try {
    const role = req.query.role;
    const department = req.query.department;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    let userRoleList,
      totalUsers,
      nextPage,
      nextPageNumber,
      totalPage,
      currentPage;

    const query = {};
    query.role = role;
    if (department !== "undefined") {
      query.department = department;
    }

    switch (role) {
      case "admin":
      case "manager":
      case "user":
        userRoleList = await User.find(query)
          .select("-password")
          .skip((page - 1) * limit)
          .limit(limit);
        break;
      default:
        userRoleList = await User.find().select("-password");
    }

    if (userRoleList.length === limit) {
      totalUsers = await User.countDocuments(query);
    } else {
      totalUsers = userRoleList.length;
    }

    nextPage = totalUsers > page * limit;

    nextPageNumber = nextPage ? page + 1 : null;

    totalPage = Math.ceil(totalUsers / limit);

    return res.status(200).json({
      userRoleList,
      message: "Here is list of users",
      nextPage,
      nextPageNumber,
      // totalUsers,
      totalPage,
      currentPage: page,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      status: false,
    });
  }
});
router.post("/createNewRole", async (req, res) => {
  try {
    const { username, email, role, department } = req.body;

    const requestingUserRole = req.user.role;

    if (requestingUserRole !== "admin" && requestingUserRole !== "manager") {
      return res.status(403).json({
        message: "Unauthorized: You don't have permission to delete users.",
        status: false,
      });
    }

    // Check if user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User with this email already exists.",
        status: false,
      });
    }
    let password = "demo";

    // Hash the password before saving it to the database
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create a new user object with hashed password and save it to the database
    const newUser = new User({
      username,
      email,
      role,
      password: hashPassword,
      department,
    });
    const savedUser = await newUser.save();

    // Send verification email to the user
    // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return res.status(201).json({
      message: "User created successfully.",
      user: savedUser,
      status: true,
    });
  } catch (error) {
    console.error("Error while signing up:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      status: false,
    });
  }
});

router.delete("/deleteRole", async (req, res) => {
  try {
    const  _id  = req.query.id;
    console.log("_id", _id);
    if (!_id) {
      return res.status(400).json({
        message: "Missing required field: 'id'",
        status: false,
      });
    }

    const requestingUserRole = req.user.role;

    if (requestingUserRole !== "admin" && requestingUserRole !== "manager") {
      return res.status(403).json({
        message: "Unauthorized: You don't have permission to delete users.",
        status: false,
      });
    }

    // Check if user with the same email already exists
    const deletedRole = await User.findByIdAndDelete(_id);

    console.log("deletedRole", deletedRole);

    if (!deletedRole) {
      return res.status(404).json({
        message: "User with this id doesn't exists.",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Role successfully deleted.",
      status: true,
    });
  } catch (error) {
    console.error("Error while deleting role", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      status: false,
    });
  }
});

router.patch("/editExistsRole", async (req, res) => {
  try {
    const { username, department, _id } = req.body;

    if (!username || !department || !_id) {
      return res.status(400).json({
        message:
          "Missing required fields (username, department, and ID) in request body.",
        status: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        username,
        department,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found. Please check the provided ID.",
        status: false,
      });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      status: true,
    });
  } catch (error) {
    console.error("Error while updating:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
      status: false,
    });
  }
});

module.exports = router;

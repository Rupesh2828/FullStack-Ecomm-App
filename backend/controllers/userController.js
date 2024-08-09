import { User } from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the fields.");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(400).send("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassowrd = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassowrd,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error(`Error saving user: ${error.message}`);
    res.status(400);
    throw new Error("invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      //create a tooken and set them as a cookie
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User LoggedOut Successfully...." });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    //here user.username/email is the existing username/email which we are assigning new username as req.body.username/email
    (user.username = req.body.username || user.username),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassowrd = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassowrd;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete the Admin user");
    }
    await User.deleteOne({ _id: user._id });

    res.json("User removed");
  } else {
    res.status(404)
    throw new Error("User not found")
  }
});

const getUserById = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id).select("-password")

  if (user) {
    res.json(user)
  }else {
    res.status(404)
    throw new Error("User not found")
  }
})

const updateUserById = asyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.username = req.body.username || user.username,
    user.email = req.body.email || user.email,
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
   }else {
    throw new Error("User not found")
   }
})

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
};

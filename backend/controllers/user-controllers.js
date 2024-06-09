import { hash, compare } from "bcrypt";
import ChatUser from "../models/Chat-user.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await ChatUser.find();
    return res.status(200).json({ message: "All users", users });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const count = async (req, res, next) => {
  try {
    const users = await ChatUser.find().count();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    // const email = "email@email.com";
    const { email } = req.body;
    const userData = await ChatUser.findOne({ email });
    console.log(userData);
    return res.status(200).json({ message: "User Data", userData });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await ChatUser.findOne({
      email,
    });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedpassword = await hash(password, 10);

    const user = new ChatUser({
      name,
      email,
      password: hashedpassword,
      firstName: " ",
      lastName: " ",
    });
    await user.save();
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });


    // replace this with the following:
    // res.clearCookie(COOKIE_NAME, {
    //   httpOnly: true,
    //   domain: "scamsensei.vercel.app",
    //   signed: true,
    //   path: "/",
    //   secure: true, 
    // });
    

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      expires,
      signed: true,
    });

    // add the following code to the above code block
    // res.cookie(COOKIE_NAME, token, {
    //   path: "/",
    //   httpOnly: true,
    //   domain: "scamsensei.vercel.app", // Updated domain
    //   expires,
    //   signed: true,
    // });

    return res
      .status(201)
      .json({ message: "User created", name: user.name, email: user.email });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error cant create new user" });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await ChatUser.findOne({
      email,
    });
    if (!existingUser) {
      return res.status(401).json({ error: "User does not exist" });
    }
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

     // replace this with the following:
    // res.clearCookie(COOKIE_NAME, {
    //   httpOnly: true,
    //   domain: "scamsensei.vercel.app",
    //   signed: true,
    //   path: "/",
    //   secure: true, 
    // });
    

    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      "7d"
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      expires,
      signed: true,
    });

    // add the following code to the above code block
    // res.cookie(COOKIE_NAME, token, {
    //   path: "/",
    //   httpOnly: true,
    //   domain: "scamsensei.vercel.app", // Updated domain
    //   expires,
    //   signed: true,
    // });

    return res
      .status(201)
      .json({
        message: "User located",
        name: existingUser.name,
        email: existingUser.email,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error cannot find user",
        message: error,
      });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const existingUser = await ChatUser.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ error: "User does not exist or token is invalid" });
    }
    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ error: "Permission didn't match" });
    }

    return res
      .status(200)
      .json({
        message: "User located",
        name: existingUser.name,
        email: existingUser.email,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error cannot find user",
        message: error,
      });
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const existingUser = await ChatUser.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ error: "User does not exist or token is invalid" });
    }
    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ error: "Permission didn't match" });
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

     // replace this with the following:
    // res.clearCookie(COOKIE_NAME, {
    //   httpOnly: true,
    //   domain: "scamsensei.vercel.app",
    //   signed: true,
    //   path: "/",
    //   secure: true, 
    // });
    

    return res
      .status(200)
      .json({
        message: "User located",
        name: existingUser.name,
        email: existingUser.email,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error cannot find user",
        message: error,
      });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password, firstName, lastName, postImage } = req.body;

    // Find the user by email
    const user = await ChatUser.findOne({ email });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    if (name) user.name = name;
    if (password) {
      const hashedPassword = await hash(password, 10);
      user.password = hashedPassword;
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (postImage) user.myFile = postImage;

    // Save the updated user
    await user.save();

    // Return the updated user details
    return res
      .status(200)
      .json({
        message: "User updated",
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error - Unable to update user" });
  }
};

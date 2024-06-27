"use server";
import { ICreateUserDataType, IUpdateuserDataType } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import { Message, User } from "@/models";
import { generateReferCode } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { Notification } from "@/models/notification.model";
import { sendPushNotification } from "../firebase";

// for syncing new user data
const createUser = async (data: ICreateUserDataType) => {
  try {
    await connectToDatabase();
    const user = await User.create({
      ...data,
      referCode: generateReferCode() as any,
    });
    console.log(`new user data synced to database.`);
  } catch (error: any) {
    console.log("Err in createuser fn.");
  }
};
// for getting user profile
const getUserProfile = async (id?: string) => {
  const status = auth();
  if (!status.userId) {
    return "UnAuthenticated.";
  }
  await connectToDatabase();

  const user = await User.findOne({ clerkId: status.userId }).populate(
    "notifications subscription referCount tasks"
  );

  console.log("user proile fetched successfully.");
  return JSON.stringify(user);
};

// syncing updated user data
const updateUserProfile = async (data: IUpdateuserDataType) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: data.id });
    if (!user) {
      return console.log("No user found .");
    }
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: data.id },
      { ...data },
      { new: true }
    );
    console.log(`user with clerk id: ${data.id} updated his profile.`);
  } catch (error) {
    console.log("err in update user function.");
  }
};

// removing user data from database
const deleteUserAccount = async (id: string) => {
  try {
    const deleteUser = await User.findOneAndDelete({ clerkId: id });
    console.log(`user with clerk id: ${id} deleted his account.`);
  } catch (error) {
    console.log("Err in delete user function", error);
  }
};

// refer code verifying function

const verifyCode = async (code: string) => {
  try {
    const status = auth();
    if (!status) {
      return "Unauthorised";
    }

    await connectToDatabase();
    const loggedInUser = await User.findOne({ clerkId: status.userId });
    const refrerUser = await User.findOne({ referCode: code });

    if (loggedInUser.credit !== 0) {
      return "You are not eligiable for this offer.";
    }
    if (loggedInUser.referCode === code) {
      return "You can use your own refer code.";
    }
    if (!refrerUser) {
      return "Invalid refer code.";
    }
    if (refrerUser.referCount.includes(loggedInUser._id)) {
      return "You have already claimed the credits.";
    }
    loggedInUser.credit += 25;
    refrerUser.credit += 25;
    refrerUser.referCount.push(loggedInUser._id);

    // generating a new notification

    const notification_Body = {
      notification_type: "presonal",
      reciver: refrerUser._id,
      content: `${loggedInUser.first_name} used your refer code.`,
    };

    // web socket integration

    const notification = await Notification.create(notification_Body);
    // saving notification
    refrerUser.notifications.push(notification._id);

    await loggedInUser.save();
    await refrerUser.save();
    return "Credit added successfully";
  } catch (error) {
    console.log("err occured in verify  refer code function .", error);
  }
};

// setting user FCM token to database

const setFCMtoken = async (token: string) => {
  try {
    const status = auth();

    if (!status.userId) {
      return;
    }

    await connectToDatabase();

    const alreadyExits = await Message.findOne({ token });
    if (alreadyExits) {
      return "Token already exist";
    }

    const loggedInUser = await User.findOne({ clerkId: status.userId });

    const newToken = await Message.create({
      token,
      user: loggedInUser._id,
    });

    return "Token added successfully.";
  } catch (error) {
    return;
  }
};

const sendNt = async (tokens: string[], title: string, body: string) => {
  try {
    await sendPushNotification(tokens, title, body);
  } catch (error) {
    return;
  }
};
export {
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  verifyCode,
  setFCMtoken,
  sendNt,
};

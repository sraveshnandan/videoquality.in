"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../database/mongoose";
import { Task, User } from "@/models";
import { sendPushNotification } from "../firebase";
import { deviceTokens } from "@/constants";

type creatTask = {
  rawVid: string;
  prompt: string;
  editing_type: string;
};
const createNewTask = async (data: creatTask) => {
  try {
    await connectToDatabase();
    const status = auth();
    if (!status.userId) {
      return {
        success: false,
        message: "Unauthenticated.",
      };
    }

    const loggedinUser = await User.findOne({ clerkId: status.userId });
    const { rawVid, prompt, editing_type } = data;

    if (loggedinUser.credit < 25) {
      return {
        success: false,
        message: "You are out of credit, please purchase a membership.",
      };
    }
    // deducting credit
    loggedinUser.credit -= 25;

    // preparing new task payload
    const taskPayload = {
      rawVideo: rawVid,
      status: "queued",
      prompt,
      user: loggedinUser._id,
      editing_type,
    };
    // creating new task
    const newTask = await Task.create(taskPayload);

    loggedinUser.tasks.push(newTask._id);

    await loggedinUser.save();

    // notification system
    const title = `New Task Created.`;
    const body = `${loggedinUser.first_name} created a new task.`;
    await sendPushNotification(deviceTokens, title, body);

    return {
      success: true,
      message: "Task created successfully.",
    };
  } catch (error) {
    console.log("err in create new task function.", error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};

export { createNewTask };

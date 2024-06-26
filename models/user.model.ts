import { Schema, model, models, Document } from "mongoose";

// user interface
export interface IUser extends Document {
  clerkId: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  tasks: string[];
  referCode: string;
  referCount: IUser[];
  user_type: string;
  notifications: string[];
  credit: number;
  subscription: any; // Use a more specific type if available
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task", // Ensure the referenced model name is correct
      },
    ],
    referCode: {
      type: String,
    },
    referCount: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user_type: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification", // Ensure the referenced model name is correct
      },
    ],
    credit: {
      type: Number,
      default: 0,
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription", // Ensure the referenced model name is correct
    },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export { User };

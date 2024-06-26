import { Schema, model, models } from "mongoose";

export interface INotification extends Document {
  notification_type: string;
  reciver: string;
  content: string;
  status: string;
}

const notificationSchema = new Schema<INotification>(
  {
    notification_type: {
      type: String,
      required: true,
      enum: ["presonal", "general"],
      default: "general",
    },
    reciver: {
      type: String,
      default: "all",
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["read", "unread"],
    },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", notificationSchema);

export { Notification };

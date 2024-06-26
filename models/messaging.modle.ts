import { model } from "mongoose";
import { Schema, models } from "mongoose";
import { IUser } from "./user.model";

export interface IMessage extends Document {
  user: IUser;
  token: string[];
}

const MessagingSchema = new Schema<IMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    token: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessagingSchema);

export { Message };

import { Schema, model, models } from "mongoose";
import { IUser } from "./user.model";

export interface ISubscription extends Document {
  user: any;
  orderId: string;
  paymentId: string;
  paymentSignature: string;
  amount: number;
  plan: string;
  validity: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    paymentSignature: {
      type: String,
      required: true,
    },
    amount: Number,
    plan: String,
    validity: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription =
  models.Subscription || model("Subscription", SubscriptionSchema);

export { Subscription };

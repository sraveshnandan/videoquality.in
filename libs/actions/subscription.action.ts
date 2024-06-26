"use server";
import { IUser, Notification, Subscription, User } from "@/models";
import { connectToDatabase } from "../database/mongoose";
import { useAuth } from "@clerk/nextjs";
import { razorpay } from "../razorpay";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";

// creating payment verify hash
const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables."
    );
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

// action to create order id
const createOrderId = async (amount: number) => {
  try {
    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "rcp2",
    };
    const order = await razorpay.orders.create(options);
    console.log(order);

    return order;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
};

// action to verify payment
const verifyPayment = async (data: any) => {
  const { orderCreationId, razorpayPaymentId, razorpaySignature, Card } = data;
  console.log("request body", data);

  // generating payment verify signature
  const signature = generatedSignature(orderCreationId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return "Payment not verified.";
  }

  // if payment verified

  const subdata = {
    razorpayOrderId: orderCreationId,
    razorpayPaymentId,
    razorpaySignature,
    Card,
  };
  console.log("subscription payload", subdata);

  const res = await CreateSubscription(subdata);
  return res;
};

// action to create new subscription
const CreateSubscription = async (data: any) => {
  await connectToDatabase();
  const status = auth();
  if (!status.userId) {
    return;
  }
  var date = new Date(); // Now
  const validity = date.setDate(date.getDate() + 30);

  const currentuser: IUser | null = await User.findOne({
    clerkId: status.userId,
  });
  currentuser!.credit += data.Card.credit;
  // new subscription payload
  const newsubpayload = {
    user: currentuser!._id,
    orderId: data.razorpayOrderId,
    paymentId: data.razorpayPaymentId,
    paymentSignature: data.razorpaySignature,
    amount: data.Card.amount,
    plan: data.Card.name,
    validity,
  };
  // creating new subscription
  const newSubs = await Subscription.create(newsubpayload);
  currentuser!.subscription = newSubs._id;
  await currentuser!.save();

  // generating a new notification

  const notification_Body = {
    notification_type: "general",
    content: `${currentuser!.first_name} purchase  ${
      data.Card.name
    } subscription plan. of ammount ${data.Card.amount}`,
  };

  // web socket integration

  const notification = await Notification.create(notification_Body);
  return true;
};

export { createOrderId, CreateSubscription, verifyPayment };

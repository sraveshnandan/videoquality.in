"use client";
import Loader from "@/components/shared/landing/Loader";
import PricingSection from "@/components/shared/landing/PricingSection";
import { getUserProfile } from "@/libs/actions";
import {
  createOrderId,
  verifyPayment,
} from "@/libs/actions/subscription.action";
import { IPricingCard } from "@/types";
import { useStore } from "@/zustand/MainStore";
import Script from "next/script";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

const UpgradePage = (props: Props) => {
  const [loading, setloading] = useState(false);
  const { profile, setProfile } = useStore();

  // handling purchase

  const handlePurchase = async (card: IPricingCard) => {
    try {
      setloading(true);
      // creating a order id
      const order = await createOrderId(card.amount!);

      // creating payment options

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: card.amount! * 100,
        currency: "INR",
        name: "VideoQuality",
        description: ` ${profile?.first_name} purchasing a ${card.name} plan.`,
        order_id: order!.id,
        handler: async (resp: any) => {
          // Payment verification data
          const data = {
            orderCreationId: order!.id,
            razorpayPaymentId: resp.razorpay_payment_id,
            razorpayOrderId: resp.razorpay_order_id,
            razorpaySignature: resp.razorpay_signature,
            Card: card,
          };

          console.log("verifucation object", data);

          try {
            setloading(true);
            const result = await verifyPayment(data);

            if (result) {
              window.location.reload();
            } else {
              toast.error(result);
            }
          } catch (error) {
            toast.error("Failed to verify payment.");
            console.log("payment verify error", error);
          } finally {
            setloading(false);
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        toast.error(response.error.description);
      });
      paymentObject.open();
    } catch (error: any) {
      console.log("err in purchase fn", error);
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  // setting user profile
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        const u = JSON.parse(res);
        setProfile(u);
      })
      .catch((err: any) => toast.error(err.message));
    toast.success("please reload the page , before purchasing any plan.");
  }, [setProfile]);

  return loading ? (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Loader />
    </>
  ) : (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <section className="">
        <PricingSection pricingPage={true} cardData={handlePurchase} />
      </section>
    </>
  );
};

export default UpgradePage;

"use client";

import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import useFcmToken from "@/hooks/useFCMToken";
import { firebaseApp } from "@/firebase";

const FcmTokenComp = () => {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload: any) =>
          console.log("Foreground push notification received:", payload)
        );
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
};

export default FcmTokenComp;

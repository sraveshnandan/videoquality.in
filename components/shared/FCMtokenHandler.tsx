"use client";
import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp } from "@/firebase";
import { setFCMtoken } from "@/libs/actions";
import { Copy } from "lucide-react";

const FcmTokenComponent = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Request notification permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BPtrE0j6qkOpipr4gKZeqO7erx1w4Y2io4eEaUoPVh0pXU_Q7AAZMbPvkXR7eWf6XKh5gpa5gfgTM_WJfbueJ2o",
            });
            if (currentToken) {
              setToken(currentToken);
              const res = await setFCMtoken(currentToken);
              console.log("token res", res);
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          } else {
            console.log("Notification permission not granted.");
          }
        }
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return (
    <div className="bg-glass p-2 lg:w-[80%] w-full rounded-md flex items-center justify-between">
      <span className="text-white line-clamp-1">Your FCM token : {token}</span>

      <span
        className="hover:border-2 rounded-md p-2"
        onClick={() => navigator.clipboard.writeText(token)}
      >
        <Copy className="text-white" />
      </span>
    </div>
  );
};

export default FcmTokenComponent;

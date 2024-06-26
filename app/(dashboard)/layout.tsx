import DashBoardMenu from "@/components/dasbord/DashBoardMenu";
import LeftSection from "@/components/dasbord/LeftSection";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "VideoQuality",
  description: "Enhance video seemlessly.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`max-w-7xl relative bg-black  mx-auto`}>
        <div className="absolute top-0 lg:hidden flex right-0 w-fit h-fit bg-white  shadow-lg p-2 z-50 ">
          <Sheet>
            <SheetTrigger>
              <Menu className="text-black font-semibold" />
            </SheetTrigger>

            <SheetContent className="bg-glass pt- flex-col flex items-center justify-center max-w-full">
              <SheetClose className="absolute top-2 left-2 border-2 rounded-full p-2">
                <X className="text-white text-xl" />
              </SheetClose>
              <DashBoardMenu />
            </SheetContent>
          </Sheet>
        </div>
        <section className="flex relative lg:flex-row lg:min-h-[calc(100vh-100px)]  gap-2  rounded-md  p-2 bg- ">
          {/* left navigation section  */}
          {/* desktop menu section  */}
          <LeftSection />
          {/* right section  */}
          <section className="flex-grow min-h-screen max-w-[100vw] overflow-auto backdrop-blur-md  bg-glass rounded-md p-2">
            {children}
          </section>
        </section>
      </body>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </html>
  );
}
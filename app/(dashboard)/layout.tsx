import DashBoardMenu from "@/components/dasbord/DashBoardMenu";
import LeftSection from "@/components/dasbord/LeftSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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
        <div className="absolute top-5 lg:hidden flex right-4 w-fit h-fit  rounded-l-lg   shadow-lg p-2 z-50 ">
          <Sheet>
            <SheetTrigger className="">
              <Menu className="text-white font-semibold" />
            </SheetTrigger>
            <SheetContent className="bg-glass flex-col flex items-center justify-center max-w-full">
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

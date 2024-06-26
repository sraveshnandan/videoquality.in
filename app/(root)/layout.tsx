import Footer from "@/components/shared/navigation/footer";
import Header from "@/components/shared/navigation/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VideoQuality",
  description: "Enhance video seemlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`max-w-7xl bg-black-bg  mx-auto`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

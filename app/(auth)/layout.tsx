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
      <body className={`max-w-7xl auth-bg  mx-auto`}>{children}</body>
    </html>
  );
}

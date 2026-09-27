import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kockska stiftelserna | Ett arv som fortfarande gör skillnad",
  description:
    "Kockska stiftelserna stödjer människor och föreningar i Trelleborg, medicinsk forskning i Skåne och insatser för staden.",
  icons: { icon: "/brand/kockska-portrait-logo.svg" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/mkk6thi.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}

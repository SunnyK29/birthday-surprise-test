import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "You're Special!",
  description: "A tiny reminder of how special you truly are.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${quicksand.className} h-full antialiased select-none`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

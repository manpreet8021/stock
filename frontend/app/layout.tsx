import type { Metadata } from "next";
import { Providers } from "@/store/provider";
import 'bootstrap/dist/css/bootstrap.min.css';

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export const metadata: Metadata = {
  title: "Crypto Exchange",
  description: "Get live crypto result",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}

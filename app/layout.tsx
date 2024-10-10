import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ClientLoadingHandler from "./hooks/useClientLoader";
import { Toaster } from "./components/organisms/toaster";
import { ToastContainer } from "react-toastify";
import AxiosInterceptorComponent from "./utils/initInterceptor";
import { AuthProvider } from "@/app/context/AuthContext"; // Ensure correct path

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Finder App",
  description: "Job Finder application for SHFT Case Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="system">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <AxiosInterceptorComponent />
          <ToastContainer />
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

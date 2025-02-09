import type { Metadata } from "next";
import "./globals.css";
import { app_name } from '@/constants/config'
import Html from "@/components/puzzle/Html";
import ToastContainer from "@/components/puzzle/ToastContainer";
import Provider from "@/lib/Provider";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: app_name,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Html>
      <Provider>
        <ReactQueryProvider>
          <ToastContainer />
          { children }
        </ReactQueryProvider>
      </Provider>
    </Html>
  );
}
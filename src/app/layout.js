import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Confify – Anonymous Messages & Honest Conversations",
  description:
    "Create your anonymous Confify link, receive honest messages from friends, and express yourself freely. Safe, private, and completely anonymous.",
  keywords: [
    "Confify",
    "anonymous messages",
    "anonymous chat",
    "anonymous feedback",
    "confession app",
    "anonymous confession",
    "honest messages",
    "Gen Z social app",
    "anonymous inbox",
  ], 
   
  // manifest: "/manifest.json",

  creator: "UNKNOWN9",
  applicationName: "Confify",
};



export default function RootLayout({ children }) {
  return (
    
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>    
      {children}

    <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>
    <Analytics />


</body>
     
    </html>
  );
}

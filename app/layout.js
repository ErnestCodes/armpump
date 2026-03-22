import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "./context/Web3Context";
import Header from "./components/layout/Header";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
});

export const metadata = {
  title: "Rauly Dealflow | Premium Web3 Portfolio",
  description:
    "A curated portfolio of high-conviction Web3 projects, transforming the digital landscape. Discover, connect, and scale with Rauly Dealflow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${roboto.className} bg-black text-white min-h-screen`}>
        <Web3Provider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#12131a",
                color: "#e4e4e7",
                border: "1px solid #2a2b35",
              },
              success: {
                iconTheme: { primary: "#00d4aa", secondary: "#0a0b0f" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#0a0b0f" },
              },
            }}
          />
        </Web3Provider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "./context/Web3Context";
import Header from "./components/layout/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "fun.pump | Token Launchpad on Base",
  description:
    "Create and trade tokens on the bonding curve. Launch your token in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-fp-bg text-fp-text min-h-screen`}>
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

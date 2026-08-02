import { Space_Grotesk, Inter, Orbitron } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CopyGuard from "@/components/CopyGuard";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata = {
  title: "DeuStart - Tecnologia e marketing digital",
  description:
    "Sites, apps, gerenciamento de redes sociais e automação de processos pra sua empresa dar um passo à frente.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${orbitron.variable}`}
    >
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CDNQDC113X"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CDNQDC113X');
          `}
        </Script>
        <CopyGuard />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

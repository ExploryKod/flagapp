import { Nunito_Sans } from "next/font/google";
import "@flagapp/app/globals.css";
import { ThemeProvider } from "@modules/app/react-ui/ThemeProvider";
import { Header } from "@modules/app/react-ui/layout/Header";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  display: "swap",
  variable: "--font-nunito-sans",
  adjustFontFallback: true,
});

export const metadata = {
  title: "Flag App - frontendmentor challenge",
  description:
    "Site de démonstration Flag App pour le challenge frontendmentor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" 
    className={`${nunitoSans.variable} overflow-x-hidden antialiased`}
    suppressHydrationWarning
    >
      <body className={nunitoSans.className} suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-[var(--background)] w-full mx-auto">
          <Header className="header-max-w header-height header-space-x" />
            {children}
          </div>
          </ThemeProvider>
      </body>
    </html>
  );
}

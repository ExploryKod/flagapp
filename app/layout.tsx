import { Nunito_Sans } from "next/font/google";
import "@flagapp/app/globals.css";
import { ThemeProvider } from "@modules/app/react-ui/ThemeProvider";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  display: "swap",
  variable: "--font-nunito-sans",
  adjustFontFallback: true,
});

export const metadata = {
  title: "Taste Federation - demo",
  description:
    "Site de démonstration Taste Federation pour la réservation en ligne de tables de restaurants de luxe.",
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
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

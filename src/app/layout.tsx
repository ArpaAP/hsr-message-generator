import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Honkai: Star Rail - Message Generator",
  description: "Made by ArpaAP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
        {children}
      </body>
    </html>
  );
}

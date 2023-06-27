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
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "GrowEasy CRM",
  description: "CSV Upload Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
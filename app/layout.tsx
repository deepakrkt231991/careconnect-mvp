import "./globals.css";

export const metadata = {
  title: "CareConnect",
  description: "Stay connected with your loved ones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning se browser extension wala error fix ho jayega */}
      <body className="bg-gray-50 text-gray-900 antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
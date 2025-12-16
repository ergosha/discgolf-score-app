import "./globals.css";
import AppLayout from "./components/layout/AppLayout";
import BottomNav from "./components/navigation/BottomNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppLayout>
          {children}
          <BottomNav />
        </AppLayout>
      </body>
    </html>
  );
}


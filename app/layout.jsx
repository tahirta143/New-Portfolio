import '@/app/globals.css';
import ClientLayout from '@/app/ClientLayout';

export const metadata = {
  title: 'Portfolio',
  description: 'My awesome portfolio',
  icons: {
    icon: '/fevicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,900&f[]=neue-montreal@400,700&display=swap" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

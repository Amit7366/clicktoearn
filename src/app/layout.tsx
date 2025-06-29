

import { useState, useEffect } from 'react';
import './globals.css'; // Import global styles
import { Toaster } from 'sonner';

// Root layout component for SSR and hydration
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">  {/* Ensure the <html> tag is present */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your App</title>
        {/* Add other head elements like meta, link, etc., here */}
      </head>
      <body>
        <Toaster/>
            {children}
         
      </body>
    </html>
  );
}

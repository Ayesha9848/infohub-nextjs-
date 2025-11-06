export const metadata = { title: "InfoHub", description: "Weather • INR Converter • Quotes" };

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <h1 style={{marginBottom:8}}>InfoHub</h1>
          <div className="small">Weather • INR Converter • Quotes</div>
          {children}
        </div>
      </body>
    </html>
  );
}

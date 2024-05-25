import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
       <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css"
       ></link>
      </Head>
      <body >{children}</body>
    </html>
  );
}

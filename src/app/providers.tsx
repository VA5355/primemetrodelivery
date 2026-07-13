"use client";

import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store"; // Adjust relative path to your store as needed
import RootLayout from "@/components/RootLayout";

interface ProvidersProps {
  children: React.ReactNode;
  session?: any;
}
/**
 * Global App Router Provider wrapper.
 * Integrates client-side state managers safely, preventing layout compilation 
 * and context resolution errors during static HTML prerendering.
 * 
 * 
 * { Component, pageProps:{session, ...pageProps} }: AppProps
 */
export function Providers({ children, session }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider session={session}>
         {children}
        {/**   <div className="font-bodyFont bg-gray-300">
      <RootLayout>
      <Component {...pageProps} />
      </RootLayout>
  
  </div> */} 
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
/*
<Provider store = {store}>
      <PersistGate persistor = {persistor} loading={null}>
      <SessionProvider session={session}>
      <div className="font-bodyFont bg-gray-300">
      <RootLayout>
      <Component {...pageProps} />
      </RootLayout>
  
  </div>
      </SessionProvider>
  </PersistGate>
  </Provider>
*/
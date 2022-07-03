import type { AppProps } from "next/app";
import React, { useState } from "react";
import Layout from "components/layout/Layout";
import { SessionProvider } from "next-auth/react";

import "styles/globals.scss";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [layout, setLayout] = useState<boolean>(true);
  return layout ? (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  ) : (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;

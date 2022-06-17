import type { AppProps } from "next/app";
import { useState } from "react";
import Layout from "components/layout/Layout";

import "styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
  const [layout, setLayout] = useState<boolean>(true);
  return layout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}

export default App;

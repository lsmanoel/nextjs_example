import type { AppProps } from "next/app";
import React, { useState } from "react";
import Layout from "components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import { store } from "redux/chat/store";
import { Provider } from "react-redux";

import "styles/globals.scss";
import { Notifications } from "hocs/notifications";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [layout, setLayout] = useState<boolean>(true);
  return layout ? (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Notifications>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Notifications>
      </Provider>
    </SessionProvider>
  ) : (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default App;

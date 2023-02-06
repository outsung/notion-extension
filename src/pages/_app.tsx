import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useState } from "react";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientSideRendering>
      <ConfigProvider theme={{ token: { colorPrimary: "#F54C47" } }}>
        <Component {...pageProps} />
      </ConfigProvider>
    </ClientSideRendering>
  );
}

function ClientSideRendering({ children }: { children: JSX.Element }) {
  const [csrReady, setCsrReady] = useState(false);

  useEffect(() => {
    setCsrReady(true);
  }, []);

  return useMemo(() => {
    return csrReady ? children : null;
  }, [csrReady]);
}

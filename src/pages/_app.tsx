import type { AppProps, AppContext } from "next/app";
import { trpc } from "@/shared/api";
import { SessionProvider, getSession } from "next-auth/react";

import "@/app/global.css";
import Navbar from "@/entities/navbar/navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <div className="mx-auto max-w-4xl">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  return {
    pageProps: {
      session: await getSession(ctx.ctx),
    },
  };
};

export default trpc.withTRPC(App);

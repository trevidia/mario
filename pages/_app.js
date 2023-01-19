import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
  )
}

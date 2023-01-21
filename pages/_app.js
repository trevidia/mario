import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
          <ToastContainer autoClose={7000} hideProgressBar={true}/>
      </SessionProvider>
  )
}

import { Toaster } from "react-hot-toast";
import { PROVIDER } from "../context/context";
import "../styles/globals.css";

// INTERNAL IMPORTS

export default function App({ Component, pageProps }) {
  return <>
    <PROVIDER>
      <Component {...pageProps} />
    </PROVIDER>
    <Toaster />

    <script type="text/javascript" src="js/jquery.js?ver=1.0.0"></script>
    <script type="text/javascript" src="js/plugins.js?ver=1.0.0"></script>
    <script type="text/javascript" src="js/init.js?ver=1.0.0"></script>
  </>;
}

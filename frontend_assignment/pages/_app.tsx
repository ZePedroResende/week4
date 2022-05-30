import "../styles/globals.css";
import {ThemeProvider} from "@mui/material/styles";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import {CacheProvider} from "@emotion/react";
import theme from "./theme";
import type {AppProps} from "next/app";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme= {theme} >
    <CssBaseline />
    < Component {...pageProps} />
      < /ThemeProvider>
  );
}

export default MyApp;

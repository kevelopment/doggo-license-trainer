import '../styles/globals.css'
import type { AppProps } from 'next/app'
import createEmotionCache from "../utils/emotion-cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import ThemeContextProvider from "../context/theme.context";
import darkTheme from "../styles/theme/dark";
import lightTheme from "../styles/theme/light";
import { Seo } from "../components/seo";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Seo/>
      <ThemeContextProvider>
        {(isDark: boolean) => (
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <CssBaseline/>
            <Component {...pageProps} />
          </ThemeProvider>
        )}
      </ThemeContextProvider>
    </CacheProvider>
  );
}

export default MyApp

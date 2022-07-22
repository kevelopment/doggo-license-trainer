import '../styles/globals.css'
import type { AppProps } from 'next/app'
import createEmotionCache from "../utils/emotion-cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/system";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { CssBaseline } from "@mui/material";
import ThemeContextProvider, { Theme } from "../context/theme.context";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeContextProvider>
        {(theme: Theme) => (
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline/>
            <Component {...pageProps} />
          </ThemeProvider>
        )}
      </ThemeContextProvider>
    </CacheProvider>
  );
}

export default MyApp

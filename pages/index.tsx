import type { NextPage } from 'next'
import Head from 'next/head'
import Header from "../components/header";
import { Footer } from "../components/footer";
import TrainingProvider from "../context/training.context";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useTheme } from "../hooks/use-theme.hook";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hundeführerschein Trainer</title>
        <meta name="description" content="Hundeführerschein Trainer Webapp"/>
        <link rel="icon" href="favicon.ico"/>
      </Head>

      <main>
        <TrainingProvider>
          <Header/>
        </TrainingProvider>
      </main>


      <Footer/>
    </div>
  )
}

export default Home

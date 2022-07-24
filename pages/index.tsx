import type { NextPage } from 'next'
import Head from 'next/head'
import { Footer } from "../components/footer";
import TrainingProvider from "../context/training.context";
import Header from "../components/header";
import { Content } from "../components/content";

const Home: NextPage = () => {
  return (
    <div>
      {/*<Head>*/}
      {/*  <title>Hundeführerschein Trainer</title>*/}
      {/*  <meta name="description" content="Hundeführerschein Trainer Webapp"/>*/}
      {/*  <link rel="icon" href="favicon.ico"/>*/}
      {/*</Head>*/}

      <TrainingProvider>
        <main>
          <Header/>
          <Content/>
        </main>
      </TrainingProvider>

      <Footer/>
    </div>
  )
}

export default Home

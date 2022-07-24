import type { NextPage } from 'next'
import { Footer } from "../components/footer";
import TrainingProvider from "../context/training.context";
import MenuBar from "../components/menuBar";
import { Content } from "../components/content";

const Home: NextPage = () => {
  return (
    <div>

      <TrainingProvider>
        <main>
          <MenuBar/>
          <Content/>
        </main>
      </TrainingProvider>

      <Footer/>
    </div>
  )
}

export default Home

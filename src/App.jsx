import {
  Container,
  createMuiTheme,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import ConfigurationBar from "./components/ConfigurationBar";
import Exam from "./components/exam/Exam";
import Home from "./components/Home";
import Training from "./components/training/Training";

const appTheme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#005400",
    },
    secondary: {
      main: "#f08f27",
    },
  },
});

/**
 * Defines the available app routes
 */
export const Routes = Object.freeze({
  ROOT: "/",
  TRAINING: "/training",
  EXAM: "/exam",
});

export class App extends React.Component {
  state = {
    allQuestions: [],
    isLoaded: false,
    currentIndex: 0,
  };

  async componentDidMount() {
    const allQuestions = await fetch("data.json").then((resp) => resp.json());
    this.setState({
      allQuestions,
      isLoaded: true,
      maxIndex: allQuestions.length - 1,
    });
  }

  setCurrentIndex = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <ConfigurationBar
          currentQuestionIndex={this.state.currentIndex}
          maxNumberQuestions={this.state.maxIndex}
        />
        <Toolbar />
        <Container>
          <BrowserRouter>
            <Switch>
              <Route path={Routes.EXAM}>{<Exam />}</Route>
              <Route path={Routes.TRAINING}>
                <Training
                  questions={this.state.allQuestions}
                  setIndex={this.setCurrentIndex}
                />
              </Route>
              <Route path={Routes.ROOT}>
                <Home isLoaded={this.state.isLoaded} />
              </Route>
            </Switch>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;

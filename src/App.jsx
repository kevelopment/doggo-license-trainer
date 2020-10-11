import {
  Box,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
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
  HOME: "/",
  TRAINING: "/training",
  EXAM: "/exam",
});

class App extends React.Component {
  state = {
    allQuestions: [],
    isLoaded: false,
    currentIndex: 0,
    currentRoute: Routes.HOME,
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

  setCurrentRoute = (route) => {
    this.setState({ currentRoute: route });
  };

  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box width={1} height={1} display="flex" flexDirection="column">
          <ConfigurationBar
            currentQuestionIndex={this.state.currentIndex}
            maxNumberQuestions={this.state.maxIndex}
          />

          <Box flex="1 1 auto" p={4}>
            <BrowserRouter>
              <Switch>
                <Route path={Routes.EXAM}>
                  {<Exam setRoute={this.setCurrentRoute} />}
                </Route>
                <Route path={Routes.TRAINING}>
                  <Training
                    questions={this.state.allQuestions}
                    setIndex={this.setCurrentIndex}
                    setRoute={this.setCurrentRoute}
                  />
                </Route>
                <Route path={Routes.HOME}>
                  <Home isLoaded={this.state.isLoaded} />
                </Route>
              </Switch>
            </BrowserRouter>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;

import React from "react";
import {
  CircularProgress,
  Container,
  createMuiTheme,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import TrainingQuestion from "./components/TrainingQuestion";
import ConfigurationBar from "./components/ConfigurationBar";
import "./App.css";

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

export class App extends React.Component {
  state = {
    allQuestions: [],
    isLoaded: false,
    currentIndex: 0,
    maxIndex: 0,
  };

  async componentDidMount() {
    const allQuestions = await fetch("data.json").then((resp) => resp.json());
    this.setState({
      allQuestions,
      isLoaded: true,
      currentQuestion: allQuestions[0],
      maxIndex: allQuestions.length - 1,
    });
  }

  incrementCurrentIndex = () => {
    let { currentIndex } = this.state;
    let nextIndex = ++currentIndex;
    if (nextIndex > this.state.maxIndex) {
      nextIndex = 0;
    }

    this.setState({ currentIndex: nextIndex });
  };

  decrementCurrentIndex = () => {
    let { currentIndex } = this.state;
    const previousIndex = Math.min(--currentIndex, 0);
    this.setState({ currentIndex: previousIndex });
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
          {this.state.isLoaded ? (
            <TrainingQuestion
              question={this.state.allQuestions[this.state.currentIndex]}
              onNext={this.incrementCurrentIndex}
              onPrevious={this.decrementCurrentIndex}
              index={this.state.currentIndex}
            />
          ) : (
            <CircularProgress />
          )}
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;

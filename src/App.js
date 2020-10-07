import React from "react";
import { CircularProgress } from "@material-ui/core";
import TrainingQuestion from "./components/TrainingQuestion";
import ConfigurationBar from "./components/ConfigurationBar";
import "./App.css";

export class App extends React.Component {
  state = {
    allQuestions: [],
    currentQuestion: {},
    isLoaded: false,
  };

  async componentDidMount() {
    const allQuestions = await fetch("data.json").then((resp) => resp.json());
    this.setState({
      allQuestions,
      isLoaded: true,
      currentQuestion: allQuestions[0],
    });
  }

  render() {
    return (
      <div className="App">
        <header></header>
        <ConfigurationBar />
        {this.state.isLoaded ? (
          <TrainingQuestion question={this.state.currentQuestion} />
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

export default App;

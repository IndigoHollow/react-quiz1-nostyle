import React from "react";
import ReactDOM from "react-dom";
import Quiz from "./components/quiz";
import Result from "./components/result";
import Intruduction from "./components/intruduction";

import "./styles.css";

let quizQuestions;

class ReactQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleStartTheQuiz = this.handleStartTheQuiz.bind(this);
    this.handleOnRestart = this.handleOnRestart.bind(this);

    this.state = {
      counter: 0,
      questionId: 0,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {
        австралия: 0,
        англия: 0,
        сша: 0
      },
      result: ""
    };
  }

  componentDidMount() {
    const url = "https://demo4686640.mockable.io/quiz";

    fetch(url)
      .then(result => result.json())
      .then(result => {
        quizQuestions = result;
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: this.shuffleOptions([0])
        });
      });
  }

  shuffleOptions(question) {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );

    return shuffledAnswerOptions[question];
  }

  resetState() {
    this.setState({
      counter: 0,
      questionId: 1,
      question: quizQuestions[0].question,
      answerOptions: this.shuffleOptions([0]),
      answer: "",
      answersCount: {
        австралия: 0,
        англия: 0,
        сша: 0
      },
      result: ""
    });
  }

  setUserAnswer(answer) {
    let newAnswersCount = this.state.answersCount;

    newAnswersCount[answer.toLowerCase()]++;

    this.setState({
      answersCount: newAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
    let counter = this.state.counter + 1,
      nextQuestionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: nextQuestionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ""
    });
  }

  getResults() {
    const answersCount = this.state.answersCount,
      answersCountKeys = Object.keys(answersCount),
      answersCountValues = Object.values(answersCount),
      answersMaxValue = Math.max(...answersCountValues),
      result = answersCountKeys[answersCountValues.indexOf(answersMaxValue)];

    return result[0].toUpperCase() + result.substr(1);
  }

  setResults(result) {
    this.setState(
      {
        result: result
      },
      () => console.log(this.state.result)
    );
  }

  handleAnswerSelected(e) {
    this.setUserAnswer(e.target.value);
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 500);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 500);
    }
  }

  handleStartTheQuiz() {
    setTimeout(() => {
      this.setState({
        questionId: 1
      });
    }, 150);
  }

  // Fisher–Yates shuffle
  shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleOnRestart() {
    setTimeout(() => this.resetState(), 300);
  }

  renderIntruduction() {
    return <Intruduction startTheQuiz={this.handleStartTheQuiz} />;
  }

  renderQuiz() {
    return (
      <Quiz
        counter={this.state.counter}
        questionId={this.state.questionId}
        question={this.state.question}
        answerOptions={this.state.answerOptions}
        answer={this.state.answer}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.result} restart={this.handleOnRestart} />
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.result
          ? this.renderResult()
          : this.state.questionId
            ? this.renderQuiz()
            : this.renderIntruduction()}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ReactQuiz />, rootElement);

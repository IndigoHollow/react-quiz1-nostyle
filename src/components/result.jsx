import React from "react";
import PropTypes from "prop-types";

function Result(props) {
  return (
    <div className="result">
      You prefer: <strong>{props.quizResult}</strong>
      <button onClick={props.restart}>Restart quiz</button>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;

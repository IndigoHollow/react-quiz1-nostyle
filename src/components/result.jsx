import React from "react";
import PropTypes from "prop-types";

function Result(props) {
  return (
    <div className="result">
      Больше всего вам подойдет: <strong>{props.quizResult}</strong>
      <button onClick={props.restart}>Пройти еще раз</button>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;

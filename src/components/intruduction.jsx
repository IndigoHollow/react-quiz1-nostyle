import React from "react";

function Intruduction(props) {
  return (
    <div className="intruduction">
      This is just an intruduction screen.
      <button onClick={props.startTheQuiz}>Start the quiz</button>
    </div>
  );
}

export default Intruduction;

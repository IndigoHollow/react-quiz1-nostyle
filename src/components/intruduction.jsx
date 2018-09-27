import React from "react";

function Intruduction(props) {
  return (
    <div className="intruduction">
      Английский язык эффективнее изучать в среде, где он используется на
      повседневной основе. Пройдите тест и узнайте в какой стране вам было бы
      это делать не только эффективно, но и приятно!
      <button onClick={props.startTheQuiz}>Пройти тест</button>
    </div>
  );
}

export default Intruduction;

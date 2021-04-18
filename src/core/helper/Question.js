import React, {useState, useEffect, useRef} from 'react';
import {formatTime} from './TimerHelper';

const Question = ({
    name,
    optionA,
    optionB,
    optionC,
    optionD,
    show,
    setQuestion,
    setReport,
    setSelectedOption,
    setYourTime,
    flagAnswered
  }) => {
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  useEffect(() => {
    handleStart();
  }, []);

  const handleSubmit = () => {
    setQuestion(false);
    setReport(true);
    setYourTime(formatTime(timer));
    flagAnswered();
  };

  return (
    <div className="question-card-box" style={{display: show ? '' : 'none'}}>
      <div className="time">
        <div className="timer">
          Your Time: {formatTime(timer)}
        </div>
      </div>
      <div className="qna-box">
        <h3>{name}</h3>
        <div className="qna-ans">
          <input
            type="radio"
            id="one"
            name="answer"
            value="one"
            onChange={() => setSelectedOption(optionA)}
          />
          <label for="one">{optionA}</label><br />
          <input
            type="radio"
            id="two"
            name="answer"
            value="two"
            onChange={() => setSelectedOption(optionB)}
          />
          <label for="two">{optionB}</label><br />
          <input
            type="radio"
            id="three"
            name="answer"
            value="three"
            onChange={() => setSelectedOption(optionC)}
          />
          <label for="three">{optionC}</label><br />
          <input
            type="radio"
            id="four"
            name="answer"
            value="four"
            onChange={() => setSelectedOption(optionD)}
          />
          <label for="four">{optionD}</label><br />
        </div>
      </div>
      <div className="submit">
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Question;

import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import {getProduct, updateProduct} from './helper/coreapicalls';
import {isAuthenticated} from '../auth/helper';
import Question from './helper/Question';
import Report from './helper/Report';

const QuestionPage = ({match}) => {
  const {user, token} = isAuthenticated();

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [yourTime, setYourTime] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState(false);

  const [question, setQuestion] = useState(true);
  const [report, setReport] = useState(false);

  const preload = productId => {
    getProduct(productId).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setName(data.name);
        setTime(data.time);
        setOptionA(data.optionA);
        setOptionB(data.optionB);
        setOptionC(data.optionC);
        setOptionD(data.optionD);
        setCorrectOption(data.correctOption);
      }
    });
  };

  useEffect(() => {
    preload(match.params.questionId);
  }, [match.params.questionId]);

  const flagAnswered = () => {
    let info = ({
      name: name,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      correctOption: correctOption,
      time: time,
      answered: true
    });

    //backend request fired
    updateProduct(match.params.questionId, user._id, token, info)
    .then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="question-card">
        <Question
          name={name}
          optionA={optionA}
          optionB={optionB}
          optionC={optionC}
          optionD={optionD}
          show={question}
          setQuestion={setQuestion}
          setReport={setReport}
          setSelectedOption={setSelectedOption}
          setYourTime={setYourTime}
          flagAnswered={flagAnswered}
        />
        <Report
          time={time}
          correctOption={correctOption}
          selectedOption={selectedOption}
          show={report}
          yourTime={yourTime}
          setQuestion={setQuestion}
          setReport={setReport}
        />
      </div>
    </div>
  );
};

export default QuestionPage;

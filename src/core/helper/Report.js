import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getProducts} from './coreapicalls';

const Report = ({
    time,
    correctOption,
    selectedOption,
    show,
    yourTime,
    setQuestion,
    setReport
  }) => {
  const [error, setError] = useState(false);
  const [newProduct, setNewProduct] = useState('');

  const loadNext = () => {
    let count = 0;
    getProducts().then(data => {
      if (data.error) {
        setError(true);
      } else {
        data.map((product, i) => {
          if (product.answered === false && count === 0) {
            console.log(product);
            setNewProduct(product._id);
            count ++;
            return true;
          }
          else {
            return true;
          }
        });
      }
    });
  };

  useEffect(() => {
    if (show) {
      loadNext();
    }
  }, [show]);

  const handleShow = () => {
    setQuestion(true);
    setReport(false);
    setNewProduct('');
  };

  return (
    <div className="question-card-box" style={{display: show ? '' : 'none'}}>
      <div className="time">
        <div
          className="result"
          style={{color: selectedOption === correctOption ? 'green' : 'red'}}
        >
          {selectedOption === correctOption ? 'Correct Answer' : 'Wrong Answer'}
        </div>
      </div>
      <div className="report">
        <div className="sec">
          <div>Your Time: {yourTime}</div>
          <div>Average Time: {time}</div>
        </div>
        <div className="sec">
          <div>Selected Answer: {selectedOption}</div>
          <div>Correct Answer: {correctOption}</div>
        </div>
      </div>
      <Link to={`/question/${newProduct}`}>
        <button onClick={() => handleShow()}>
          Next
        </button>
      </Link>
      <div className="sol">
        <button>
          Solution
        </button>
      </div>
    </div>
  );
};

export default Report;

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {getCategory, getProducts} from './helper/coreapicalls';

const QuestionList = ({match}) => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const preload = categoryId => {
    getCategory(categoryId).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setName(data.name);
      }
    });
  };

  const loadAllProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
    loadAllProducts();
  }, [match.params.categoryId]);

  return (
    <div>
      <Navbar />
      <div className="question-card">
        <div className="question-card-box">
          <div className="time">
            <div className="timer">
              {name}
            </div>
          </div>
          <div className="qna-box">
            <div className="qna-list">
              {products.map((product, i) => {
                if (match.params.categoryId === product.category._id) {
                  return (
                    <div key={i} className='col-4 mb-4'>
                      {product.answered ?
                        (
                          <li style={{background: "#ccc"}}><h4>{i+1}</h4></li>
                        ) : (
                          <Link to={`/question/${product._id}`}>
                            <li><h4>{i+1}</h4></li>
                          </Link>
                        )
                      }
                    </div>
                  );
                }
                return true;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;

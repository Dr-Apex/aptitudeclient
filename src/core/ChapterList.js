import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {getTopic, getCategories} from './helper/coreapicalls';

const ChapterList = ({match}) => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const preload = topicId => {
    getTopic(topicId).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setName(data.name);
      }
    });
  };

  const loadAllCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload(match.params.topicId);
    loadAllCategories();
  }, [match.params.topicId]);

  return (
    <div>
      <Navbar />
      <div>
        <div className="question-card">
          <div className="question-card-box">
            <div className="time">
              <div className="timer">
                {name}
              </div>
            </div>
            <div className="qna-box">
              <div className="qna-list">
                {categories.map((cate, i) => {
                  if (match.params.topicId === cate.topic._id) {
                    return (
                      <div key={i} className='col-4 mb-4'>
                        <Link to={`/question-list/${cate._id}`}>
                          <li><h4>{cate.name}</h4></li>
                        </Link>
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
    </div>
  );
};

export default ChapterList;

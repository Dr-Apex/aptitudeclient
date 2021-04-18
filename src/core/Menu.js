import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getTopics} from './helper/coreapicalls';
import {signout} from '../auth/helper';

const Menu = ({show, type, history}) => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');

  const preload = () => {
    getTopics().then(data => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setTopics(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className='menu' style={{display: show ? '' : 'none'}}>
      <ul>
        {type === "admin" ? (
            <ul>
              <Link to='/add-topic'>
                <li>Add Topic</li>
              </Link>
              <Link to='/add-chapter'>
                <li>Add Chapter</li>
              </Link>
              <Link to='/add-product'>
                <li>Add Question</li>
              </Link>
              <button
                onClick={() => {
                  signout(() => {
                    history.push('/');
                  });
                }}
              >
                Signout
              </button>
            </ul>
          ) : false
        }
        {type === "topic" && topics &&
          topics.map((topic, i) => {
            if (topic.exam === false) {
              return (
                <Link key={i} to={`/chapter-list/${topic._id}`}>
                  <li>{topic.name}</li>
                </Link>
              );
            }
            return true;
          })}
        {type === "exam" && topics &&
          topics.map((topic, i) => {
            if (topic.exam === true) {
              return (
                <Link key={i} to={`/chapter-list/${topic._id}`}>
                  <li>{topic.name}</li>
                </Link>
              );
            }
            return true;
          })}
      </ul>
    </div>
  );
};

export default Menu;

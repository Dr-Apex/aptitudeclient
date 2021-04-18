import React from 'react';
import {signout, isAuthenticated} from '../auth/helper';
import Menu from './Menu';

const PhoneMenu = ({show, history, topic, setTopic, exam, setExam, admin, setAdmin}) => {
  return (
    <div className={show}>
      <div className="phone">
        <ul>
          <button onClick={() => setTopic(!topic)}>
            Topics
            <Menu show={topic} type="topic" />
          </button>
        </ul>
        <ul>
          <button onClick={() => setExam(!exam)}>
            Exams
            <Menu show={exam} type="exam" />
          </button>
        </ul>
        <ul>
          {isAuthenticated() && isAuthenticated().user.role === 1 ? (
            <button onClick={() => setAdmin(!admin)}>
              Admin
              <Menu show={admin} type="admin" history={history} />
            </button>
          ) : (
            <button
              onClick={() => {
                signout(() => {
                  history.push('/');
                });
              }}
            >
              Signout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PhoneMenu;

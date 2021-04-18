import React, {useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/helper';
import Menu from './Menu';
import PhoneMenu from './PhoneMenu';

const Navbar = ({history}) => {
  const [buttons, setButtons] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [topic, setTopic] = useState(false);
  const [exam, setExam] = useState(false);
  const show = buttons ? "" : "show";

  return (
    <div className="nav">
      <div className="logo">
        <h1>
          <Link to="/home">Aptitude Cracker</Link>
        </h1>
      </div>
      <div className="user">
        <div className="menu-btn">
          <button onClick={() => setTopic(!topic)}>
            Topics
            <Menu show={topic} type="topic" />
          </button>
          <button onClick={() => setExam(!exam)}>
            Exams
            <Menu show={exam} type="exam" />
          </button>
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
          <button className="trigger" onClick={() => setButtons(!buttons)}>
            |||
          </button>
        </div>
      </div>
      <PhoneMenu
        show={show}
        history={history}
        topic={topic}
        setTopic={setTopic}
        exam={exam}
        setExam={setExam}
        admin={admin}
        setAdmin={setAdmin}
      />
    </div>
  );
};

export default withRouter(Navbar);

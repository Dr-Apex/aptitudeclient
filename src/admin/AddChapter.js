import React, {useState, useEffect} from 'react';
import {getTopics, createCategory} from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper';
import Navbar from './../core/Navbar';

const AddChapter = () => {
  const {user, token} = isAuthenticated();
  const [info, setInfo] = useState([]);

  const [values, setValues] = useState({
    name: '',
    topics: [],
    topic: '',
    error: '',
    createdChapter: ''
  });

  const {
    name,
    topics,
    topic,
    error,
    createdChapter
  } = values;

  const preload = () => {
    getTopics().then(data => {
      console.log(data);
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values, topics: data, formData: new FormData()});
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    setValues({...values, [name]: value});
    setInfo({...info, [name]: value});
  };

  const onSubmit = event => {
    event.preventDefault();
    setInfo({
      ...info,
      name: name,
      topic: topic
    });
    setValues({...values, error: '', loading: true});

    //backend request fired
    createCategory(user._id, token, info)
    .then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          name: '',
          createdChapter: data.name
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className='alert alert-success mt-3'
        style={{display: createdChapter ? '' : 'none'}}
      >
        <h4>{createdChapter} created successfully</h4>
      </div>
    );
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div
          className='alert alert-success mt-3'
          style={{display: createdChapter ? '' : 'none'}}
        >
          <h4>Failed to create chapter</h4>
        </div>
      );
    }
  };

  const createChapterForm = () => (
    <form>
      <h3>ENTER CHAPTER</h3>
      <div>
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="chapter"
          value={name}
        />
      </div>
      <h4>SELECT TOPIC</h4>
      <div>
        <select
          onChange={handleChange("topic")}
          className="form-control"
          placeholder="Topic"
        >
          <option>Select</option>
          {topics &&
            topics.map((t, i) => (
              <option key={i} value={t._id}>{t.name}</option>
            ))
          }
        </select>
      </div>

      <button type="submit" onClick={onSubmit}>
        Create Chapter
      </button>
    </form>
  );

  return (
    <div>
      <Navbar />
      <div className="subs">
        <h4>ADD CHAPTER</h4>
      </div>
      <div className="question-card">
        <div className='add-box'>
          <div className='add-form'>
            {successMessage()}
            {warningMessage()}
            {createChapterForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;

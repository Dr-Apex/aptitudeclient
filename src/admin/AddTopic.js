import React, {useState} from 'react';
import {createTopic} from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper';
import Navbar from './../core/Navbar';

const AddTopic = () => {
  const {user, token} = isAuthenticated();
  const [info, setInfo] = useState([]);

  const [values, setValues] = useState({
    name: '',
    exam: '',
    error: '',
    createdTopic: ''
  });

  const {
    name,
    exam,
    error,
    createdTopic
  } = values;

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
      exam: exam
    });
    setValues({...values, error: '', loading: true});
    console.log(info);

    //backend request fired
    createTopic(user._id, token, info)
    .then(data => {
      console.log(data);
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          name: '',
          exam: '',
          loading: false,
          createdTopic: data.name
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className='alert alert-success mt-3'
        style={{display: createdTopic ? '' : 'none'}}
      >
        <h4>{createdTopic} created successfully</h4>
      </div>
    );
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div
          className='alert alert-success mt-3'
          style={{display: createdTopic ? '' : 'none'}}
        >
          <h4>Failed to create topic</h4>
        </div>
      );
    }
  };

  const createTopicForm = () => (
    <form>
      <h3>ENTER TOPIC</h3>
      <div>
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="topic"
          value={name}
        />
      </div>
      <h4>SELECT TYPE</h4>
      <div>
        <select
          onChange={handleChange("exam")}
          className="form-control"
          placeholder="Exam"
        >
          <option>Select</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <button type="submit" onClick={onSubmit}>
        Create Topic
      </button>
    </form>
  );

  return (
    <div>
      <Navbar />
      <div className="subs">
        <h4>ADD TOPIC</h4>
      </div>
      <div className="question-card">
        <div className='add-box'>
          <div className='add-form'>
            {successMessage()}
            {warningMessage()}
            {createTopicForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTopic;

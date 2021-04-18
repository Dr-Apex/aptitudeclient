import React, {useState, useEffect} from 'react';
import {getTopics, getCategories, createProduct} from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper';
import Navbar from './../core/Navbar';

const AddProduct = () => {
  const {user, token} = isAuthenticated();
  const [info, setInfo] = useState([]);

  const [values, setValues] = useState({
    name: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
    time: '',
    topics: [],
    topic: '',
    categories: [],
    category: '',
    answered: false,
    error: '',
    createdProduct: ''
  });

  const {
    name,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    time,
    topics,
    categories,
    answered,
    error,
    createdProduct
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

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values, categories: data, formData: new FormData()});
      }
    });
  };

  useEffect(() => {
    preload();
    setInfo({...info, "answered": answered});
  }, []);

  const handleTopic = () => {
    loadCategories();
  };

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    if (name === 'topic') {
      handleTopic();
    }
    setValues({...values, [name]: value});
    setInfo({...info, [name]: value});
    console.log(info);
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: ''});

    //backend request fired
    createProduct(user._id, token, info)
    .then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          name: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctOption: '',
          time: '',
          createdProduct: data.name
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className='alert alert-success mt-3'
        style={{display: createdProduct ? '' : 'none'}}
      >
        <h4>{createdProduct} created successfully</h4>
      </div>
    );
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div
          className='alert alert-success mt-3'
          style={{display: createProduct ? '' : 'none'}}
        >
          <h4>Failed to create product</h4>
        </div>
      );
    }
  };

  const createProductForm = () => (
    <form>
      <h3>Question</h3>
      <div>
        <textarea
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <h4>Details</h4>
      <div>
        <input
          onChange={handleChange("optionA")}
          name="photo"
          className="form-control"
          placeholder="optionA"
          value={optionA}
        />
      </div>
      <div>
        <input
          onChange={handleChange("optionB")}
          name="photo"
          className="form-control"
          placeholder="optionB"
          value={optionB}
        />
      </div>
      <div>
        <input
          onChange={handleChange("optionC")}
          name="photo"
          className="form-control"
          placeholder="optionC"
          value={optionC}
        />
      </div>
      <div>
        <input
          onChange={handleChange("optionD")}
          name="photo"
          className="form-control"
          placeholder="optionD"
          value={optionD}
        />
      </div>
      <div>
        <input
          onChange={handleChange("correctOption")}
          name="photo"
          className="form-control"
          placeholder="correctOption"
          value={correctOption}
        />
      </div>
      <div>
        <input
          onChange={handleChange("time")}
          name="photo"
          className="form-control"
          placeholder="Average Time"
          value={time}
        />
      </div>
      <h4>Topic</h4>
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
      <div>
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, i) => {
              if (cate.topic._id === info.topic) {
                return <option key={i} value={cate._id}>{cate.name}</option>;
              }
              else {
                return true;
              }
            })
          }
        </select>
      </div>

      <button type="submit" onClick={onSubmit}>
        Create Question
      </button>
    </form>
  );

  return (
    <div>
      <Navbar />
      <div className="subs">
        <h4>ADD QUESTION</h4>
      </div>
      <div className="question-card">
        <div className='add-box'>
          <div className='add-form'>
            {successMessage()}
            {warningMessage()}
            {createProductForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

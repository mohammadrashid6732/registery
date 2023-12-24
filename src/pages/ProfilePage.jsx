import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//STYLES 
import styles from '../styles/ProfilePage.module.css';
function ProfilePage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    age: userData.age,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const validateRegex = /^[A-Za-z0-9_]+$/;

  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (data.age <= 18) {
      validationErrors.age = "Your age must be 18 or more.";
    } else if (data.age > 100) {
      validationErrors.age = "Your age cannot be more than 100.";
    }
    if (!validateRegex.test(data.firstname)) {
      validationErrors.firstname = "Your first name is invalid.";
    }
    if (!validateRegex.test(data.lastname)) {
      validationErrors.lastname = "Your last name is invalid.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, ...data })
      );
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="First Name"
          name="firstname"
          value={data.firstname}
          onChange={changeHandler}
        />
        {errors.firstname && <p className={styles.inputError}>{errors.firstname}</p>}
        <input
          className={styles.input}
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={data.lastname}
          onChange={changeHandler}
        />
        {errors.lastname && <p className={styles.inputError}>{errors.lastname}</p>}
        <input
          className={styles.input}
          type="number"
          placeholder="Age"
          name="age"
          value={data.age}
          onChange={changeHandler}
        />
        {errors.age && <p className={styles.inputError}>{errors.age}</p>}
        <button className={styles.button} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfilePage;


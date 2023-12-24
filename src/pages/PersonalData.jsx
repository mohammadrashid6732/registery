import { useState } from "react";
import { useNavigate } from "react-router-dom";
//STYLES
import styles from '../styles/PersonalData.module.css'

function PersonalData() {
  const [data, setData] = useState({
    fristname: "",
    lastname: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const validataErrors = {};

  const validateRegex = /^[A-Za-z0-9_]+$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (data.age <= 18) {
      validataErrors.age = "your age 18 or more";
    } else if (data.age > 100) {
      validataErrors.age = "your age cant more 100";
    }
    if (!validateRegex.test(data.fristname)) {
      validataErrors.fristname = "your fristname is invalid";
    }
    if (!validateRegex.test(data.lastname)) {
      validataErrors.lastname = "your lastname is invalid";
    }

    setErrors(validataErrors);

    if (Object.keys(validataErrors).length === 0) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ isCompleted: true, ...data })
      );
      navigate("/");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          type="text"
          placeholder="Frist Name"
          name="fristname"
          value={data.fristname}
          onChange={changeHandler}
        />
        {errors.fristname && <p className={styles.error}>{errors.fristname}</p>}
        <input
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={data.lastname}
          onChange={changeHandler}
        />
        {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={data.age}
          onChange={changeHandler}
        />
        {errors.age && <p className={styles.error}>{errors.age}</p>}
        <button type="submit" className={styles.button}>submit</button>
      </form>
    </div>
  );
}

export default PersonalData;

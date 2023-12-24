import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContextProvider } from "../context/auth";
//STYLES
import styles from '../styles/LoginPage.module.css';

function LoginPage() {
  const { login } = useAuthContextProvider();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const validataErrors = {};
  const submitHandler = (e) => {
    e.preventDefault();

    if (data.username !== "admin") {
      validataErrors.username = "username is not invalid";
    }
    if (data.password.length < 8 && data.password !== "123") {
      validataErrors.password = "password not invalid";
    }

    setErrors(validataErrors);

    if (Object.keys(validataErrors).length === 0) {
      login();
      navigate("/");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={submitHandler} className={styles.loginForm}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={data.username}
          onChange={changeHandler}
          className={styles.inputField}
        />
        {errors.username && <p className={styles.errorMsg}>{errors.username}</p>}
        <input
          type="password"
          placeholder="password"
          name="password"
          value={data.password}
          onChange={changeHandler}
          className={styles.inputField}
        />
        {errors.password && <p className={styles.errorMsg}>{errors.password}</p>}
        <button type="submit" className={styles.submitButton}>submit</button>
      </form>
    </div>
  );
}

export default LoginPage;

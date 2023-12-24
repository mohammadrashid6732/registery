import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContextProvider } from "../context/auth";
//STYLES
import styles from '../styles/SignUpPage.module.css'

function SignUpPage() {
  const { login } = useAuthContextProvider();
  const [data, setData] = useState({
    username: "",
    password: "",
    confrimpassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const validataErrors = {};

  const usernameRegex = /^[A-Za-z\d_]{3,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!usernameRegex.test(data.username)) {
      validataErrors.username =
        "Username must be at least 3 characters long and can only contain letters, numbers, and underscores.";
    }

    if (!passwordRegex.test(data.password)) {
      validataErrors.password =
        "Password must be at least 8 characters long and include at least one letter and one number.";
    }

    if (data.password !== data.confrimpassword) {
      validataErrors.password = "password not match";
    }

    setErrors(validataErrors);

    if (Object.keys(validataErrors).length === 0) {
      login();
      localStorage.setItem("userData", JSON.stringify({ isCompleted: false }));
      navigate("/personaldata");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={changeHandler}
          className={styles.input}
        />
        {errors.username && <span className={styles.errorMsg}>{errors.username}</span>}

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={changeHandler}
          className={styles.input}
        />
        {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}

        <input
          type="password"
          placeholder="Confrim Password"
          name="confrimpassword"
          value={data.confrimpassword}
          onChange={changeHandler}
          className={styles.input}
        />
        {errors.confrimpassword && <span className={styles.errorMsg}>{errors.confrimpassword}</span>}

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );

}

export default SignUpPage;

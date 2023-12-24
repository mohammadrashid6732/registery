import { useNavigate } from "react-router-dom";
import styles from "../../styles/StartPage.module.css";

function StartPage() {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/auth/login");
  };

  const signInHandler = () => {
    navigate("/auth/signup");
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={loginHandler}>
          Login Button
        </button>
        <button className={styles.button} onClick={signInHandler}>
          SignUp Button
        </button>
      </div>
    </div>
  );
}

export default StartPage;

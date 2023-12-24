import React, { useState } from "react";
import { useAuthContextProvider } from "../context/auth";
import { Link } from "react-router-dom";
//styles
import styles from '../styles/HomePage.module.css';


function HomePage() {
  const { logout, isAuth } = useAuthContextProvider();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLogout, setIsLogout] = useState(false)
  const [showMenu, setShowMenu] = useState(false);



  const logoutHandler = () => {
    setIsLogout(true)
  }
  const confrimLogout = () => {
    logout()
    setIsLogout(false)
  }
  const cancelLogout = () => {
    setIsLogout(false)
  }


  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }





  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <button onClick={toggleMenu} className={styles.menuButton}>☰</button>
      </div>

      <div className={`${styles.menuContent} ${showMenu ? styles.menuContentActive : ''}`}>
        <Link to='aboutus' className={styles.menuLink}>
          <button>About Us</button>
        </Link>
        <Link to='contact' className={styles.menuLink}>
          <button>Contact</button>
        </Link>
      </div>

      <div className={styles.welcomeMessage}>
        {isAuth && userData && userData.isCompleted && (
          <>
            <p>Welcome, {userData.fristname} {userData.lastname}!</p>
            <p>You are {userData.age} years old.</p>
          </>
        )}
      </div>

      {isLogout && (
        <div className={styles.logoutOverlay}>
          <div className={styles.logoutConfirm}>
            <p>Are you sure you want to exit the app?</p>
            <div className={styles.buttonContainer}>
              <button onClick={confrimLogout} className={styles.actionButton}>Yes</button>
              <button onClick={cancelLogout} className={styles.actionButton}>No</button>
            </div>

          </div>
        </div>
      )}

      <div className={styles.tab}>
        <button onClick={logoutHandler} className={styles.actionButton}>Logout</button>
        <button className={styles.actionButton}>Home</button>
        <Link to='/profilepage'>
          <button className={styles.actionButton}>Profile</button>
        </Link>
      </div>
    </div>
  );



}


export default HomePage;
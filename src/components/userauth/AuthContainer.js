import React, { useState, useEffect } from "react";
import styles from './styles.css';
import {useNavigate, useParams, } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function AuthContainer() {
  const [signIn, setSignIn] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [gender, setGender] = useState("");
  const [user_role, setUser_role] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios
      .get('http://localhost:8000/api/department')
      .then((response) => {
        console.log(response.data)
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleRoleChange = (event) => {
    setUser_role(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      gender: formData.get("gender"),
      department_name: formData.get("department"),
      user_role: formData.get("user_role"),
      password_confirmation: formData.get("password_confirmation"),
    };

    axios
      .post('http://localhost:8000/api/register', userData,
          {
            headers:{
              'Accept': 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json',
            }
          })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate('/task');
        // Redirect the user to the dashboard or perform other actions after successful registration
        // Example: history.push('/dashboard');
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("Login button clicked");
    const formData = new FormData(event.target);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };


    axios
      .post('http://localhost:8000/api/login', credentials)
      .then((response) => {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        console.log("Login data:", response.data);
        console.log("Login data:", token);
        navigate('/task');
        // Redirect the user to the dashboard or perform other actions after successful login
        // Example: history.push('/dashboard');
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };
  const containerClass = signIn ? "" : "sign-up-mode";
  return (
<div className="body">
    <div className={`package ${containerClass}`}>


        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSignIn}>
  <h2 className="title">Sign in</h2>
  <div className="input-field">
    <i className="fas fa-user"></i>
    <input type="text" name="email" placeholder="Email" />
  </div>
  <div className="input-field">
    <i className="fas fa-lock"></i>
    <input type="password" name="password" placeholder="Password" />
  </div>
  <input type="submit" value="Login" className="btn solid" />
  <p className="social-text">Or Sign in with social platforms</p>
  <div className="social-media">
    <a href="#" className="social-icon">
      <i className="fab fa-facebook-f">
        <FontAwesomeIcon icon={faFacebookF} />
      </i>
    </a>
    <a href="#" className="social-icon">
      <i className="fab fa-twitter">
        <FontAwesomeIcon icon={faTwitter} />
      </i>
    </a>
    <a href="#" className="social-icon">
      <i className="fab fa-google">
        <FontAwesomeIcon icon={faGoogle} />
      </i>
    </a>
    <a href="#" className="social-icon">
      <i className="fab fa-linkedin-in">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </i>
    </a>
  </div>
</form>
<form className="sign-up-form" onSubmit={handleSignUp}>
  <h2 className="title">Sign up</h2>
  <div className="input-field">
    <i className="fas fa-user"></i>
    <input type="text" name="username" placeholder="Username" />
  </div>
  <div className="input-field">
    <i className="fas fa-envelope"></i>
    <input type="email" name="email" placeholder="Email" />
  </div>
  <div className="input-field">
    <i className="fas fa-lock"></i>
    <input type="password" name="password" placeholder="Password" />
  </div>
  <div >
    <select className="input-field" name="gender" value={gender} onChange={handleGenderChange}>
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
  <div >
    <select className="input-field" name="department">
      <option value="">Select Department</option>
      {departments.map((department) => (
        <option key={department.id} value={department.dept_name}>
          {department.dept_name}
        </option>
      ))}
    </select>
  </div>
  <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="password_confirmation" placeholder="Confirm Password" />
  </div>

  <div >
    <select className="input-field" name="user_role" value={user_role} onChange={handleRoleChange}>
      <option value="">Select Your Role</option>
      <option value="staff">Staff</option>
      <option value="approver">Approver</option>
    </select>
  </div>

  <input type="submit" className="btn" value="Sign up" />
  <p className="social-text">Or Sign up with social platforms</p>
  {/*<div className="social-media">*/}
  {/*  <a href="#" className="social-icon">*/}
  {/*    <i className="fab fa-facebook-f">*/}
  {/*      <FontAwesomeIcon icon={faFacebookF} />*/}
  {/*    </i>*/}
  {/*  </a>*/}
  {/*  <a href="#" className="social-icon">*/}
  {/*    <i className="fab fa-twitter">*/}
  {/*      <FontAwesomeIcon icon={faTwitter} />*/}
  {/*    </i>*/}
  {/*  </a>*/}
  {/*  <a href="#" className="social-icon">*/}
  {/*    <i className="fab fa-google">*/}
  {/*      <FontAwesomeIcon icon={faGoogle} />*/}
  {/*    </i>*/}
  {/*  </a>*/}
  {/*  <a href="#" className="social-icon">*/}
  {/*    <i className="fab fa-linkedin-in">*/}
  {/*      <FontAwesomeIcon icon={faLinkedinIn} />*/}
  {/*    </i>*/}
  {/*  </a>*/}
  {/*</div>*/}
</form>

          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={toggleSignIn}>
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn transparent" id="sign-in-btn" onClick={toggleSignIn}>
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;

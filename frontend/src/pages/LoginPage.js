import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login, register } from "../features/auth/authSlice";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const LoginPage = () => {
  const [isInLogin, setIsInLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
//use usestate to handle the input for name,email and password then fromm the initial value form a form data 
  
  const { isError, message, isSuccess, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // dispatch(reset());
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
      console.log(user);
    }
  }, [isSuccess, user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    
    if (!isInLogin) {
      userData.name = data.get("name");
      return dispatch(register(userData));
    }

    dispatch(login(userData));
  };
  
  

  return (
    <main className="container">
      <div className="center f-col">
        <form id="loginForm" className="login" onSubmit={handleSubmit} >
          <div className="flex a-center mb-2">
            <div
              className={`auth-header ${isInLogin && "active"}`}
              onClick={() => setIsInLogin(true)}
            >
              <h2>Login</h2>
            </div>
            <div
              className={`auth-header ${!isInLogin && "active"}`}
              onClick={() => setIsInLogin(false)}
            >
              <h2>Register</h2>
            </div>
          </div>
          {!isInLogin && (
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" placeholder="Name" />
            </div>
          )}
          <div className="form-control">
            <label htmlFor="Name">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="form-control">
            <label htmlFor="Name">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="custom-hr"></div>
          <button type="submit" className="btn loginButton btn-fullwidth mt-2">
            {isInLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;

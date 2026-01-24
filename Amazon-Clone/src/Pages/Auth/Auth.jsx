import React, { useState, useContext,useEffect } from "react";
import classes from "./Signup.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { Link,Navigate, useLocation, useNavigate} from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ FIXED: lowercase 'password'
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
  const navigate = useNavigate()
  
  const navStateData = useLocation();
  console.log(navStateData);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/"); // or any page you want
  //   }
  // }, [user, navigate]);

  //  console.log(user);
  // console.log(password,email);
  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    
    if (e.target.name == "signin") {
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
           navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        navigate(navStateData?.state?.redirect || "/");
          
        });
    } else {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signup: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signup: false });
            // navigate("/");
        });
    }
  };

  return (
    <section className={classes.login_container}>
      <Link to={"/"}>
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG2.png" alt="" />
      </Link>
      <div>
        <h1>SIgn-in</h1>
        {navStateData?.state?.msg && (
          <small style={{ padding: "10px", color: "red" ,textAlign:"center", fontWeight:"bold"}}>
            {navStateData.state.msg}
          </small>
        )

        }
        {navStateData?.state?.msg}
        <form action="">
          <div>
            <label htmlFor="email"> Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password"> Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login_signbtn}
          >
            {loading.signin ? <ClipLoader color="#000" size={15} /> : "sign In"}
          </button>
          <p>
            By signing-in you agree to the AMAZONE FAKE CLONE condition of use
            and sale. please see see our privacy Notice.
          </p>
          <button
            type="submit"
            name="signup"
            onClick={authHandler}
            className={classes.login_registerbtn}
          >
            {loading.signup ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "creat your account "
            )}
          </button>
          {error && (
            <small style={{ padding: "10px", color: "red" }}>{error}</small>
          )}
        </form>
      </div>
    </section>
  );
}

export default Auth;

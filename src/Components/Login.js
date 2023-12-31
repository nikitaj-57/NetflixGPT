import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  function handleButtonClick() {
    const result = checkValidData(email.current.value, password.current.value);
    setErrorMessage(result);

    // Sign in/ Sign up
    if (result) return;

    if (!isSignInForm) {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // connect to redux
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  function handleSignInToggle() {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 p-12 absolute my-36 mx-auto right-0 left-0 bg-black bg-opacity-90 rounded-lg"
      >
        <h1 className="font-bold text-3xl text-white py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 my-4 bg-zinc-700 text-white"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email or phone number"
          className="w-full p-4 my-4 bg-zinc-700 text-white"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 my-4 bg-zinc-700 text-white"
          ref={password}
          autoComplete="false"
        />
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <button
          className="bg-red-600 text-white w-full p-4 my-6 rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {!isSignInForm ? (
          <p className="text-white">
            Already registered?
            <span className="cursor-pointer" onClick={handleSignInToggle}>
              {" "}
              Sign In now.
            </span>
          </p>
        ) : (
          <p className="text-white">
            New to Netflix?
            <span className="cursor-pointer" onClick={handleSignInToggle}>
              {" "}
              Sign up now.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;

import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  function handleSignOut() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // sign in case
        const { uid, email, displayName, photoURL } = user;
        // connect to redux
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe(); // unsubscribe when component unmounts
  }, []);
  return (
    <div className="flex justify-between w-screen absolute  px-8 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-48 " src={LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex p-2">
          <img src={user?.photoURL} alt="user-logo" className="w-12 h-12" />
          <button onClick={handleSignOut} className="text-white">
            (sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

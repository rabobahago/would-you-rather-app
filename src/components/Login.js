import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../actions/shared";

const Login = (props) => {
  const [user, setUser] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(({ users, authedUser }) => {
    var userArray = [];
    Object.entries(users).forEach(([key, value]) =>
      userArray.push({
        id: value.id,
        name: value.name
      })
    );
    return {
      users: userArray,
      authedUser
    };
  });
  useEffect(() => {
    // redirect to home if user is already authenticated
    props.authedUser && props.history.push("/home");
  }, [props.authedUser, props.history]);

  const handleUserSelected = (user) => {
    if (user !== "") {
      setUser(user);
      setLoginFailed(!loginFailed);
    }
  };

  const handleClick = () => {
    if (user !== "") {
      dispatch(authenticate(user));
      props.match.params.id
        ? props.history.push(`/questions/${props.match.params.id}`)
        : props.history.push("/home");
    } else {
      setLoginFailed(!loginFailed);
    }
  };
  return (
    <div className="login-box">
      <p className="text-center">Login to play</p>
      {loginFailed && (
        <div>
          <small className="pink-text">
            You have to choose a user to login
          </small>
          <br />
          <br />
        </div>
      )}
      <select
        className="form-control"
        value={user}
        onChange={(e) => handleUserSelected(e.target.value)}
      >
        <option value="">Choose a User</option>
        {data.users.length > 0 &&
          data.users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
      </select>
      <button
        className="btn-login form-control"
        type="submit"
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  );
};
export default Login;

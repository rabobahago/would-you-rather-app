import React, { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../actions/shared";

const Nav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(({ users, authedUser }) => {
    if (users[authedUser] !== undefined) {
      return {
        authedUser: authedUser,
        name: users[authedUser].name,
        avatar: users[authedUser].avatarURL
      };
    }
    return { authedUser: "" };
  });
  const handleLogout = () => {
    dispatch(authenticate(""));
    history.push("/");
  };

  useEffect(() => {
    // redirect to login if no authedUser
    data.authedUser === "" && history.push("/");
  }, [data.authedUser, history]);

  const { avatar, authedUser, name } = data;
  return (
    <div>
      <div className="row profile">
        {avatar ? (
          <img src={avatar} className="profile-image" alt="profile" />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            className="profile-image"
            alt="profile"
          />
        )}
        <p className="text-center">
          Hello, {name} ( {authedUser} )
        </p>
        <button className="center-block" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="row navigation">
        <ul>
          <li>
            <NavLink to="/home" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" exact activeClassName="active">
              Add Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" exact activeClassName="active">
              LeaderBoard
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;

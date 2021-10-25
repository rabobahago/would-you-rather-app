import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const data = useSelector(({ users }) => {
    var userArray = [];
    Object.entries(users).forEach(([key, value]) => {
      const questions = value.questions.length;
      const answers = Object.keys(value.answers).length;
      userArray.push({
        id: value.id,
        name: value.name,
        avatarURL: value.avatarURL,
        questions: questions,
        answers: answers,
        score: questions + answers
      });
    });
    return {
      users: userArray.sort((a, b) => b.score - a.score)
    };
  });
  return (
    <div className="text-center">
      <Nav />
      <br />
      {data.users !== undefined &&
        data.users.map((user) => (
          <div className="card-lg center-block" key={user.id}>
            <div className="row">
              <div className="img-col">
                <img
                  src={user.avatarURL}
                  className="profile-image"
                  alt="profile"
                />
              </div>
              <div className="details-col">
                <p>
                  {user.name} ({user.id}){" "}
                </p>
                <p>{user.answers} answered questions</p>
                <p>{user.questions} created questions</p>
                <br />
              </div>
              <div className="score-col">
                <p>
                  <strong>Score: {user.score}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default LeaderBoard;

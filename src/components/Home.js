import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  const [questionType, setQuestionType] = useState("unanswered");
  useEffect(() => {
    if (props.authedUser === null) {
      props.history.push("/");
    }
  }, [props.authedUser, props.history]);

  const handleUnansweredQuestionsClick = () => {
    setQuestionType("unanswered");
  };

  const handleAnsweredQuestionsClick = () => {
    setQuestionType("answered");
  };

  const { myAnswers, questions, users } = props;
  const answered = Object.values(questions)
    .filter((question) => myAnswers.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => !myAnswers.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  return (
    <div className="text-center">
      <Nav />
      <br />
      <div className="card-lg-2 center-block">
        <ul>
          <li>
            {questionType === "unanswered" ? (
              <button className="active">Unanswered Questions</button>
            ) : (
              <button onClick={handleUnansweredQuestionsClick}>
                Unanswered Questions
              </button>
            )}
          </li>
          <li>
            {questionType === "answered" ? (
              <button className="active">Answered Questions</button>
            ) : (
              <button onClick={handleAnsweredQuestionsClick}>
                Answered Questions
              </button>
            )}
          </li>
        </ul>
        {questionType === "unanswered" &&
          questions !== undefined &&
          unanswered.map((question) => (
            <div className="questionlistcard" key={question.id}>
              <div className="row">
                <div className="img-col">
                  <img
                    src={users[question.author].avatarURL}
                    className="profile-image"
                    alt="profile"
                  />
                </div>
                <div className="details-col">
                  <p>{users[question.author].name} asks - Would you rather</p>
                  <p>
                    <strong>{question.optionOne.text}...</strong>
                  </p>
                  <p>
                    <NavLink to={`/questions/${question.id}`}>
                      View Poll
                    </NavLink>
                  </p>
                  <br />
                </div>
              </div>
            </div>
          ))}
        {questionType === "answered" &&
          questions !== undefined &&
          answered.map((question) => (
            <div className="questionlistcard" key={question.id}>
              <div className="row">
                <div className="img-col">
                  <img
                    src={users[question.author].avatarURL}
                    className="profile-image"
                    alt="profile"
                  />
                </div>
                <div className="details-col">
                  <p>{users[question.author].name} asks - Would you rather</p>
                  <p>
                    <strong>{question.optionOne.text}...</strong>
                  </p>
                  <p>
                    <NavLink to={`/results/${question.id}`}>
                      View Answer
                    </NavLink>
                  </p>
                  <br />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

function mapStateToProps({ users, authedUser, questions }) {
  return {
    users: users ? users : [],
    questions: questions ? questions : [],
    myAnswers: users[authedUser] ? Object.keys(users[authedUser].answers) : []
  };
}

export default connect(mapStateToProps)(Home);

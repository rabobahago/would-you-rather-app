import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import PageNotFound from "./PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";

const Question = (props) => {
  const { id } = useParams();
  const [option, setOption] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(({ authedUser, questions, users }, props) => {
    return {
      question: questions ? questions[id] : null,
      author: users && questions[id] ? users[questions[id].author] : null,
      authedUser: authedUser ? authedUser : null
    };
  });
  useEffect(() => {
    if (data.authedUser === null)
      props.history.push(`/login/redirect/${props.match.params.id}`);
  }, [data.authedUser, props.history, props.match.params.id]);

  const handleRadioOptionChange = (value) => {
    setOption(value);
    setSubmitError(false);
  };

  const handleSubmit = () => {
    if (option === "") {
      setSubmitError(true);
      return;
    }

    // save answer
    dispatch(
      handleAnswerQuestion(data.authedUser, props.match.params.id, option)
    );

    // redirect to result page
    props.history.push(`/results/${props.match.params.id}`);
  };
  const { question, author } = data;

  if (question === undefined) {
    return <PageNotFound />;
  }

  return (
    <div className="text-center">
      <Nav />
      <br />
      <div className="card center-block">
        {submitError && (
          <div>
            <small className="pink-text">You have to select an answer</small>
            <br />
            <br />
          </div>
        )}
        {author && (
          <div>
            <img
              src={author.avatarURL}
              className="profile-image"
              alt="profile"
            />
            <h3>
              <small>{author.name} asks:</small>
            </h3>
          </div>
        )}
        <p>Would you rather?</p>
        {question && (
          <form action="" className="question-form">
            <input
              type="radio"
              name="answer"
              value="optionOne"
              onChange={(e) => handleRadioOptionChange(e.target.value)}
            />{" "}
            {question.optionOne.text}
            <br />
            <span>Or</span>
            <br />
            <input
              type="radio"
              name="answer"
              value="optionTwo"
              onChange={(e) => handleRadioOptionChange(e.target.value)}
            />{" "}
            {question.optionTwo.text}
            <br />
          </form>
        )}
        <button className="addquestion" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Question;

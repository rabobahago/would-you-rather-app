import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { handleAddQuestion } from "../actions/questions";

const AddQuestion = (props) => {
  const dispatch = useDispatch();

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionsIncomplete, setOptionsIncomplete] = useState(false);
  const [questionAdded, setQuestionAdded] = useState(false);

  const data = useSelector(({ authedUser, questions }) => {
    return {
      authedUser,
      questions
    };
  });
  const handleOptionOneChange = (optionOne) => {
    setOptionOne(optionOne);
    setOptionsIncomplete(optionsIncomplete);
    setQuestionAdded(questionAdded);
  };
  const handleOptionTwoChange = (optionTwo) => {
    setOptionTwo(optionTwo);
    setOptionsIncomplete(optionsIncomplete);
    setQuestionAdded(questionAdded);
  };
  const handleAddQuestionClick = () => {
    if (optionOne.trim() === "" || optionTwo.trim() === "") {
      setOptionsIncomplete(!optionsIncomplete);
      setOptionOne("");
      setOptionTwo("");
      return;
    }
    dispatch(handleAddQuestion(optionOne, optionTwo, data.authedUser));
    setOptionTwo("");
    setOptionOne("");
    setQuestionAdded(!questionAdded);
  };

  return (
    <div className="text-center">
      <Nav />
      <br />
      {questionAdded && (
        <p>
          <small className="pink-text">
            Question added. You can add more if you like{" "}
          </small>
        </p>
      )}
      <div className="card center-block">
        <h3>
          <small>Add New Question</small>
        </h3>
        <p>
          <small>Complete the Question:</small>
        </p>
        <p>
          <small>Would you rather...</small>
        </p>
        <br />
        {optionsIncomplete && (
          <p>
            <small className="pink-text">Please fill options one & two</small>
          </p>
        )}
        <input
          type="text"
          placeholder="Enter option one text here"
          onChange={(e) => handleOptionOneChange(e.target.value)}
        />
        <span>Or</span>
        <input
          type="text"
          placeholder="Enter option two text here"
          onChange={(e) => handleOptionTwoChange(e.target.value)}
        />
        <button className="addquestion" onClick={handleAddQuestionClick}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;

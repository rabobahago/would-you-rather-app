import { saveQuestionAnswer, saveQuestion } from "../utils/api";

import {
  handleAddQuestionToUser,
  handleAddAnswerToUser
} from "../actions/users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question
  };
};

export const handleAddQuestion = (optionOneText, optionTwoText, author) => {
  return (dispatch) => {
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(handleAddQuestionToUser(question));
    });
  };
};

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
};

const answerQuestion = (authedUser, qid, answer) => {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
};

export const handleAnswerQuestion = (authedUser, qid, answer) => {
  return (dispatch) => {
    return saveQuestionAnswer({
      qid,
      authedUser,
      answer
    }).then(() => {
      dispatch(answerQuestion(authedUser, qid, answer));
      dispatch(handleAddAnswerToUser(authedUser, qid, answer));
    });
  };
};

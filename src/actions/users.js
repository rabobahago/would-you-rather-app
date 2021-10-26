export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

const addQuestionToUser = (question) => {
  return {
    type: ADD_QUESTION_TO_USER,
    question
  };
};

export const handleAddQuestionToUser = (info) => {
  return (dispatch) => {
    dispatch(addQuestionToUser(info));
  };
};

const addAnswerToUser = (authedUser, qid, answer) => {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer
  };
};

export const handleAddAnswerToUser = (authedUser, qid, answer) => {
  return (dispatch) => {
    dispatch(addAnswerToUser(authedUser, qid, answer));
  };
};

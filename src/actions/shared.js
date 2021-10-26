import { getInitialData } from "../utils/api";
import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";

export const handleInitialData = () => {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
};

export const authenticate = (authedId) => {
  return (dispatch) => {
    dispatch(setAuthedUser(authedId));
  };
};

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  return context[0];
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  return context[1];
};

export const setNotification = (message) => {
  console.log(message);
  return {
    type: "SET_NOTIFICATION",
    payload: message,
  };
};

export default notificationReducer;

import React from "react";

const Notification = (props) => {
  const notificationClass = props.errorState ? "error" : "notification";

  if (props.text === null || props.text === "") return null;

  return <div className={notificationClass}>{props.text}</div>;
};

export default Notification;

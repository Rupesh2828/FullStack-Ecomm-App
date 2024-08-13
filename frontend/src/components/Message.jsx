import React from "react";

const Message = ({ variant, children }) => {
  const getVarientClass = () => {
    switch (varient) {
      case "success":
        return "bg-green-100 text-green-800";

      case "error":
        return "bg-red-100 text-red-800";

      default:
        return "bg-blue-100 text-blue-800";
    }
  };
  return <div className={`p-4 rounded ${getVarientClass()}`}>{children}</div>;
};

export default Message;

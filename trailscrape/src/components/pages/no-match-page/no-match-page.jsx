import React from "react";
import Message from "../../shared/message";

const NoMatchPage = (props) => {
  return <Message text={`Sorry, the region '${props.page}' could not be found.`} />;
}

export default NoMatchPage;

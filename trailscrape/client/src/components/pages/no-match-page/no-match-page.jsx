import React from "react";
import Message from "../../shared/message";

const NoMatchPage = (props) => (
  <div>
    <Message text={`Sorry, the region '${props.page}' could not be found.`} />
  </div>
);

export default NoMatchPage;

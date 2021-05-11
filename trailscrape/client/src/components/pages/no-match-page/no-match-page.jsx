import React, { useEffect } from "react";
import Message from "../../shared/message";

const NoMatchPage = (props) => {
  useEffect(() => (document.tile = "404 - Region Not Found | NZ Trail Status"));
  return (
    <div>
      <Message text={`Sorry, the region '${props.page}' could not be found.`} />
    </div>
  );
};

export default NoMatchPage;

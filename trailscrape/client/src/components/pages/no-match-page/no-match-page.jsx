import React, { useEffect } from "react";
import Message from "../../shared/message";

const NoMatchPage = ({ page }) => {
  useEffect(() => (document.tile = "404 - Region Not Found | NZ Trail Status"));
  return (
    <div>
      <Message text={`Sorry, the region '${page}' could not be found.`} />
    </div>
  );
};

export default NoMatchPage;

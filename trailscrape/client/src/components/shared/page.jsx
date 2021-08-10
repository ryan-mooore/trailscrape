import React, { useEffect } from "react";
import BackButton from "./back-button";

const Page = ({ docTitle, title, badge, list, noBack }) => {
  useEffect(() => (document.title = `${docTitle} | NZ Trail Status`));

  return (
    <div>
      {!noBack && <BackButton />}
      <div className="mb-3 mx-auto max-w-md sm:max-w-screen-lg flex flex-col sm:flex-row justify-between items-center">
        {title}
        {badge}
      </div>
      {list}
    </div>
  );
};

export default Page;

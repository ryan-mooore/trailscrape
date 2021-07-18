import React, { useEffect } from "react";
import BackButton from "./back-button";

const Page = ({ docTitle, title, badge, list }) => {
  useEffect(() => (document.title = `${docTitle} | NZ Trail Status`));

  return (
    <div>
      <BackButton />
      <div className="mx-auto max-w-md sm:max-w-screen-lg flex flex-col sm:flex-row justify-between items-center">
        {title}
        {badge}
      </div>
      {list}
    </div>
  );
};

export default Page;

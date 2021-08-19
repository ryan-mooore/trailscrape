import React from "react";
import { Helmet } from "react-helmet-async";
import BackButton from "./back-button";
const Page = ({ docTitle, title, badge, list, noBack, meta }) => {
  return (
    <>
      <Helmet>
        <title>{docTitle} | NZ Trail Status</title>
        <meta name="description" content={meta} />
      </Helmet>
      <div>
        {!noBack && <BackButton />}
        <div className="mb-3 mx-auto max-w-md sm:max-w-screen-lg flex flex-col sm:flex-row justify-between items-center">
          {title}
          {badge}
        </div>
        {list}
      </div>
    </>
  );
};

export default Page;

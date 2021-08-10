import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  const [parentPath, setParentPath] = useState("/");

  useEffect(() => {
    let path = history.location.pathname.split("/");
    path.pop();
    setParentPath(path.join("/"));
  }, [history.location.pathname]);

  return (
    <Link to={parentPath}>
      <div className="fixed top-0 left-0 flex flex-row items-center text-gray-500 pl-4 pt-4">
        <div className="material-icons-round text-3xl w-10 flex flex-row justify-center">
          arrow_back_ios
        </div>
        <div className="flex flex-row  items-center">
          <div className="invisible sm:visible">back</div>
        </div>
      </div>
    </Link>
  );
};

export default BackButton;

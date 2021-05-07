import { Link } from "react-router-dom";

const BackButton = () => (
  <Link to={"/"}>
    <div className="fixed top-0 left-0 flex flex-row items-center text-gray-500 pl-4 pt-4">
      <div className="material-icons-round text-3xl">arrow_back_ios</div>
      <div className="flex flex-row  items-center">
        <div className="invisible sm:visible">back</div>
      </div>
    </div>
  </Link>
);

export default BackButton;
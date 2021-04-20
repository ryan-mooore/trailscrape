import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link
      to={props.link}
      className="bg-white rounded-3xl sm:rounded-full overflow-hidden hover:no-underline hover:shadow-md ml-5 mr-5 pt-2 pb-2 sm:pt-0 sm:pb-0"
    >
      <div className="sm:flex flex-row justify-between sm:h-14 pl-5 pr-2">
        <div className="flex flex-row justify-start items-center">
          {props.left}
        </div>
        <div className="flex flex-row justify-end">{props.right}</div>
      </div>
    </Link>
  );
};

export default Card;

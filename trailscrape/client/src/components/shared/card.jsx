import { Link } from "react-router-dom";

const Card = (props) => {
  const style =
    `${props.bg || "bg-white"} rounded-3xl sm:rounded-full ml-5 mr-5 pt-2 pb-2 mt-3 sm:pt-0 sm:pb-0 group`;
  const layout = (
    <div className="sm:flex flex-row justify-between sm:h-14 pl-5 pr-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center">
          {props.left}
        </div>
        <div className="sm:hidden self-start mr-2 mt-2 pl-4">{props.icon}</div>
      </div>
      <div className="flex flex-row items-center justify-end">
        <div class="hidden sm:group-hover:block">{props.icon}</div>
        {props.right}
      </div>
    </div>
  );
  if (props.link) {
    return (
      <Link
        to={props.link}
        className={`hover:no-underline hover:shadow-md ${style}`}
        title={props.tooltip}
      >
        {layout}
      </Link>
    );
  } else {
    return <div className={style}>{layout}</div>;
  }
};

export default Card;

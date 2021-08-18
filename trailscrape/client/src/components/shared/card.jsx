import { Link } from "react-router-dom";

const Card = ({ left, right, icons, tooltip, link, bg, large, ID }) => {
  const Wrapper = ({ wrapper, children }) => (
    <div className={large ? "row-span-2" : undefined}>
      {link ? wrapper(children) : children}
    </div>
  );

  return (
    <Wrapper
      wrapper={(children) => (
        <Link to={link} title={tooltip}>
          {children}
        </Link>
      )}
    >
      <div
        className={`flex flex-col items-left sm:flex-row justify-between sm:items-center hover:no-underline pl-6 ${
          large ? "md:h-32" : "sm:h-14"
        } ${link ? "hover:shadow-md" : undefined} ${bg || "bg-white"} ${
          large ? "rounded-3xl" : "rounded-3xl sm:rounded-full"
        } px-2 py-2 sm:py-0 group`}
      >
        <div className="flex flex-row justify-between items-center h-14 sm:pt-0">
          <div className="flex flex-row justify-start items-center">{left}</div>
          <div className="sm:hidden self-start mr-2 mt-2 pl-4">{icons}</div>
        </div>
        <div className="flex flex-row justify-end items-center">
          <div className="hidden sm:group-hover:block mr-8">{icons}</div>
          <div className="sm:self-auto">{right}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;

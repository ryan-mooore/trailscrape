const Message = ({ invisible, text }) => (
  <div className={`text-gray-500 ${invisible ? "hidden" : undefined} text-center text-sm pl-6 pr-6 sm:text-xl top-0 absolute h-screen w-screen flex flex-row justify-center items-center`}>
    <h1>{text}</h1>
  </div>
);

export default Message;

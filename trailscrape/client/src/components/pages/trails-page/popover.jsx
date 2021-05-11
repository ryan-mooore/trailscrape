const Popover = (props) => {

  return (
    <div
      class={`z-10 fixed sm:absolute w-3/4 sm:w-auto rounded-md left-1/2 top-1/2 sm:top-auto transform -translate-x-1/2 -translate-y-1/2 sm:translate-y-0 ${
        props.active ? undefined : "hidden"
      }`}
    >
      <div class="sm:relative p-4 sm:w-80 bg-gray-500 rounded-md text-gray-300 text-sm">
        <div class="sm:hidden pb-3 sm:pb-0 flex flex-row justify-end">
          <div
            class="material-icons-round"
            onClick={() => props.onChange(false)}
          >
            close
          </div>
        </div>
        <p>
          This trail status was automatically generated from a Trailforks status
          report. If this status is incorrect, you can{" "}
          <a
            class="underline"
            href={`https://trailforks.com/contribute/report/?trailid=${props.id}`}
          >
            add a new report
          </a>
          .
        </p>
        <p class="text-xs italic pt-8">
          Status can take up to 20 minutes to update.
        </p>
      </div>
    </div>
  );
};

export default Popover;

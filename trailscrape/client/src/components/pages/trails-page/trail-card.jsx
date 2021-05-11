import GradeLogo from "./grade-icon";
import Card from "../../shared/card";
import StatusInfo from "../../shared/status-info";
import { useState } from "react";
import Popover from "./popover";

const TrailCard = (props) => {
  const [popoverClicked, setPopoverClicked] = useState(false);

  return (
    <Card
      left={
        <div className="flex flex-row items-center pt-2 pb-2 sm:p-0">
          <GradeLogo grade={props.trail.grade} size="20" />
          <h1 className="pl-4 text-lg text-gray-400">{props.trail.name}</h1>
        </div>
      }
      right={
          <StatusInfo
            status={{
              "": props.trail.isOpen,
            }}
          />
      }
      icon={
        props.isReliable ? undefined : (
          <div class="relative h-6">
            <button
              class="z-10 material-icons-round text-gray-500"
              onClick={() => setPopoverClicked(!popoverClicked)}
            >
              edit
            </button>
            <div 
            onClick={() => setPopoverClicked(false)}
            class={`bg-gray-400 opacity-50 fixed left-0 top-0 w-screen h-screen ${popoverClicked ? undefined : "hidden"}`}></div>
            <Popover active={popoverClicked} id={props.trail.trailforksID}/>
          </div>
        )
      }
    />
  );
};

export default TrailCard;

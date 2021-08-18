import { useState } from "react";
import Card from "../../shared/card";
import CardTitle from "../../shared/card-title";
import StatusBadge from "../../shared/status-badge";
import GradeLogo from "./grade-icon";
import Popover from "./popover";
const TrailCard = ({ trail, canEdit }) => {
  const [popoverClicked, setPopoverClicked] = useState(false);

  return (
    <Card
      left={
        <div className="flex flex-row items-center pt-2 pb-2 sm:p-0">
          <div className="pr-3">
            <GradeLogo grade={trail.grade} size="20" />
          </div>
          <CardTitle name={trail.name} />
        </div>
      }
      right={<StatusBadge status={trail.isOpen} />}
      icons={
        <div className="relative h-6 flex flex-row justify-end">
          {trail.trailforksName ? (
            <a
              href={`https://trailforks.com/trails/${trail.trailforksName}`}
              target="_blank"
              rel="noreferrer"
              className="z-10 material-icons-round text-gray-500"
              title="Open trail on Trailforks"
            >
              open_in_new
            </a>
          ) : undefined}
          {canEdit && (
            <>
              <button
                className="z-10 material-icons-round text-gray-500 ml-6"
                title="Edit trail status"
                onClick={() => setPopoverClicked(!popoverClicked)}
              >
                edit
              </button>
              <div
                onClick={() => setPopoverClicked(false)}
                className={`bg-gray-400 opacity-50 fixed left-0 top-0 w-screen h-screen ${
                  popoverClicked ? undefined : "hidden"
                }`}
              ></div>
              <Popover
                active={popoverClicked}
                id={trail.trailforksID}
                onChange={(value) => setPopoverClicked(value)}
              />
            </>
          )}
        </div>
      }
    />
  );
};

export default TrailCard;

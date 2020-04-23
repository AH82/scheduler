import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  const  dayClass = classNames(
    { "day-list__item": props }, 
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": (props.spots === 0) }
  );
  
  const formatSpots = function(spots){
    let message = "";
    if (spots === 0) {
        message = `no spots remaining`;
    } else if (spots === 1) {
      message = `${spots} spot remaining`;
    } 
    else message = `${spots} spots remaining`;
    return message;
  };
 
  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day"> {/* in storybook,returns [class] */}
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
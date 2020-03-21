import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";
/* 
name: String the name of the day
spots: Number the number of spots remaining
selected: Boolean true or false declaring that this day is selected
setDay: Function accepts the name of the day eg. "Monday", "Tuesday"
*/

/* 
The <li> represents the entire day item
The <h2> should display the day name
The <h3> should display the spots remaining for a day
*/


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
    <li className={dayClass} onClick={() => props.setDay(props.name)}>      
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
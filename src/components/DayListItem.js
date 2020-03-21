import React from "react";
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
  return (
    <li onClick={() => props.setDay(props.name)}>      
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
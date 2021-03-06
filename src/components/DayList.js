import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  const { days } = props;

  return (
  <ul>
  {
  days.map((day, index) => {
    return (
      <DayListItem
        key={index}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={(event) => props.setDay(day.name)}  />
        )
      }
    )
  }
  </ul>
  )
      
};
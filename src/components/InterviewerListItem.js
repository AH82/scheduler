import React from 'react';
import './InterviewerListItem.scss';
import classNames from "classnames";

/* 
  props:
    id:number                 - the id of the interviewer
    name:string               - the name of the interviewer
    avatar:url                - a url to an image of the interviewer
    selected:boolean          - to determine if an interview is selected or not
    setInterviewer:function   - sets the interviewer upon selection
*/

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer} = props;

  const interviewerClass = classNames(
    { "interviewers__item" : props},
    { "interviewers__item--selected" : selected},
    { "interviewers__item-image" : avatar}
  );

  return (
    <li key={id} className={interviewerClass} onClick={setInterviewer} >
      <img
        className={interviewerClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
};
 
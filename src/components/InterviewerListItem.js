/* 
InterviewerListItem takes in the following props:

id:number - the id of the interviewer
name:string - the name of the interviewer
avatar:url - a url to an image of the interviewer
selected:boolean - to determine if an interview is selected or not
setInterviewer:function - sets the interviewer upon selection
*/
import React from 'react';
import './InterviewerListItem.scss';
import classNames from "classnames";


export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer} = props;

  const interviewerClass = classNames(
    { "interviewers__item" : props},
    { "interviewers__item--selected" : selected},
    { "interviewers__item-image" : avatar}
  );

  return (
    <li id={id} className={interviewerClass} /* "interviewers__item" */ onClick={() => props.setInterviewer(props.id)} >
      <img
        className={interviewerClass}/* "interviewers__item-image" */
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  )
};
 
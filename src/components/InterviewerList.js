/* 
InterviewerList takes in three props:

interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id
*/
import React from 'react';
import './InterviewerList.scss';
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem.js";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer} = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {
        interviewers.map((interviewer) => {
          return (
            <InterviewerListItem
            key={interviewer.id}
            
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={props.interviewer === interviewer.id}
            setInterviewer={(event) => props.setInterviewer(interviewer.id)}
            />
          )
        }
        )
        }
      </ul>
    </section>
  )
};
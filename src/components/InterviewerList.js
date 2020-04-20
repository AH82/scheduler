/* 
InterviewerList takes in three props:

interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id
*/
import React from 'react';
import './InterviewerList.scss';
// import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem.js";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer} = props;

  InterviewerList.propTypes = {
    interviewer: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {
        interviewers.map((eachInterviewer) => {
          return (
            <InterviewerListItem
            key={eachInterviewer.id}

            name={eachInterviewer.name}
            avatar={eachInterviewer.avatar}
            selected={eachInterviewer.id === interviewer}
            setInterviewer={(event) => setInterviewer(eachInterviewer.id)}
            />
          )
        }
        )
        }
      </ul>
    </section>
  )
};
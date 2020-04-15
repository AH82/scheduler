import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList.js";


export default function Form(props) {
  const { name, setName } = useState();
  const { interviewer, setInterviewer } = useState();
  // -- props :
  // name:String
  // interviewers:Array
  // interviewer:Number
  // onSave:Function
  // onCancel:Function

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    {/* <InterviewerList interviewers={props.interviewers} interviewer={props} setInterviewer={props}/> */}
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger>Cancel</Button>
      <Button confirm>Save</Button>
    </section>
  </section>
</main>
  )
};
import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList.js";


export default function Form(props) {
  const { name, setName } = useState(props.name || "");
  const { interviewer, setInterviewer } = useState(props.interviewer || null);
  // -- props :
  // name:String
  // interviewers:Array
  // interviewer:Number
  // onSave:Function
  // onCancel:Function 

  function reset () {
    setName("");
    setInterviewer(null);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        // name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        // onChange={(event) => setName(event.target.value)}
        onChange={setName}
        
        /*
          This must be a controlled component
        */
      />
    </form>
    {name}
    {/* <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} /> */}
    <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer || interviewer} setInterviewer={props.onSave}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={reset} >Cancel</Button>
      <Button confirm onClick={props.onSave} >Save</Button>
    </section>
  </section>
</main>
  )
};
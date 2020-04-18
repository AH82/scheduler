import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty  from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"; // confirm delete




export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW));
  };

  function deleteIt() {
    const interview = null
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(()=> transition(EMPTY));
    // .then(()=> transition(props.interview === null ? EMPTY : SHOW));
    // this does not work and causes errors. why ?

  };

  return (
    <article className="appointment">

        <Header time={props.time}/>
      
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)}/>}

      {mode === SAVING && 
        (<Status message="Saving..."/>)}

      {mode === DELETING && 
        (<Status message="Deleting..."/>)}
      
      {mode === SHOW && 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={()=> transition(CONFIRM)/* deleteIt */}
          id={props.id}
          interview={props.interview}
        />}
      
      {mode === CONFIRM &&  
        <Confirm 
          message="Delete the appointment?"
          onCancel={()=>back()} 
          onConfirm={deleteIt}
          id={props.id}
          interview={props.interview}
        />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={()=>back()}
          onSave={save}
          id={props.id} 
          // interview={props.interview}
          /* this "id" extra prop is sent down to Form, 
          for bookInterview((props.id, interview) to capture it */
        />)}

      

      {/* old code for reference only  */}

      {/* {props.interview ? 
      <Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer.name} 
      /> 
      : <Empty  onAdd={props.onAdd />} */}
    </article>
  )
}
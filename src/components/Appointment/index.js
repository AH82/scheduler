import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty  from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

/* * * * * MODES * * * * */
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"; // confirm delete
const EDIT = "EDIT";
const ERROR_SAVE  = "ERROR_SAVE ";
const ERROR_DELETE = "ERROR_DELETE";
/* * * * * * * * * * * * */


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
    .then(() => transition(SHOW))
    .catch((err) => transition(ERROR_SAVE, true));
  };
  
  function deleteIt() { // Note: LHL's Compass calls it destroy()
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((err) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">

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
          onDelete={()=> transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
        />)}

      {mode === EDIT && (
        <Form
          name= {props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={()=>back()}
          onSave={save}
          id={props.id} 
        />)}

        {mode === ERROR_SAVE &&
          <Error 
            message="Something went wrong.. Could not save appointment"
            onClose={()=>back()}
          />}

        {mode === ERROR_DELETE &&
          <Error 
            message="Something went wrong.. Could not delete appointment"
            onClose={()=>back()}
          />}
    </article>
  )
}
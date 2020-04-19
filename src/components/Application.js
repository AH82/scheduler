import React, { useState, useEffect } from "react";
import useApplicationData from 'hooks/useApplicationData';


import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors';

/* const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  },
]; 
*/


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


/*  
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  useEffect( ()=> {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ]).then((all) => {
      console.log('all ===> ', all);
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
    // axios.get(`/api/days`).then( (response) => { setDays(response.data) })  
  },[])
  
  console.log('state.interviewers ===> ', state.interviewers)
   
  
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({ ...state, appointments});
    console.log('[bookInterview] interview is ===> ', appointment)
    
    return axios.put(`/api/appointments/${id}`, appointment )
    .then((response)=>{
      console.log('[bookInterview] axios put response = ', response);
      setState({ ...state, appointments});
    })
    // .catch((err) => {
      //   console.log(`\t-> Error: ${err}!`);
      // });
    };
    
    function cancelInterview(id){
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      console.log("[cancelInterview] appointment = ", appointment)
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      console.log("[cancelInterview] appointments = ", appointments)
      
      return axios.delete(`/api/appointments/${id}`, appointment.interview)
      .then((response)=>{
        console.log('[cancelInterview] axios put response = ', response);
        setState({ ...state, appointments});
      })
      // .catch((err) => {
        //   console.log(`\t-> Error: ${err}!`);
        // });
      }

*/

      const appointments = getAppointmentsForDay(state, state.day);
      const interviewers = getInterviewersForDay(state, state.day);
      
      return (
        <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay/* day => console.log(day) */}
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {
          appointments.map(appointment => {
            const interview = getInterview(state, appointment.interview);
            console.log("interview @ map = ", interview)
            return (
              <Appointment 
              key={appointment.id} 
              {...appointment}
               interview={interview}
               interviewers={interviewers}
               bookInterview={bookInterview}
               cancelInterview={cancelInterview}

              />

            ) 
          })

        }
        {<Appointment key="last" time="5pm"  bookInterview={bookInterview}/>}
      </section>
    </main>
  );
}

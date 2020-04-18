import React, { useState, useEffect } from "react";

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
  
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

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
    setState({ ...state, appointments });
  };
  
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
    /* axios.get(`/api/days`).then( (response) => { setDays(response.data) })  */
  },[])

  console.log('state.interviewers ===> ', state.interviewers)


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
            return (
              <Appointment 
              key={appointment.id} 
              {...appointment}
               interview={interview}
               interviewers={interviewers}
               bookInterview={bookInterview}

              />

            ) 
          })

        }
        {<Appointment key="last" time="5pm"  bookInterview={bookInterview}/>}
      </section>
    </main>
  );
}

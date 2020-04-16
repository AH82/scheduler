import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay } from '../helpers/selectors';

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
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  const appointments = getAppointmentsForDay(state, state.day);

  useEffect( ()=> {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`))
    ]).then((all) => {
      console.log('all ===> ', all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
      });
    /* axios.get(`/api/days`).then( (response) => { setDays(response.data) })  */
  },[])

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
            return (
              <Appointment 
              key={appointment.id} 
              {...appointment} 

              />

            ) 
          })

        }
        {<Appointment key="last" time="5pm" />}
      </section>
    </main>
  );
}

import React, { useState, useEffect } from "react";
import axios from 'axios';



export default function useApplicationData (initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
  
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  )
}
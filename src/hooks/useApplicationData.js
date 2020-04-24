import { useState, useEffect } from "react";
import axios from 'axios';



export default function useApplicationData (initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  useEffect( ()=> {
    
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`)),
      Promise.resolve(axios.get(`/api/interviewers`))
    ]).then((all) => {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data 
          }));
      });
  },[]);

 
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  // Helper function for bookInterview() & cancelInterview()
  function remainingSpots(appointments) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        const spots = day.appointments
          .map((appointmentId) => appointments[appointmentId].interview)
          .filter((interview) => interview === null);
        day.spots = spots.length;
        return day;
      }
      return day;
    });
    return days;
  };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment )
    .then((response)=>{
      const days = remainingSpots(appointments);
      setState({ ...state, appointments, days });
    });
  };
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`, appointment.interview)
    .then((response)=>{
      const days = remainingSpots(appointments);
      setState({ ...state, appointments, days});
    })
  };
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview,
    }
    );
  }
  
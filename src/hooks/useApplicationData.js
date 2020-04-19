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
  
  // -> re-gets days to re-render to update spots
  function remainingSpots() {
    axios.get(`/api/days`)
    .then( (res) => {
      setState(prev => ({...prev, days: res.data}));
    });
  };

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

    return axios.put(`/api/appointments/${id}`, appointment )
    .then((response)=>{
      console.log('[bookInterview] axios put response = ', response);
      setState({ ...state, appointments});
      remainingSpots();

      })
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
        console.log('[cancelInterview] axios put response = ', response);
        setState({ ...state, appointments});
        remainingSpots();
        })
    };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  );
}
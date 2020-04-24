import { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList";



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
    // console.log(id, interview);
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
      // console.log('[bookInterview] axios put response = ', response);
      // const days = remainingSpots(id);
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
      // console.log('[cancelInterview] axios delete response = ', response);
      // const days = remainingSpots(id);
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
  
  /* END OF CODE */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*  
THE FOLLOWING CODE IS KEPT FOR LEARNING PURPOSES, 
IT SHOULD HAVE BEEN DELETED 
AT THE END OF THE DAY,
THIS IS A LEARNING PROJECT, 
I HAVE KEPT THE CODE OF FAILED TRIALS 
OF ONE OF THE WORST BUGS I EXPERIENCED
*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// TRY #1 // WORKING ON BACK-END, HENCE FAILING TESTS. 
// -> re-gets days to re-render to update spots
// function remainingSpots() {
  //   axios.get(`/api/days`)
  //   .then( (res) => {
    //     setState(prev => ({...prev, days: res.data}));
    //   });
    // };
    
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    // try #3 // this one "fixed" BUT NOT WORKING ON CancelInterview
    /*  
    function remainingSpots(id) { //This must me the appointment ID
      // console.log("[remaining spots] id = ", id)
      console.log("[remaining spots] state is = ", JSON.stringify(state, null, 2) )
      let remainingSpots = 0;
      let targetDay = null;
      state.days.forEach((day, index) => {
        day.appointments.forEach( (appointmentId, index, array) => {
          // console.log("[remainingSpots]", array)
          if(id === appointmentId) {
            array.forEach( (appointmentIdAgain, index) => {
              if(!state.appointments[appointmentIdAgain].interview) {
                remainingSpots++;
                targetDay = day.id
                
              }

            } )
          }
        })
    })
    console.log("PPP",remainingSpots)
    const days = [...state.days]
    days[targetDay-1] = {...days[targetDay-1], spots: remainingSpots-1}
    // setState(prev => ({...prev, days}))
    return days;
  };
 */

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  // Try #4
/*
  function remainingSpots(id, action) { //This must me the appointment ID
    // console.log("[remaining spots] id = ", id)
    // console.log("[remaining spots] state is = ", JSON.stringify(state, null, 2) )
    let remainingSpots = 1;
    let targetDay = null;
    state.days.forEach((day, index) => {
        day.appointments.forEach( (appointmentId, index, array) => {
          // console.log("[remainingSpots]", array)
          if(id === appointmentId) {
            targetDay = day.id;
            console.log("DAYDAY", targetDay, day.id)
            if (action === "book") {
              remainingSpots--;
            } else if (action === "cancel") {
              remainingSpots++
             }
          }
        })
    })
    console.log("PPP",remainingSpots)
    const days = [...state.days]
    days[targetDay-1] = {...days[targetDay-1], spots: remainingSpots}
    setState(prev => ({...prev, days}))
  };
*/
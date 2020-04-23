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
  // function remainingSpots() {
  //   axios.get(`/api/days`)
  //   .then( (res) => {
  //     setState(prev => ({...prev, days: res.data}));
  //   });
  // };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 // try #3
 
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
    days[targetDay-1] = {...days[targetDay-1], spots: remainingSpots}
    setState(prev => ({...prev, days}))
  };


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
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// try #2
    // const day = {
      
    // }
    // axios.get(`/api/days`)
    // .then( (res) => {
    //   console.log("remainingSpots function : ", res.data[id].appointments)
    //   const spots = res.data[id].appointments.length
    //   setState(prev => ({...prev, days.spots }));
    // });

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
    console.log("bookInterview ===> ", JSON.stringify(appointments,null,2))

    return axios.put(`/api/appointments/${id}`, appointment )
    .then((response)=>{
      console.log('[bookInterview] axios put response = ', response);
      // ???? setState does not work !?!
      setState({ ...state, appointments })
      // .then(()=> console.log("KKK", state))
      // setTimeout( () => {
        //   console.log("YYY", state);
        // }, 5000)
        // setState(prev => ({ ...prev, appointments}));
        remainingSpots(id, "book");
        // console.log("[bookinterview] state is = ", JSON.stringify(state, null, 2) )
      })
      // .then(()=> {console.log(">>>>", state)})
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
        console.log('[cancelInterview] axios delete response = ', response);
        setState({ ...state, appointments});
        // remainingSpots(id);
        })
    };

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview,
      // remainingSpots
    }
  );
}
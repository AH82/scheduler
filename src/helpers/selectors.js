export function getAppointmentsForDay(state, day) {
  
  if (!state.days[0]) {return [] };
  
  const [selectedDay] =  state.days.filter(
    singleDay => singleDay.name === day
    );
    
  if (!selectedDay) {return []};

  const selectedAppointments = selectedDay.appointments.map( 
    singleAppointment => state.appointments[singleAppointment] 
    );

  return selectedAppointments;
}


/* 
function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

2 keys: days / 
*/

export function getInterview(state, interview) {
  console.log('interview -> ', interview)
  if (!interview) { return null };
  return (
    {
      ...interview, 
      interviewer: state.interviewers[interview.interviewer]
    }
      );
};
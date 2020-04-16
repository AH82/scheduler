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
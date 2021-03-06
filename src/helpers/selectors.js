export function getAppointmentsForDay(state, day) {
  
  if (!state.days[0]) { return [] };
  
  const [selectedDay] =  state.days.filter(
    singleDay => singleDay.name === day
    );
    
  if (!selectedDay) { return [] };

  const selectedAppointments = selectedDay.appointments.map( 
    singleAppointment => state.appointments[singleAppointment] 
    );

  return selectedAppointments;
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export function getInterviewersForDay(state, day) {
  
  if (!state.days[0]) { return [] };
  
  const [selectedDay] =  state.days.filter(
    singleDay => singleDay.name === day
    );
    
  if (!selectedDay) { return [] };

  const selectedInterviewers = selectedDay.interviewers.map( 
    singleInterviewer => state.interviewers[singleInterviewer] 
    );

  return selectedInterviewers;
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export function getInterview(state, interview) {
  
  if (!interview) { return null };
  
  return (
    {
      ...interview, 
      interviewer: state.interviewers[interview.interviewer]
    }
  );
};
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

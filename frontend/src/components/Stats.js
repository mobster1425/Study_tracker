import React from "react";
import { useSelector } from "react-redux";

//import moment from 'moment';


export const customDateFormat = (dateString) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // If the date is in ISO format
    const [year, month, day] = dateString.substr(0, 10).split("-");
    return `${month}/${day}/${year}`;
  } else {
    // If the date is in MM-DD-YYYY format
    return date.toLocaleDateString();
  }
};



export const getTotalStudyDuration = (startTime, endTime) => {
  const startTimeDate = new Date("01/01/1970 " + startTime);
  const endTimeDate = new Date("01/02/1970 " + endTime);
  return Math.abs(startTimeDate - endTimeDate) / 36e5;
};

/*
export const getTotalStudyDuration = (startTime, endTime) => {
  const startTimeDate = new Date(`01/01/1970 ${startTime}`);
  const endTimeDate = new Date(`01/01/1970 ${endTime}`);
  console.log(startTimeDate, endTimeDate);
  const duration = Math.abs(endTimeDate - startTimeDate);
  const hours = Math.floor(duration / 1000 / 60 / 60);
  const minutes = Math.floor((duration / 1000 / 60) % 60);
  return `${hours} hours ${minutes} minutes`;
};
*/
const StudyStats = () => {
  const {studyData,isLoading}=useSelector((state)=> state.study);
  console.log(`study data in frontend is = ${JSON.stringify(studyData)}`);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!studyData || studyData.length <= 0) {
    return <p>No data currently.</p>;
  }

  return (
    <div className="stats-container">
      <table className="stats-table">
        <thead className="stats-table_header">
          <tr>
            <th></th>
            <th>Time of Study</th>
            <th>Study End time</th>
            <th>Total Study Duration</th>
          </tr>
        </thead>
        <tbody className="stats-table_body">
        {studyData.map((study) => {
            return (
              <tr key={study._id}>
                <td>{customDateFormat(study.date)}</td>
                <td>{study.startTime}</td>
                <td>{study.endTime}</td>
                <td>
                  {getTotalStudyDuration(study.startTime, study.endTime)}{" "}
                  hours
                </td>
              </tr>
            );
          })}
    
        </tbody>
      </table>
    </div>
  );
};

export default StudyStats;



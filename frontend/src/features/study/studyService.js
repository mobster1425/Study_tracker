

// /api/v1/study/

import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/study";

// Create sleep entry
const createStudyEntry = async (studyData,token) => {
 /*
  const config={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
       // include the token in the 'Authorization' header
       'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
     
      withCredentials: true
    
  }

 

  */
  const config={
    headers:{
      Authorization:`Bearer ${token}`,
    },
  };
   
 
  const response = await axios.post(API_URL ,studyData,config);

  return response.data;
};

// Fetch sleep entries
const getStudyEntries = async (token, daysBack) => {
  /*
  const config={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // include the token in the 'Authorization' header
    },
    credentials: 'include',
  }


*/
const config={
  headers:{
    Authorization:`Bearer ${token}`,
  },
};

  const response = await axios.get(API_URL + `/?daysBack=${daysBack}`,config);
  return response.data;
};

const sleepService = {
  createStudyEntry,
  getStudyEntries,
};

export default sleepService;


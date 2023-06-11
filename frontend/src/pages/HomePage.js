import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../components/Chart";
import StudyModal from "../components/studyModal";
import StudyStats from "../components/Stats";
import ToggleSwitch from "../components/ToggleSwitch";
import { getStudyEntries, toggleModal } from "../features/study/studySlice";
//import { useState } from "react";
const HomePage = () => {
    
  const dispatch = useDispatch();

  const { isAddModalOpen, studyData, isLoading, daysBack } = useSelector(
    (state) => state.study
  );

  useEffect(() => {
    dispatch(getStudyEntries());
  }, [dispatch, daysBack]);

//const[isAddModalOpen,set]=useState(true);
/*
const setmodalopen=()=>{
set(false);
}
*/

  return (
    <>
      {isAddModalOpen && <StudyModal />}
      <div className="container">
        <div className="flex space">
          <div className="flex a-center">
            <h2>Study duration</h2>
            <ToggleSwitch />
          </div>

          <button className="btn" onClick={()=> dispatch(toggleModal())}>
            New Entry
          </button>
        </div>
        <div className="sleep-duration">
           
        <Chart studyData={studyData} isLoading={isLoading}/>
            
        </div>

        <div className="sleep-stats mt-2">
          <h2 className="mb-2">Sleep stats</h2>
          <StudyStats  />
        </div>
      </div>
    </>
  );
};

export default HomePage;
//dispatch(toggleModal()) for dispatching toggle modal when clicked
//<StudyStats sleepData={sleepData} isLoading={isLoading} />
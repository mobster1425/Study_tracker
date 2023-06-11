import React from "react";
//import { useState } from "react";
import { setDaysBack } from "../features/study/studySlice";
import { useDispatch, useSelector } from "react-redux";

const ToggleSwitch = () => {
  const dispatch = useDispatch();

  const { daysBack } = useSelector((state) => state.study);
//const [daysBack,setdays]=useState(7);
 //let daysBack=7;
  const onClick = (days) => {
    dispatch(setDaysBack(days));
   // setdays(days);
  };

  return (
    <div className="toggle flex">
      <div onClick={() => onClick(7)} className={`toggle-item ${daysBack === 7 && "active"}`}>7 days</div>
      <div
        onClick={() => onClick(30)}
        className={`toggle-item ${daysBack === 30 && "active"}`}
      >
        1 month
      </div>
    </div>
  );
};

export default ToggleSwitch;
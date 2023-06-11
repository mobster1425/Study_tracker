import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, toggleModal } from "../features/study/studySlice";
import { createStudyEntry,getStudyEntries} from "../features/study/studySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudyModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isSuccess, message } = useSelector(
    (state) => state.study
  );

//const isError=true;
//const isSuccess=true;
// message="there is an error";
  useEffect(() => {
 
    if (isError) {
      toast.error(message);
      dispatch(reset())
    }

    
    if (isSuccess) {
      navigate("/");
     // dispatch(getStudyEntries())
    }
  },[dispatch, isError, isSuccess, navigate, message]);
 
/*
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    startTime: "20:00",
    endTime: "09:00",
  });
*/const [formData, setFormData] = useState({
 // date: new Date().toLocaleDateString('en-GB')
  date: new Date().toISOString().slice(0,10),
  startTime: "20:00",
  endTime: "09:00",
});


 
  /*
  const getTotalStudyDuration = () => {
    const startTimeDate = new Date("01/01/1970 " + formData.startTime);
    const endTimeDate = new Date("01/02/1970 " + formData.endTime);
    return Math.abs(endTimeDate - startTimeDate) / 36e5;
  };
*/
 // eslint-disable-next-line react-hooks/exhaustive-deps
const getTotalStudyDuration = () => {
  const startTimeDate = new Date("01/01/1970 " + formData.startTime);
  const endTimeDate = new Date("01/01/1970 " + formData.endTime);
  
  return Math.abs(endTimeDate - startTimeDate) / 36e5;
};

  const [totalStudyDuration, setTotalStudyDuration] = useState(
    getTotalStudyDuration()
  );

  const onChange = (e) => {
    setFormData((oldData) => {
      return {
        ...oldData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
   dispatch(createStudyEntry(formData));
   dispatch(getStudyEntries());

  };

  useEffect(() => {
    setTotalStudyDuration(getTotalStudyDuration());
  }, [formData.startTime, formData.endTime, getTotalStudyDuration]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>New entry</h1>

        <form id="add-sleep" onSubmit={onSubmit}>
          <div className="form-control mt-2">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="sleep-time">Start time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="date">End time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={onChange}
              required
            />
          </div>
          <h3>Total slept hours: {totalStudyDuration}</h3>

          <div className="mt-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch(toggleModal())}
            
            >
              Close
            </button>
            <button className="btn" type="submit">
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudyModal;

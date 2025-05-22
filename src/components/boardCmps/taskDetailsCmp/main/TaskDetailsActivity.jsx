import React, { useEffect, useRef, useState } from 'react';
import { SvgServices } from '../../../../services/svgServices';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskActivities, liveUpdateTask } from '../../../../redux/taskDetailsSlice';
const TaskDetailsActivity = () => {
  const [value, setValue] = useState();
  const quillRef = useRef();

  const dispatch = useDispatch();
  const { selectedTask, activities, loading, error } = useSelector((s) => s.taskDetailsReducer);

  useEffect(() => {
    dispatch(liveUpdateTask({ method: 'fetch', workId: 'activities' }));
    console.log(activities, 'activityactivityactivity')
  }, []);

  // … render activity …

  return (
    <section className="td-section-description-main">
      <div className="td-section-attachment-container">
        <div className="SvgLefSvg">
          {' '}
          <SvgServices name="ActivitySvg" />
        </div>
        <div className="td-section-attachment-containerDiv">
          <div className="td-section-header-attackment">Activity</div>

          <button className="ActivityButton">Show details</button>
        </div>
      </div>
      <div className="containerActivity">
        <div className="containerActivityCommand">
          <div className="containerMembers">
            <button className="containerActivityADDCommand">Write a comment...</button>
          </div>
          <div className="containerActivityADD"></div>
        </div>
        {activities.map((evt) => (
          <div key={evt._id} className="containerActivityEntry">
            <div className="containerActivityDetails">
              <strong>Entity-ID:</strong> {evt.entity.id}
              <div className="containerActivityAction">{evt.action.replace(/_/g, ' ')}</div>
              {Object.entries(evt.payload).map(([k, v]) =>
                k === 'imageUrl' ? (
                  <img key={k} src={v} className="containerActivityImage" />
                ) : (
                  <div key={k}>
                    <strong>{k}:</strong> {String(v)}
                  </div>
                )
              )}
              <div className="containerActivityTime">
                {new Date(evt.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TaskDetailsActivity;

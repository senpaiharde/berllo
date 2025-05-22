import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/taskDetailsSlice';
import { TaskOps } from '../../../../services/backendHandler';
import { formatDistanceToNow, isToday, format } from 'date-fns';
import { SvgServices } from '../../../../services/svgServices';

const TaskDetailsActivity = () => {
  const dispatch = useDispatch();
  const { selectedTask, activities, loading, error } = useSelector((s) => s.taskDetailsReducer);

  // remember last fetched task so we don’t loop
  const lastTaskId = useRef(null);

  // fetch only once when a new task is opened
  useEffect(() => {
    const id = selectedTask?._id;
    if (!id || lastTaskId.current === id) return;
    lastTaskId.current = id;
    dispatch(liveUpdateTask({ method: TaskOps.FETCH, workId: 'activities' }));
  }, [selectedTask?._id, dispatch]);

  if (!selectedTask) return null;

  // turn raw evt into a human sentence
  const renderActivityMessage = (evt) => {
    const user = evt.userName || (String(evt.user) === '000000000000000000000000' && 'Dima blat');
    switch (evt.action) {
      case 'updated_task':
        if ('isDueComplete' in evt.payload) {
          return evt.payload.isDueComplete
            ? `${user} marked this card as complete`
            : `${user} marked this card as incomplete`;
        }
        if (evt.payload.taskDueDate) {
          const d = new Date(evt.payload.taskDueDate);
          return `${user} set this card to be due ${format(d, 'd MMM')} at ${format(d, 'HH:mm')}`;
        }
        if (evt.payload.labels) {
          const names = evt.payload.labels.map((l) => l.name || l.title);
          return `${user} updated labels: ${names.join(', ')}`;
        }
        if (evt.payload.checklist) {
          return `${user} added a checklist to this card`;
        }
        if (evt.payload.imageUrl) {
          return `${user} added an attachment`;
        }
        if (evt.payload.description) {
          return `${user} added an description Text`;
        }

        return `${user} updated this card`;

      case 'added_comment':
        return `${user} commented: "${evt.payload.comment}"`;

      case 'added_attachment':
        return `${user} added the ${evt.payload.url} attachment to this card`;

      case 'deleted_attachment':
        return `${user} deleted the ${evt.payload.url} attachment from this card`;

      case 'joined_task':
        return `${user} joined this card`;

      default:
        return `${user} ${evt.action.replace(/_/g, ' ')}`;
    }
  };

  return (
    <section className="td-section-description-main">
      <div className="td-section-attachment-container">
        <div className="SvgLefSvg">
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
          <div className="containerActivityADD" />
        </div>

        {loading && <div>Loading activity…</div>}
        {error && <div className="error">Error: {error}</div>}

        {activities.map((evt) => (
          <div key={evt._id} className="containerActivityEntry">
            <div className="containerActivityDetails">
              <div className="containerActivityAction">{renderActivityMessage(evt)}</div>

              {Object.entries(evt.payload || {}).map(([k, v]) => {
                if (Array.isArray(v)) {
                  const names = v.map((x) => x.name || x.title || JSON.stringify(x));
                  return (
                    <div key={k} className="containerActivityProp">
                      <strong>{k}:</strong> {names.join(', ')}
                    </div>
                  );
                }
                return (
                  <div key={k} className="containerActivityProp">
                    <strong>{k}:</strong> {String(v)}
                  </div>
                );
              })}

              <div className="containerActivityTime">
                {isToday(new Date(evt.createdAt))
                  ? `${formatDistanceToNow(new Date(evt.createdAt))} ago`
                  : format(new Date(evt.createdAt), 'dd MMM yyyy, HH:mm')}
              </div>
            </div>
          </div>
        ))}

        {!loading && activities.length === 0 && <div className="noActivity">No activity yet.</div>}
      </div>
    </section>
  );
};

export default TaskDetailsActivity;

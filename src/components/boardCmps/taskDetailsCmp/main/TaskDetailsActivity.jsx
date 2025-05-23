import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/taskDetailsSlice';
import { TaskOps } from '../../../../services/backendHandler';
import { formatDistanceToNow, isToday, format } from 'date-fns';
import { SvgServices } from '../../../../services/svgServices';

const TaskDetailsActivity = () => {
  const dispatch = useDispatch();
  const { selectedTask, activities, loading, error } = useSelector((s) => s.taskDetailsReducer);

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
            ? ` marked this card as complete`
            : ` marked this card as incomplete`;
        }
        if (evt.payload.taskDueDate) {
          const d = new Date(evt.payload.taskDueDate);
          return ` set this card to be due ${format(d, 'd MMM')} at ${format(d, 'HH:mm')}`;
        }
        if (evt.payload.labels) {
          return ` updated labels`;
        }
        if (evt.payload.checklist) {
          return ` added a checklist to this card`;
        }
        if (evt.payload.attachments) {
          return ` added an attachment`;
        }
        if (evt.payload.description) {
          return ` updated description`;
        }
        return ` updated this card`;

      case 'added_comment':
        return ` commented`;

      case 'added_attachment':
        return ` added an attachment`;

      case 'deleted_attachment':
        return ` removed an attachment`;

      case 'joined_task':
        return ` joined this card`;

      default:
        return ` ${evt.action.replace(/_/g, ' ')}`;
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
          
        </div>

        {loading && <div>Loading activity…</div>}
        {error && <div className="error">Error: {error}</div>}

        {activities.map((evt) => {
            const atts = evt.payload.attachments;
            const last = Array.isArray(atts) && atts.length
             ? atts[atts.length - 1]
              : null;
            return(
            
          <div key={evt.id} className="containerActivityEntry">
            <div className="containerActivityDetails">
              <div className="containerActivityAction">
                <span className='containerActivityActionName'> {evt.userName}
                </span>{renderActivityMessage(evt)}</div>
             
              {/* Show full image if attachment */}
              {last && (<> <a
                  className="containerActivityImage"
                  href={last.url}
                  alt="Attachment"
                  download={last.name}
                    title={last.name}
                
                > <div
                      className="attachment-thumbnail"
                      style={{ backgroundImage: `url(${last.url})` }}
                    /></a>
               
                </>
               
              )}
              <button onClick={() => {console.log(evt.payload.attachments[0].name)}}>23</button>
              {/* Show new description text */}
              {evt.payload.description && (
                <div className="containerActivityProp"></div>
              )}

              {/* Show only notice for labels update */}
              {evt.payload.labels && <div className="containerActivityProp">Labels updated</div>}

              <a className="containerActivityTime">
                {isToday(new Date(evt.createdAt))
                  ? `${formatDistanceToNow(new Date(evt.createdAt))} ago`
                  : format(new Date(evt.createdAt), 'dd MMM yyyy, HH:mm')}
              </a>
            </div>
          </div>
        )})}

        {!loading && activities.length === 0 && <div className="noActivity">No activity yet.</div>}
      </div>
    </section>
  );
};

export default TaskDetailsActivity;

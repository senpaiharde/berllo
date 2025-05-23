
import api from '../api/api';




const backendHandler = async ({ args }) => {
  const { taskId, body } = args || {};
  // console.log('backendHandler',args);
  // console.log('backendHandler body',body);
  // console.log('backendHandler', body.method, body.workId, taskId);
  // console.log(`/${body.workId}/${body.method}`);
  let data;
  if (body.method === 'update') {
  
    const res = await api.put(`/${body.workId}/${taskId}`, body);
    
    return res.data;
  }
  switch (body.method) {
    case 'fetch': {
      if (!taskId) {
      ({ data } = await api.get(`/${body.workId}/`));
      }else{
        ({ data } = await api.get(`/${body.workId}/${taskId}`));
      }
      
      break;
    }
    case 'add': {
      console.log(`backendHandler post body : ${body}`);
      ({ data } = await api.post(`/${body.workId}/`, body));
      break;
    }
    case 'update': {
      ({ data } = await api.put(`/${body.workId}/${taskId}`, body));
      console.log('→ UPDATE case hit!', body.workId, taskId, body);
      break;
    }
    case 'delete': {
      await api.delete(`/${body.workId}/${taskId}`);
      data = { _id: taskId };
      break;
    }

    default:
      throw new Error('Unknown method');
  }
  // console.log(data, 'data');
  return data;
};

export default backendHandler;

export const TaskOps = Object.freeze({
  FETCH: 'fetch',
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
});

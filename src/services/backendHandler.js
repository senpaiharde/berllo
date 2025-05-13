import api from '../api/api';

const backendHandler = async ({ method, args, workId }) => {
  const { taskId, body } = args || {};
  let data;
  switch (method) {
    case 'fetch': {
     
      ({ data } = await api.get(`/${workId}/${taskId}`));
      break;
    }
    case 'add': {
    
      ({ data } = await api.post(`/${workId}/${taskId}`, body));
      break;
    }
    case 'update': {
     
      ({ data } = await api.put(`/${workId}/${taskId}`, body));
      break;
    }
    case 'delete': {
      
      await api.delete(`/${workId}/${taskId}`);
      data = { _id: taskId };
      break;
    }

    default:
      throw new Error('Unknown method');
  }
  return data
};

export default backendHandler;



export const TaskOps = Object.freeze({
  FETCH: 'fetch',
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
});
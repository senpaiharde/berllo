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
      } else {
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
      console.log(`delete ${body.workId}/${taskId} body:`, body);
      await api.delete(`/${body.workId}/${taskId}`, body);
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

const envApiUrl = import.meta.env.VITE_API_URL;
const API_BASE = envApiUrl ? envApiUrl : 'http://localhost:4000';
export async function toggleStar(boardId, isStarred) {
  const token = localStorage.getItem('token');
  console.log('toggleStar', boardId, isStarred);
  console.log('token', token);
  const res = await fetch(`${API_BASE}/user/me`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      starredBoards: {
        board: boardId,
        isStarred: isStarred,
      },
    }),
  });
  if (!res.ok) throw new Error('Star update failed');
  const { starredBoards } = await res.json();
  return starredBoards;
}

const { data } = await api.post(`/boards/template/${templateId}`, { title });
// data.board, data.lists, data.tasks are your newly‐created entities
navigate(`/board/${data.board._id}`);


export async function CreateBoard(templateId, title) {
  const token = localStorage.getItem('token');
  console.log('Create board title', templateId, title);
  console.log('token', token);
  const res = await fetch(`${API_BASE}/user/${templateId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  if (!res.ok) throw new Error('failed to create board');
  const { data } = await res.json();
  return data;
}

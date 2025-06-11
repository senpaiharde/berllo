import api from '../api/api';

const backendHandler = async ({ args }) => {
  const { taskId, body } = args || {};

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
const token = localStorage.getItem('token');
const envApiUrl = import.meta.env.VITE_API_URL;
const API_BASE = envApiUrl ? envApiUrl : 'http://localhost:4000';
export async function toggleStar(boardId, isStarred) {

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



export async function CreateBoard(templateId, title) {

  console.log('Create board title', templateId, title);
  console.log('token', token);
  const res = await fetch(`${API_BASE}/boards/template/${templateId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  if (!res.ok) throw new Error('failed to create board');
  const { board } = await res.json();
  return board;
}

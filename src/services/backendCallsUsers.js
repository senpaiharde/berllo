import axios from 'axios';
import { Await } from 'react-router-dom';

export const demoUsersStorage = [
  { name: 'ALi Demo', email: 'alice@demo.local' },
  { name: 'Slava Demo', email: 'bob@demo.local' },
  { name: 'Mark Demo', email: 'carol@demo.local' },
  { name: 'Sam Demo', email: 'dave@demo.local' },
  { name: 'Dima Demo', email: 'eve@demo.local' },
];

export const accountSwitch = async(email) => {
    try {
          const res = await axios.post(
            'http://localhost:4000/auth/login', 
            { email, password: 'demo123' }
          );
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('demoEmail', email);
          window.location.reload();
        } catch (err) {
          console.error('Demo login failed', err);
          alert('Demo login failed');
        }
}

const token = localStorage.getItem('token')


 async function fetchCurrentUser() {
  try {
    
    if (!token) throw new Error('No auth token found');

    const res = await fetch('http://localhost:4000/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/json'
      }
    });

    if (!res.ok) {
      // e.g. 401, 500, etc.
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    const userData = await res.json();
    return userData;
  } catch (err) {
    console.error('fetchCurrentUser failed:', err);
    throw err;
  }
}

export default fetchCurrentUser;
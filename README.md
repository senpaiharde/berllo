
# Brello – Frontend
This repo is the frontend part of a full stack app, which is one page React app calling REST API implemented by Node in backend, connected to Mongo DB for data storage.

Brello is a Trello-inspired project management tool built with React. It supports real-time collaboration, task reordering, and AI-generated boards.

**Live Demo:** [https://berllo.onrender.com](https://berllo.onrender.com/b/682b120c80be8be01782eadb/Work%20Flow/)
![Getting Started](src/assets/images/berllo-WorkFlow-img.png)  


**Backend Repo:** [Brello Backend](https://github.com/senpaiharde/berllo-backend)
---

## 🚀 Features

- Create boards, lists, and tasks
- Drag and drop to reorder lists and tasks
- Real-time collaboration with multiple users
- AI-assisted board generation
- JWT-based user authentication
- Fully responsive design
- Rich text editing with TipTap
- Real-time notifications and updates
- Advanced date management with date-fns

---
## 🛠 Tech Stack

### Frontend Core
- **React 18.2.0** with modern Hooks architecture
- **Vite** for blazing-fast development and build optimization
- **SASS** for maintainable and modular styling
### Real-time Features
- **Socket.IO Client** implementation
  - WebSocket transport for efficient real-time updates
  - Automatic reconnection handling
  - Environment-based configuration

### UI Components
- **@hello-pangea/dnd** for drag-and-drop functionality
- **@tiptap** ecosystem for rich text editing
  - Custom extensions for images, links, and mentions
- **Lucide React** for consistent iconography

### Development Tools
- **Prettier** for consistent code formatting

## 🏗 Architecture

### Component Structure
- Modular component architecture
- Feature-based directory organization
- Separation of concerns between UI and business logic
### State Management
- **Redux Toolkit** for centralized state management
  - `createSlice` for reducing boilerplate
  - `createAsyncThunk` for handling async operations
  - Organized store structure with separate slices for tasks, boards, and workspaces
### State Management Pattern
- Redux slices for different domains:
  - `workSpaceReducer`
  - `taskListReducer`
  - `taskReducer`
  - `boardReducer`
  - `taskDetailsReducer`

### Routing
- React Router v7 with nested routes
- Dynamic route parameters for boards and tasks
- Protected routes with authentication

### API Communication
- Axios for HTTP requests
- Socket.IO for real-time updates
- JWT-based authentication
- Environment-based API configuration

## 👥 Collaborators

- [Eli Pletinsky](https://github.com/elipletinsky)
- [Senpai Harde](https://github.com/senpaiharde)

---

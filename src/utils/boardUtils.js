export const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 8);
  };
  
  export const slugify = (text) => {
    if (!text) return "board";
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };
  
  export const createBoard = (title) => {
    const id = generateRandomId();
    const slug = slugify(title);
  
    const newBoard = {
      _id: id,
      boardTitle: title,
      slug,
      boardUsers: [],
      boardLists: []
    };
  
    const data = JSON.parse(localStorage.getItem('trelloData')) || { boards: [] };
    data.boards.push(newBoard);
    localStorage.setItem('trelloData', JSON.stringify(data));
  
    return `/b/${id}/${slug}`;
  };
  
  export const getBoardById = (id) => {
    const data = JSON.parse(localStorage.getItem('trelloData')) || { boards: [] };
    return data.boards.find(x => x._id === id);
  };
  
  export const getLocalData = async () => {
    const stored = JSON.parse(localStorage.getItem('trelloData'));
    return stored ? stored : { boards: [] };
  };
  
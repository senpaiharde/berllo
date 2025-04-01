export const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 8);
  };
  
  export const slugify = (text) => {
    if (!text) return "board";
    return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  };
  
  export const createBoard = async (title) => {
    const id = generateRandomId();
    const slug = slugify(title);
  
    const newBoard = {
      _id: id,
      boardTitle: title,
      slug,
      boardUsers: [],
      boardLists: []
    };
  
    try {
      const data = await getLocalData(); 
      data.boards = data.boards || []; 
      data.boards.push(newBoard);
      localStorage.setItem('trelloData', JSON.stringify(data)); 
  
      return `/b/${id}/${slug}`;
    } catch (error) {
      console.error("createBoard error:", error);
      return null;
    }
  };
  
  export const getBoardById = async (id) => {
    try {
      const data = await getLocalData(); 
      return data?.boards?.find(x => x._id === id); 
    } catch (error) {
      console.error("getBoardById error:", error);
      return undefined;
    }
  };
  
  export const getLocalData = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem('trelloData'));
      return stored ? stored : { boards: [] };
    } catch (error) {
      console.error("getLocalData error:", error);
      return { boards: [] };
    }
  };
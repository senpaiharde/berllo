// utils/storageService.js (or wherever this lives)

// Load data from localStorage or JSON
export const getLocalData = async () => {
    try {
      const storedData = localStorage.getItem('trelloData');
      if (storedData) {
        return JSON.parse(storedData);
      }
  
      const response = await fetch('/berllo.json');
      const data = await response.json();
  
      if (!data.boards) {
        data.boards = [];
      }
  
      localStorage.setItem('trelloData', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("getLocalData - Error:", error);
      return { boards: [] };
    }
  };
  
  // Get a board by ID from trelloData.boards
  export const getBoardById = async (boardId) => {
    try {
      const data = await getLocalData();
      return data?.boards?.find(
        (board) => board._id.toString() === boardId.toString()
      );
    } catch (error) {
      console.error("getBoardById error:", error);
      return undefined;
    }
  };
  
  // Save a SINGLE updated board inside the existing boards array
  export const saveTolocal = async (updatedBoard) => {
    try {
      const prevData = await getLocalData();
      console.log("prevData:", prevData);
      const prevBoards = prevData.boards || [];
  
      const updatedBoards = prevBoards.map((board) =>
        board._id === updatedBoard._id ? updatedBoard : board
      );
  
      const newData = {
        ...prevData,
        boards: updatedBoards,
      };
  
      localStorage.setItem("trelloData", JSON.stringify(newData));
      console.log(" saveTolocal: updated board saved");
    } catch (error) {
      console.error("saveTolocal error:", error);
    }
  };
  
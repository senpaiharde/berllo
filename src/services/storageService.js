export const fetchData = async () => {
    try {
      console.log("fetchData - Start");
      const response = await fetch('/berllo.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("fetchData - Data:", data);
      return data;
    } catch (error) {
      console.error("fetchData error:", error);
      throw error;
    }
  };
  
  export const getLocalData = async () => {
    try {
      console.log("getLocalData - Start");
      const storedData = localStorage.getItem('trelloData');
      console.log("getLocalData - Raw Data:", storedData);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("getLocalData - Parsed Data:", parsedData);
        return parsedData;
      }
      const jsonData = await fetchData();
      console.log("getLocalData - Fetched JSON Data:", jsonData);
      // Ensure jsonData has a 'boards' property
      if (!jsonData.boards) {
        jsonData.boards = [];
      }
      localStorage.setItem('trelloData', JSON.stringify(jsonData));
      return jsonData;
    } catch (error) {
      console.error("getLocalData - Error getting local data:", error);
      return { boards: [] }; // Ensure you return an object with a boards property
    }
  };
  
  export const getBoardById = async (boardId) => {
    try {
      const data = await getLocalData();
      console.log("getBoardById - Data:", data);
      // Access boards array correctly
      const board = data?.boards?.find((board) => board._id.toString() === boardId.toString());
      if (!board) {
        console.warn("Board not found for id:", boardId, "in data:", data);
      }
      console.log("getBoardById - Board:", board);
      return board;
    } catch (error) {
      console.error("getBoardById error:", error);
      return undefined;
    }
  };
  
  export const saveTolocal = async (newData) => {
    try {
      console.log("saveTolocal - New Data:", newData);
      const prevData = await getLocalData() || { boards: [] }; // Use getLocalData
      console.log("saveTolocal - Previous Data:", prevData);
  
      const merged = {
        ...prevData,
        ...newData,
      };
      console.log("saveTolocal - Merged Data:", merged);
      const stringifiedData = JSON.stringify(merged);
      console.log("saveTolocal - Stringified Data:", stringifiedData);
      localStorage.setItem("trelloData", stringifiedData);
      console.log("saveTolocal - Saved to localStorage");
    } catch (error) {
      console.error("saveTolocal error:", error);
    }
  };
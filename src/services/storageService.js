
export const fetchData = async () => {
    console.log("fetchData")
    const response = await fetch('/berllo.json');
    // console.log(response)
    const data = await response.json();
    // console.log("fetchData data", data)
    return data;
}

// Function to get data from localStorage  or json
 export const getLocalData = async () => {
    // console.log("getLocalData")
    const storedData = JSON.parse(localStorage.getItem('trelloData'));
    // console.log("storedData",storedData)
    if(storedData) return storedData;


    const jsonData = await fetchData();
    localStorage.setItem('trelloData', JSON.stringify(jsonData));
    return jsonData;
};

export const getBoardById = async (boardId) =>{
    
    const data = await getLocalData()
    // console.log("getBoardById data", data)
    const board = data?.boards?.find((board) => board._id.toString() === boardId.toString())
    if (!board) {
        console.warn(" Board not found for id:", boardId, "in data:", data);
      }
    // console.log("getBoardById", boardId, board)
    return board
}


export const saveTolocal = (newData) => {
    try{const prevData = JSON.parse(localStorage.getItem("trelloData")) || {};
    const merged = {
      ...prevData,
      ...newData, 
    };
    localStorage.setItem("trelloData", JSON.stringify(merged));
}catch(error){
    console.error("Error saving to local storage:", error);
}
  };
  


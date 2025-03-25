
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
    console.log("getLocalData")
    const storedData = JSON.parse(localStorage.getItem('trelloData'));
    // console.log("storedData",storedData)
    if(storedData) return storedData;


    const jsonData = await fetchData();
    localStorage.setItem('trelloData', JSON.stringify(jsonData));
    return jsonData;
};

export const getBoardById= async (boardId) =>{
    // boardId= "dgsgs1"
    const data = await getLocalData()
    // console.log("getBoardById data", data)
    const board = data.boards.find((board) => board._id === boardId)
    // console.log("getBoardById", boardId, board)
    return board
}


export const saveTolocal = (data) => {
    localStorage.setItem('trelloData', JSON.stringify(data));
};

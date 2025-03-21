

export const fetchData = async () => {
    const response = await fetch('/data.json'); // Fetches the JSON file from /public folder
    const data = await response.json;
    return data;
}

// Function to get data from localStorage  or json
export const getLocalData = async () => {
    const storedData = JSON.parse(localStorage.getItem('trelloData'));
    if(storedData) return storedData;


    const jsonData = await fetchData();
    localStorage.setItem('trelloData', JSON.stringify(jsonData));
    return jsonData;
};


export const saveTolocal = (data) => {
    localStorage.setItem('trelloData', JSON.stringify(data));
};


export const fetchData = async () => {
    const response = await fetch('../public/berllo.json');
    
    const data = await response.json();
    console.log(data);
    return data;
}

// Function to get data from localStorage  or json
export const getLocalData = async () => {
    console.log("getLocalData")
    const storedData = JSON.parse(localStorage.getItem('trelloData'));
    console.log(storedData)
    if(storedData) return storedData;


    const jsonData = await fetchData();
    localStorage.setItem('trelloData', JSON.stringify(jsonData));
    return jsonData;
};


export const saveTolocal = (data) => {
    localStorage.setItem('trelloData', JSON.stringify(data));
};

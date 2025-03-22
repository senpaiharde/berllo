
// generatingg an 8 char random Id
export const generateRandomId = () => {
    return Math.random().toString(36).toString(2,10);
};

// converting the title into slug type 
export const slugify = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); //regix

};
// Create a new board and save it to localStorage
export const createBoard = (title) => {
    const id = generateRandomId;
    const slug = slugify(title)

    const newBoard = {
     _id : id,
     boardTitle:title,
     boardUsers : [],
     boardLists : []
    };


    const boards = JSON.parse(localStorage.getItem('boards')) || [];
    boards.push(newBoard);
    localStorage.setItem('boards', JSON.stringify(boards));

    return  `/b/${id}/${slug}`;  // Return URL for navigation
};


export const getBoardById = (id) => {
    const boards = JSON.parse(localStorage.getItem('boards')) || [];
    return boards.find(x => x._id === id)    // find a board by ID from localStorage
}
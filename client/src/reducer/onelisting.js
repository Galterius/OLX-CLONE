export default (listing = [], action) => {
    switch(action.type){
        case 'FETCH_ONE':
            return action.payload;
        default:
            return listing;
    }
}
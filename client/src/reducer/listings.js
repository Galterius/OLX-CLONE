export default (listings = [], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...listings, action.payload];
        default:
            return listings;
    }
}
exports.authenticationMapper = (userData) =>{
    return {id: userData._id, email: userData.email, name: userData.name}
}

exports.tokenMapper = (userData) => {
    return {email: userData.email, id: userData._id}
}
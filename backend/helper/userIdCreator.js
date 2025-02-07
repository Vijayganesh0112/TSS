function userId(str1,str2){
    let userId = str1.substring(0,3)+str2.substring(2,5);
    return userId;
}

module.exports = {
    userId
}
const otpValidator = async (otpTime) =>{
    const cDate = new Date();
    var diffInTime = (otpTime - cDate.getTime());
    diffInTime = Math.abs(diffInTime)/1000;
    const min = diffInTime/60;   
    if(min > 5){
        return false;
    }
    else{
        return true;
    }
}

module.exports = {
    otpValidator
}
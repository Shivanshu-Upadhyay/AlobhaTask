const validator = require("email-validator");
const csvInsert = require("./model");
class AllValidator {
  async fieldValide(email, phone, pincode) {
    let emailVal = validator.validate(email);
    let phoneAndPinVal;
    typeof(phone) !== "string" ? phone = phone.toString() : null;
    typeof(pincode) !== "string" ?pincode = toString(pincode) : null;
    if (phone.length === 10 && Number(phone) && pincode.length === 6 && Number(pincode) ) {
      phoneAndPinVal = true;
    }else{
      phoneAndPinVal = false
    }
    if (emailVal && phoneAndPinVal) {
     let data =  await csvInsert.find({ $or: [ { Email:email }, { Phone:phone } ] })
     return data.length===0?true:false 
    }else{
        return false
    }
  }
}
module.exports = new AllValidator();

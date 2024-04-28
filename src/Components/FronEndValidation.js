export default function FrontEndValidation(values) {
  let errors = {}

//patterns for email and password 
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //it says withput space all character all char are accepted before and after @
 const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/; //atleast one digit one small char big char and digit max length 5

//for name

  if(values.name === ""){
    errors.name = "Name should not be Empty."
  }else if(values.name.length < 3 || values.name.length > 30){
    errors.name = "Name must be between 3-30 "
  }else{
    errors.name = ""
  }

  // for email
  if(values.email === ""){
    errors.email = "Email should not be Empty."
  }else if(!email_pattern.test(values.email)){
    errors.email = "Invalid Email "
  }else{
    errors.email = ""
  }

  //for password
  if(values.password === ""){
    errors.password = "Password should not be Empty."
  } else if(!password_pattern.test(values.password)){
    errors.password = "Password must have 1{digit,capital and small character}" 
  }else{
    errors.password = ""
  }
   
  return errors;
}

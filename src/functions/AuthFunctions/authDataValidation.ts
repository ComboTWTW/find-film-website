interface authDataSignUpT  {
  username: string;
  email: string;
  password: string;
}



export const authDataValidationSignUp = (authDataSignUp:authDataSignUpT) => {

  let errorList = [];
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if(authDataSignUp.username === '') {
    errorList.push({
      input: 'username',
      message: 'Invalid Username'
    })
  } 
  if (emailRegex.test(authDataSignUp.email) === false) {
    errorList.push({
      input: 'email',
      message: 'Invalid Email'
    })
  } 
  if (authDataSignUp.password.length < 6) {
    errorList.push({
      input: 'password',
      message: 'Password should be at least 6 characters'
    })
  } 

    return errorList;

  
  
}

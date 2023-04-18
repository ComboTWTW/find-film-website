interface authData  {
    username: string;
    email: string;
    password: string;
    loginType: string;
  }

export const authDataValidation = (authData:authData) => {
    if ((authData.password.length !== undefined && authData.password.length >= 6 && authData.username.length !== (0 && undefined))) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if(emailRegex.test(authData.email) === true) {
        return true;
      } else {
        return {
            message: "Incorrect email!",
            status: false,
        }
      }
    } else if (authData.password.length == undefined || authData.password.length <= 6) {
      return {
        message: "Password should be at least 6 characters!",
        status: false,
      };
    } else {
      return {
        message: "Username field shouldn't be epmty!",
        status: false,
      };
    };
  
  }

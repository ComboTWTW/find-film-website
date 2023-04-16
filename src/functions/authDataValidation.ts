interface authData  {
    username: string;
    email: string;
    password: string;
    loginType: string;
  }

export const authDataValidation = (authData:authData) => {
    if ((authData.password.length !== (0 && undefined) && authData.username.length !== (0 && undefined))) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if(emailRegex.test(authData.email) === true) {
        return true;
      } else {
        const err = {
            message: "Incorrect email!",
            status: false,
        }
      }
    } else {
      return {
        message: "Inputs shouldn't be empty",
        status: false,
    };
    };
  
  }

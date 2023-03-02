export interface IUser {
  email: string,
  password: string
}

const login = ({ email, password }: IUser) => {
  const delay = (0.7 + Math.random() * 2) * 1000;

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if(password === 'password123' && email == 'eduardo@gmail.com'){
        resolve(
          alert('Login efetuado!')
        );
      } else {
        reject({
          message: 'Email or Password wrong.'
        })
      }
    }, delay)
  })
}

export default login;
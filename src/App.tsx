import { useState } from 'react'
import login, { IUser } from './utils'
import {Flex, Heading, Input, Button, Text } from '@chakra-ui/react';

function App() {
  const [ user, setUser ] = useState<IUser>({
    email: '',
    password: ''
  });
  const [ isRequiring, setIsRequiring ] = useState<boolean>(false);
  const [ isErrorMensageHidden, setIsErrorMensageHidden ] = useState<boolean>(true);

  const handleSubmit = async() => {
    setIsErrorMensageHidden(true);
    setIsRequiring(true);
    await login({...user})
      .then(() => setUser({ email: '', password: '' }))
      .catch(() => setIsErrorMensageHidden(false))
      .finally(() => setIsRequiring(false));
  };

  const mustBeDisabled = (): boolean => {
    if(isRequiring || user.email == '' || user.password.length < 6) {
      return true
    }
    return false
  }

  const handleEmailInputChange = (event: { target: { value: any; }; }) => {
    let { value } = event.target;
    setUser({ ...user, email: value});    
  }

  const handlePasswordInputChange = (event: { target: { value: any; }; }) => {
    let { value } = event.target;
    setUser({ ...user, password: value});    
  }

  return (
    <Flex height='100vh' alignItems='center' justifyContent='center'>
      <Flex direction='column' background={'gray.100'} p={20} rounded={6}>
        <Heading mb={6}>Login</Heading>
        { !isErrorMensageHidden && <Text mb={2} fontSize={'sm'} color={'tomato'}>Senha ou email incorretos!</Text> }

        <Input
          type={'email'}
          placeholder={'Email'}
          value={user.email}
          onChange={handleEmailInputChange}
        mb={3} required />

        <Input
          type={'password'}
          placeholder={'Password'}
          value={user.password}
          onChange={handlePasswordInputChange}
          mb={3} required />

        <Button colorScheme={'facebook'}  isDisabled={mustBeDisabled()} onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}

export default App;
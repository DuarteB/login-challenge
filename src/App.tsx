import { useEffect, useState } from 'react'
import login, { User } from './utils'
import { ChakraProvider, Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.


function App() {
  const [ user, setUser ] = useState<User>({
    email: '',
    password: ''
  });
  const [ isRequiring, setIsRequiring ] = useState<boolean>(false);
  const [ isErrorMensageHidden, setIsErrorMensageHidden ] = useState<boolean>(true);

  const handleSubmit = async() => {
    setIsErrorMensageHidden(true);
    setIsRequiring(true);
    await login({...user})
      .then(() => {
        setIsErrorMensageHidden(true);
        setUser({ email: '', password: '' });
      })
      .catch(() => { setIsErrorMensageHidden(false) })
    .finally(() => {
      setIsRequiring(false);
    });
  };

  const mustBeDisabled = (): boolean => {
    if(isRequiring || user.email == '' || user.password.length < 6)
      return true
    else
      return false
  }

  return (
    <ChakraProvider>
      <Flex height='100vh' alignItems='center' justifyContent='center'>
        <Flex direction='column' background={'gray.100'} p={20} rounded={6}>
          <Heading mb={6}>Login</Heading>
          { !isErrorMensageHidden && <Text mb={2} fontSize={'sm'} color={'tomato'}>Senha ou email incorretos!</Text> }

          <Input
            type={'email'}
            placeholder={'Email'}
            value={user.email}
            onChange={(event) => {
              let { value } = event.target;
              setUser({ ...user, email: value});
            }}
          mb={3} required />

          <Input
            type={'password'}
            placeholder={'Password'}
            value={user.password}
            onChange={(event) => {
              let { value } = event.target;
              setUser({ ...user, password: value });
            }}
            mb={3} required />

          <Button colorScheme='teal'  isDisabled={mustBeDisabled()} onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
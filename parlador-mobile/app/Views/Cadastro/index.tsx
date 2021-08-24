import React,
{
    useState,
} from 'react';
import { 
    Container,
    ButtonOrange,
    InputValue,
    TextButton,
    ViewValue,
} from './styles';

const Cadastro: React.FC = () => {
    const [nome, SetNome] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    return(
        <Container>
                <ViewValue>
                        <InputValue 
                            placeholder={'Nome'}
                            //value={nome}
                            onChangeText={(txt:string)=>{SetNome(txt);}}
                        />    
                        <InputValue
                            placeholder={'Email'}
                            //value={email}
                            onChangeText={(txt:string)=>{SetEmail(txt);}}
                        />
                        <InputValue
                            placeholder={'Senha'}
                            secureTextEntry={true}
                            //value={password}
                            onChangeText={(txt:string)=>{SetPassword(txt);}}
                        />
                 <ButtonOrange
                    onPress={()=>{
                        console.log('\n\nNome: ', nome,'\nEmail: ', email,'\nPassword: ',password, '\n\n');
                    }}
                 >
                        <TextButton>
                            Cadastrar
                        </TextButton>
                    </ButtonOrange>
                </ViewValue>
        </Container>
  );
}

export default Cadastro;
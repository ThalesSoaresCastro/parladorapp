import React from 'react';
import { 
    Container,
    ButtonOrange,
    InputValue,
    TextButton,
    ViewValue,
    TextButtonNewUser,
    ContanerInput,
} from './styles';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../../theme.json'

const Cadastro: React.FC = () => {
  return(
        <Container>
                <ViewValue>
                    <ContanerInput>
                        <TextButtonNewUser>
                            Nome
                        </TextButtonNewUser>
                        <InputValue />
                    </ContanerInput>
                    
                    <ContanerInput>
                        <TextButtonNewUser>
                            Email
                        </TextButtonNewUser>
                        <InputValue />
                    </ContanerInput>
                 <ContanerInput>
                        <TextButtonNewUser>
                            Senha
                        </TextButtonNewUser>
                        <InputValue />
                    </ContanerInput>
                 <ButtonOrange>
                        <TextButton>
                            Cadastrar
                        </TextButton>
                    </ButtonOrange>
                </ViewValue>
        </Container>
  );
}

export default Cadastro;
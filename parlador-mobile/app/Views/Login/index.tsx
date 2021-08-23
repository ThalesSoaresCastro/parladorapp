import React,{
    useState,
    useContext,
} from 'react';

import { 
    Container,
    InputValue,
    ImageIcon,
    ViewValue,
    ViewImage,
    ButtonOrange,
    TextButton,
    ButtonGray,
    TextButtonNewUser,
    ViewLoadingAnimation,
} from './styles';

import LottieView from 'lottie-react-native';

import AuthContext from '../../contexts/auth/auth';

const img_dir  = '../../public/images/logoopen2-rsemfundo.png'

const loading = '../../animations/loading-animation.json'


const Login: React.FC = ({navigation}:any) => {
    
    const { signIn } = useContext(AuthContext);

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState(''); 

    const [animationOn, SetAnimationOn] = useState(false);



  return(
      <Container>
          <ViewValue>
            <InputValue 
                placeholder={'Insira seu email'}
                onChangeText={(txt:string) => { SetEmail(txt);}}
                placeholderStyle={{color:'white'}}
            />
            <InputValue 
                placeholder={'Insira sua senha'}
                placeholderStyle={{color:'white'}}
                onChangeText={(txt:string) => { SetPassword(txt);}}
                
            />

            <ButtonOrange
                onPress={()=>{
                    SetAnimationOn(!animationOn);

                    console.log('\nEmail: ', email,'\nPassword: ',password,'\n');

                }}
            >
                <TextButton>
                    Logar
                </TextButton>
            </ButtonOrange>

            <ButtonGray
                onPress={()=>{
                    navigation.navigate('Cadastro');
                }}
            >
                <TextButtonNewUser>
                    Cadastrar
                </TextButtonNewUser>
            </ButtonGray>
          </ViewValue>
          
        <ViewLoadingAnimation>
            {
                animationOn==true?
                <LottieView
                    source={require(loading)}
                    autoPlay
                    loop={true}
                    style={{
                        height:'200%',
                        //width : '200%',
                        alignItems:'center', 
                        // backgroundColor:'green', 
                        marginTop:'-10%'
                    }}
                />:null
            }


        </ViewLoadingAnimation>

          <ViewImage>
                <ImageIcon 
                    source={require(img_dir)}
                />
          </ViewImage>
      </Container>
  );
}

export default Login;
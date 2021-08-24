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
    ViewModalOpacity,
    ViewModal,
    TextModalTitle,
    TextModal,
} from './styles';

import {
    Modal,
} from 'react-native';

import LottieView from 'lottie-react-native';

import AuthContext from '../../contexts/auth/auth';

const img_dir  = '../../public/images/logoopen2-rsemfundo.png'
const loading = '../../animations/loading-animation.json'
import { AntDesign } from '@expo/vector-icons'

import authService from '../../services/authservice'

const Login: React.FC = ({navigation}:any) => {
    
    const { signIn } = useContext(AuthContext);

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState(''); 
    const [animationOn, SetAnimationOn] = useState(false);
    
    const [modal, SetModal] = useState(false);
    const [msgModal, SetMsgModal] = useState([]);

    async function handleSignIn(){
        const loginObj = {
            email:email,
            password:password
        }
        let msg;

        if(!email || email === '' || 
            !password || password === ''){
            msg = ['Error','Email e/ou senha devem ser preenchidos.'];
                //return
            }
        else{     
            msg = ['Sucesso','login ok'];
            //await signIn(loginObj);

            const resp = await authService(loginObj);

            console.log('Response: ',resp);
        }
        await SetMsgModal(msg);
        await SetModal(true);
    }
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
                onPress={async()=>{
                    SetAnimationOn(!animationOn);
                    await handleSignIn()
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
                        marginTop:'-5%'
                    }}
                />:null
            }


        </ViewLoadingAnimation>

          <ViewImage>
                <ImageIcon 
                    source={require(img_dir)}
                />
          </ViewImage>

        {
            modal?
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    statusBarTranslucent={true}
                >
                    <ViewModalOpacity>
                        <ViewModal>
                            <AntDesign name="exclamationcircle" size={42} color="orange" />
                            <TextModalTitle>{msgModal[0]}</TextModalTitle>
                            <TextModal>
                                {msgModal[1]}
                            </TextModal>
                            <ButtonOrange
                                onPress={()=>{SetModal(false);}}
                            >
                                <TextButton>
                                    Ok
                                </TextButton>
                            </ButtonOrange>
                        </ViewModal>
                    </ViewModalOpacity>
                </Modal>
            :null
        }

      </Container>
  );
}

export default Login;
import React from 'react';
import {
    createStackNavigator
} from '@react-navigation/stack';

import Login from "../Views/Login";
import Cadastro from '../Views/Cadastro';

const AuthStack = createStackNavigator();

import theme from '../../theme.json'

const AuthRoutes: React.FC = () =>(
        <AuthStack.Navigator
            screenOptions={{headerTitleAlign: 'center'}}
        >
            <AuthStack.Screen 
                name="Login" 
                component={Login}
                options={{headerShown:null }}
            />
            
            <AuthStack.Screen 
                name="Cadastro"
                component={Cadastro}  
                options={{
                            headerStyle:{
                                backgroundColor:`${theme.colors['principal-dark']}`,
                            },
                            headerTintColor:'white'
                        }}
            />
        
        </AuthStack.Navigator>
);


export default AuthRoutes;

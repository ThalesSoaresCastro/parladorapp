import React from 'react';
import {
    createStackNavigator
} from '@react-navigation/stack';

import Principal from "../Views/Principal";

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () =>(
        <AppStack.Navigator>
            <AppStack.Screen name="Principal" component={Principal} />
        </AppStack.Navigator>
);


export default AppRoutes;

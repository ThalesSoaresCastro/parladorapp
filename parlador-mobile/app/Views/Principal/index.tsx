import React from 'react';
import { 
    View,
    Text,
} from 'react-native';

// import { Container } from './styles';

const Principal: React.FC = () => {
  return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>
          <Text
            style={{color:'white', fontWeight:'bold'}}
          >
              Teste de Página Principal
          </Text>
      </View>
  );
}

export default Principal;
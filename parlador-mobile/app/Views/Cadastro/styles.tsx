import React from 'react';

import styled from 'styled-components/native';

import theme from '../../../theme.json'


export const Container = styled.View`
  flex:1;
  background-color: ${theme.colors['primary-color-dark']};
  flex-direction: column;
  align-items:center;
  justify-content: center;
`;

export const InputValue = styled.TextInput.attrs({ 
    placeholderTextColor: `${theme.colors['gray-200']}`

})`
    width: 100%;
    height:50%;
    background-color: ${theme.colors['gray-800']};
    margin-top: 0.2%;
    border-bottom-width: 3px;
    border-radius: ${theme.style['border-radius-main']}px;
    border-bottom-color: ${theme.colors['orange-400']};
    color:white;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${theme.fonts['md']}px;
`;

export const ViewValue = styled.View`
    height: 60%;
    width: 90%;
    background-color: ${theme.colors['gray-800']};
    justify-content: center;
    align-items: center;
    elevation:8;
    border-radius: ${theme.style['border-radius-main']}px;
`;


export const ContanerInput = styled.View`
    flex-direction: column;
    background-color:transparent;
    width: 90%;
    height: 18%;
`;

export const ImageIcon = styled.Image`
    width: 70%;
    height: 70%;
`;

export const ButtonOrange = styled.TouchableOpacity`
    width: 80%;
    height: 10%;
    background-color: ${theme.colors['orange-600']};
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 2.5%;
    margin-top: 15%;
    border-radius: ${theme.style['border-radius-main']}px;
    elevation:4;
`;

export const ButtonGray = styled.TouchableOpacity`
    width: 90%;
    height: 15%;
    background-color: ${theme.colors['gray-800']};
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0.5%;
    elevation:4;
    border-radius: ${theme.style['border-radius-main']}px;
`;


export const TextButtonNewUser = styled.Text`
    color:${theme.colors['orange-200']};
    font-size: ${theme.fonts['md']}px;
    font-weight: bold;
    margin-top:7%;
`;



export const TextButton = styled.Text`
    color: black;
    font-size: ${theme.fonts['md']}px;
    font-weight: bold;
`;




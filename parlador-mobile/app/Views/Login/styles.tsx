import React from 'react';

import styled from 'styled-components/native';

import theme from '../../../theme.json'


export const Container = styled.View`
  flex:1;
  background-color: ${theme.colors['principal-dark']};
  flex-direction: column-reverse;
  align-items:center;
`;


export const InputValue = styled.TextInput.attrs({ 
    placeholderTextColor: `${theme.colors['gray-200']}`

})`
    width: 90%;
    height: 18%;
    background-color: ${theme.colors['dark-800']};
    margin-top: 3%;
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
    height: 40%;
    width: 90%;
    background-color: transparent;
    justify-content: center;
    align-items: center;
`;

export const ViewModalOpacity = styled.View`
    flex:1;
    background-color: rgba(0,0,0,0.7);
    justify-content: flex-end;
    align-items: center;
`;

export const ViewModal = styled.View`
    width: 100%;
    height: 35%;
    justify-content: flex-end;
    align-items: center;
    background-color: ${theme.colors['principal-dark']};
    opacity: 1;
    border-radius: ${theme.style['border-radius-main']}px;
`;

export const ViewLoadingAnimation = styled.View`
    width:90%;
    height:5%;
    background-color:transparent;
    align-items: center;
    justify-content: center;
`;

export const ViewImage = styled.View`
    height: 60%;
    width: 100%;
    background-color: transparent;
    align-items: center;
    flex-direction: column-reverse;
`;

export const ImageIcon = styled.Image`
    width: 70%;
    height: 70%;
`;

export const ButtonOrange = styled.TouchableOpacity`
    width: 90%;
    height: 15%;
    background-color: ${theme.colors['orange-600']};
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 2.5%;
    border-radius: ${theme.style['border-radius-main']}px;
    elevation:4;
`;

export const ButtonGray = styled.TouchableOpacity`
    width: 90%;
    height: 15%;
    background-color: ${theme.colors['dark-800']};
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
`;


export const TextModal = styled.Text`
    color:${theme.colors['orange-200']};
    font-size: ${theme.fonts['md']}px;
    font-weight: bold;
    margin:4%;
`;
export const TextModalTitle = styled.Text`
    color:${theme.colors['orange-200']};
    font-size: ${theme.fonts['lg']}px;
    font-weight: bold;
    margin:4%;
`;

export const TextButton = styled.Text`
    color: black;
    font-size: ${theme.fonts['md']}px;
    font-weight: bold;
`;




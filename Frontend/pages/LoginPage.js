import { Pressable, StyleSheet, Text, View,TextInput, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

export default function LoginPage()
{
    const[passwordVisibility,setPasswordVisibility]=useState(false)
    return(
        <View>
            <View>
                <Text>Log in</Text>
            </View>
            <View>
                <TextInput placeholder='e-mail'></TextInput>
                <TextInput placeholder='password' secureTextEntry={passwordVisibility}></TextInput>
                <TextInput placeholder='password again' secureTextEntry={passwordVisibility}></TextInput>
                <CheckBox
                value={passwordVisibility}
                onValueChange={setPasswordVisibility}
                />
            </View>
            <View>
                <Text>Sign in</Text>
            </View>
        </View>
    );
}
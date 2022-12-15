import React, { useState, useEffect } from "react";
import {
    View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Login = ({ navigation, route }) => {
    const [errortext, setErrortext] = useState('');
    const initialValues = {
        email: '',
        password: '',
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        console.log(values)
        await axios.post(`https://reqres.in/api/login`,
            values, {
                headers: {
                    'Content-Type': 'application/json',
                }
        }
        ).then(async (data) => {
            console.log('data', data.data);
            await AsyncStorage.setItem('token', data.data.token, async () => {
                await AsyncStorage.getItem('disclaimer', (err, result) => {
                    if (result) {
                        navigation.replace('Fuelstation')
                    } else {
                        console.log(navigation)
                        navigation.replace('Disclaimer')
                    }
                });
            })
        }).catch((e) => {
            console.log("ERRORLOGIN", e)
            if (e.response) {
                setErrortext(e.response.data.error);
            } else if (e.request) {
                setErrortext(e.request);
            } else {
                setErrortext(e);
            }
        })
    };
    return (
        <>
            <View style={styles.loginWrapper}>
                <ImageBackground source={require('../screens/assets/mainbg.png')}
                    style={styles.loginWrapper}
                    resizeMode="cover"
                >


                    <Image source={require('../screens/assets/logo.png')} />
                    <View style={{ width: "100%" }}>
                        <Text style={styles.h1}>
                            Login
                        </Text>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={Yup.object({
                                email: Yup.string().required("Email is required").email(),
                                password: Yup.string().required("Password is required"),
                            })}
                            onSubmit={handleFormSubmit}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                                    <View style={styles.inputGroup}>

                                        <TextInput
                                            style={styles.inputStyle}
                                            placeholder="Enter Email"
                                            placeholderTextColor="#000"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                        />
                                        <Icon name="at"
                                            size={25}
                                            color="#f51637" 
                                            style={styles.icon}
                                            />
                                    </View>
                                    {errors.email && touched.email ? (
                                        <Text style={styles.errorTextStyle}>{errors.email}</Text>
                                    ) : null}
                                    <View style={styles.inputGroup}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            placeholder="Password"
                                            placeholderTextColor="#000"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            onSubmitEditing={Keyboard.dismiss}
                                            value={values.password}
                                            secureTextEntry={true}
                                            underlineColorAndroid="#f000"
                                            returnKeyType="next"
                                        />
                                         <Icon name="lock"
                                            size={25}
                                            color="#f51637" 
                                            style={styles.icon}
                                            />
                                    </View>
                                    {errors.password && touched.password ? (
                                        <Text style={styles.errorTextStyle}>{errors.password}</Text>
                                    ) : null}
                                    {errortext != '' ? (
                                        <Text style={[styles.errorTextStyle,styles.textCenter]}>
                                            {errortext}
                                        </Text>
                                    ) : null}
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={handleSubmit}
                                        >
                                            <Text style={styles.cmnBtn}>Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>

                    <Text style={styles.boldText}>Forgot Password?</Text>
                </ImageBackground>
            </View>


        </>
    )
}
const styles = StyleSheet.create({
    loginWrapper: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        backgroundPostion: "bottom",
        backgroundSize: "100%",
        alignSelf: "flex-end",
        height: "100%",


    },
    h1: {
        textAlign: "center",
        paddingTop: 30,
        fontSize: 30,
        color: "#000",
        fontWeight: "600",
        marginBottom: 20
    },
    cmnBtn: {
        backgroundColor: "#dd1d21",
        color: "#fff",
        padding: 15,
        textAlign: "center",
        borderRadius: 35,
        paddingLeft: 30,
        paddingRight: 30,
        fontWeight: "600",
        fontSize: 22,
        width: 160,
        marginTop: 30,
        margin: "auto"

    },
    inputGroup: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        width: "100%",
        marginBottom: 10,
        position:"relative"

    },
    inputStyle:{
        paddingLeft:35
    },
    textCenter:{
        textAlign:"center",
        padding:15
    },
    icon:{
        position:"absolute",
        bottom:10
    },
    inputs: {
        fontWeight: "600",
        color: "#000",
        fontSize: 18
    },
    boldText: {
        marginTop: 15,
        color: "#000",
        fontSize: 18,
        fontWeight: "600"
    },
    errorTextStyle: {
        color: "red"
    }


});
export default Login;
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Desclaimer = ({ navigation, route }) => {

    useEffect(() => {
        AsyncStorage.getItem('disclaimer').then((value) => {
            if (value != null) {
                navigation.replace('Fuelstation')
            }
        })
    }, [])

    const acceptdisclaimer = async () => {
        await AsyncStorage.setItem('disclaimer', 'true', async () => {
            navigation.replace('Fuelstation')
        })
    }
    return (
        <>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <ImageBackground source={require('../screens/assets/topBg.png')}
                    style={styles.bgstyle}

                    resizeMode="cover"
                >

                    <View style={styles.flexBox}>
                        <Image source={require('../screens/assets/logo.png')} />

                        <View style={styles.card}>
                            <Text style={styles.heading}>Disclaimer</Text>
                            <Text style={styles.para}>
                                The information provided by the Zdaly Fuel
                                Network Optimizer app is based on historical data. Data on Zdaly Light is updated once daily at 8:00 a.m. eastern time. Any prospective information is based on that data and should not be relied on as a estimation of future performance. Any future product prices are the manufacturer's suggested retail price (MSRP) only. Sites are independent operators free to set their retail
                                price.
                            </Text>
                            <View style={{ 
        alignItems:"center" }}> 
                                <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={acceptdisclaimer}
                        >
                            <Text style={styles.cmnBtn}>I Accept</Text>
                        </TouchableOpacity>
                        </View>
                       
                        </View>
                    </View>



                </ImageBackground>

            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    bgstyle: {
        width: "100%",
        height: "100%"
    },
    flexBox: {
        textAlign: "center",
        flex: 1,
        alignItems: "center",
        paddingTop: 50
    },
    card: {
        backgroundColor: "#fff",
        padding: 30,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: 50,
        textAlign: "center",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 10,

    },
    heading: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "700",
        color: "#000",
        marginBottom: 30
    },
    para: {
        fontSize: 14,
        color: "#000",
        lineHeight: 25

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
        marginTop:20

    },

})
export default Desclaimer

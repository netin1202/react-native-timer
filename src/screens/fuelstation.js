
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Fuelstation = ({ navigation }) => {

    const [stations, setStations] = useState([]);
    const [allstations, setAllStations] = useState({});
    useEffect(() => {
        getStations();
    }, [])
    const getStations = async () => {
        await axios.get(`https://reqres.in/api/unknown`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        ).then(async (data) => {
            console.log('data', data.data);
            setStations(data.data.data)
            setAllStations(data.data)
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
    }

    const handleChange = (text) => {
        const filteredData = allstations?.data?.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(text.toLowerCase())
        })
        setStations(filteredData)
    }
    const navigateDetail = (id) => {
        navigation.navigate('Details', {
            stationId: id
        })
    }
    return (
        <>
            <ImageBackground source={require('../screens/assets/topBg.png')}
                style={styles.bgstyle}

                resizeMode="cover"
            >
                <ScrollView style={{ flex:1,height:"100%" }}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={styles.flexBox}>
                        <Text style={styles.heading}>Select Station</Text>

                        <View style={styles.card}>

                            <View style={styles.search}>
                                <TextInput placeholder="Search by ID, Name, City" onChangeText={newText => handleChange(newText)} />
                            </View>
                            {stations?.map((station, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity style={styles.fuelcard} onPress={() => { navigateDetail(station?.id) }}>
                                            <View >
                                                <Image source={require('../screens/assets/Icon.png')} />
                                            </View>
                                            <View style={styles.fuelcontent}>
                                                <Text style={styles.fuelTitle}>{station?.id}</Text>
                                                <Text style={styles.fueltext}>{station?.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>

                    </View>



                </ScrollView>
            </ImageBackground>

        </>
    )
}


const styles = StyleSheet.create({
    bgstyle: {
        width: "100%",
        height: "100%",
        
        
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
        width: "100%",
        shadowOffset: { width: -2, height: 0 },
        shadowColor: 'black',
        shadowOpacity: "10%",
        elevation: 4,
        height:"100%"
    },
    heading: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "700",
        color: "#000",
        marginBottom: 30
    },
    fuelcard: {
        borderBottomWidth: 1,
        flexDirection: "row",
        borderColor: "#F0F4F5",
        paddingBottom: 15,
        marginBottom: 30
    },
    fuelTitle: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 0
    },
    fueltext: {
        color: "#ADB7C6",
        fontWeight: "700",
        fontSize: 16
    },
    fuelcontent: {
        marginLeft: 30
    },
    search: {
        backgroundColor: "#F0F4F5",
        padding: 10,
        position: "relative",
        marginBottom: 30,
        borderRadius: 11,
        paddingLeft: 40
    }



})
export default Fuelstation

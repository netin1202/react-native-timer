
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'react-moment';
import moment from 'moment';
const Details = ({ route }) => {
    const [station, setStation] = useState({});
    const [activefrom, setactive] = useState(0);
    const [timer, setTimer] = useState(false);
    const [timerstate, setTimerState]= useState(false);
    var interval;
    useEffect(() => {
        getStation();
        AsyncStorage.multiGet([`station_${route?.params?.stationId}`], (err, stores) => {
            stores.map((result, i, store) => {
                if(store[i][0]==`station_${route?.params?.stationId}`){
                    if(store[i][1] != null){
                        let previous_value=JSON.parse(store[i][1]);
                        console.log("JUUUUUUll",previous_value)
                        if(previous_value.currentstate=="start" && previous_value.count==0){       ///started first time and  not stoped

                             let now = moment(new Date())
                             let duration = now.diff(moment(previous_value.stop), "seconds") //moment.duration(now.diff(moment(previous_value.stop)));
                            setTimerState(true)
                            setTimer(true)
                             setactive(parseInt(duration));  
                        }else if(previous_value.currentstate=="start" && previous_value.count > 0){
                            let now = moment(new Date())
                            let duration = now.diff(moment(previous_value.stop), "seconds")
                            let total_duration=parseInt(duration)+parseInt(previous_value.count);
                            console.log(total_duration)
                            setTimerState(true)
                            setTimer(true)
                            setactive(parseInt(total_duration));
                            
                        }
                        else if(previous_value.currentstate=="stop"){
                            setactive(previous_value.count);
                            setTimerState(false)
                        }
                    }
                }
            
                
              });
          });
        setTimer(timerstate);
    }, [route?.params?.stationId])


    useEffect(
        function () {
            if (!timer) {
                return;
            }

            const intervalId = setInterval(() => {
                setactive((activefrom) => activefrom + 1);
            }, 1000);
            return () => {
                console.log('Reached cleanup function');
                clearInterval(intervalId);
            };
        },
        [timer]
    );
    const getStation = async () => {
        await axios.get(`https://reqres.in/api/unknown/${route?.params?.stationId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        ).then(async (data) => {
            console.log('data', data.data);
            setStation(data.data.data)
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
    const stopTimer = (state) => {
             AsyncStorage.multiGet([`station_${route?.params?.stationId}`], (err, stores) => {
                stores.map((result, i, store) => {
                    if(store[i][0]==`station_${route?.params?.stationId}`){
                        let time_object={}
                        if(state==true){
                            time_object.start=time_object.start;
                            time_object.count=activefrom;
                            time_object.stop=moment(new Date());
                            time_object.currentstate="stop";
                        }else{
                            if(store[i][1] == null){
                                time_object.start=moment(new Date());
                                time_object.count=0;
                                time_object.stop=moment(new Date());
                                time_object.currentstate="start";
                            }else{
                                time_object.count=activefrom;
                                time_object.stop=JSON.parse(store[i][1]).stop
                                time_object.currentstate="start";    
                            }
                        }
                        AsyncStorage.multiMerge([[`station_${route?.params?.stationId}`,JSON.stringify(time_object)]], (err) => {
                            setTimer(!state)
                            setTimerState(!state);
                        })


                    }
                
                    
                  });
              });

        
    }
    return (
        <>

            <ImageBackground source={require('../screens/assets/topBg.png')}
                style={styles.bgstyle}

                resizeMode="cover"
            >

                <View style={styles.flexBox}>
                    <Text style={styles.heading}>Details</Text>

                    <View style={styles.card}>

                        <Text style={styles.heading}>{timerstate==true ? 'Station Subscribed' : "Subscribe Station"}</Text>

                        <View style={styles.fuelcard}>
                            <View >
                                <Text style={styles.active}>ACTIVE FROM</Text>
                                <View style={{
                                    postion: "relative", marginTop: 15, marginBottom: 15, display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}>
                                    <Text style={styles.min}>
                                        {activefrom}
                                    </Text>
                                    <Text style={styles.sec}>seconds</Text>
                                </View>

                               <View style={styles.toggle}>
                              <View>
                              <Text style={styles.infobtn}>
                                        MORE INFO
                                    </Text>
                              </View>
                                <TouchableOpacity
                                    activeOpacity={0.5}

                                >
                                  
                                    <View style={styles.iconWrap}>
                                        <Icon name="chevron-down"
                                            size={16}
                                            color="#000"
                                            style={styles.icon}
                                        />
                                    </View>
                                </TouchableOpacity>
                               </View>
                            </View>
                            <View style={styles.fuelcontent}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => { stopTimer(timerstate) }}
                                >
                                    <Text style={styles.cmnBtn}>{timerstate==true? 'Stop': 'Start'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>



            </ImageBackground>


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
        width: "100%",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 10.32,

        elevation: 24,
    },
    heading: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "700",
        color: "#000",
        marginBottom: 30
    },
    fuelcard: {
        flexDirection: "row",
        paddingBottom: 15,
        marginBottom: 30,
        backgroundColor: "#fff",
        shadowOffset: { width: -2, height: 10 },
        shadowColor: '#000',
        shadowOpacity: 50,
        shadowRadius: 3,
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "space-between",
        shadowColor: "rgba(0, 0, 0, 0.35)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .09,

        elevation: 15,
        borderRadius: 16,
        padding: 20
    },
    fuelTitle: {
        color: "#000",
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 0
    },

    search: {
        backgroundColor: "#F0F4F5",
        padding: 10,
        position: "relative",
        marginBottom: 30,
        borderRadius: 11,
        paddingLeft: 40
    },
    active: {
        fontWeight: "700",
        color: "#000"
    },
    sec: {
        position: "relative",
        top: -10,
        color: "#000",
        fontWeight: "700",
        left: 0

    },
    min: {
        fontSize: 26,
        fontWeight: "700",
        color: "#000",
        padding: 15,
        paddingRight: 5
    },
    infobtn: {
        fontWeight: "700",
        color: "#000",
        marginRight:15
    },
    cmnBtn: {
        backgroundColor: "#dd1d21",
        color: "#fff",
        padding: 8,
        textAlign: "center",
        borderRadius: 35,
        paddingLeft: 15,
        paddingRight: 15,
        fontWeight: "600",
        fontSize: 22,
        width: 100,
        fontSize: 12

    },
    iconWrap: {
        backgroundColor: "#E2E8E1",
        width: 40,
        height: 40,
        borderRadius: 50,
        textAlign: "center",
        lineHeight: 40,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    },
    toggle:{
        flexDirection:"row",
        display: "flex" ,
        alignItems:"center" 
    }



})
export default Details

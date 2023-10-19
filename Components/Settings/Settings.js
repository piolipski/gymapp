import { View, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { Text } from '../Text.js';
import RightArrowSVG from '../../images/RightArrowSVG.svg';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
    const navigation = useNavigation();
    //unit system
    const [unitSystem, setUnitSystem] = useState('kg');
    const [distanceSystem, setDistanceSystem] = useState('km');

    const setKg = () => { setUnitSystem('kg'); }
    const setLbs = () => { setUnitSystem('lbs'); }
    const setKm = () => { setDistanceSystem('km'); }
    const setMiles = () => { setDistanceSystem('miles'); }

    //app dark mode
    const [darkMode, setDarkMode] = useState(false);

    const setDarkModeOn = () => { setDarkMode(true); }
    const setDarkModeOff = () => { setDarkMode(false); }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.settingsCategory}>Units</Text>
                <View style={styles.container}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={setKg} style={styles.touch}>
                            <Text style={[styles.buttonText, unitSystem === 'kg' ? styles.activeText : null]}>kg</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={setLbs} style={styles.touch}>
                            <Text style={[styles.buttonText, unitSystem === 'lbs' ? styles.activeText : null]}>lbs</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={setKm} style={styles.touch}>
                            <Text style={[styles.buttonText, distanceSystem === 'km' ? styles.activeText : null]}>km</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={setMiles} style={styles.touch}>
                            <Text style={[styles.buttonText, distanceSystem === 'miles' ? styles.activeText : null]}>miles</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.settingsCategory}>Account</Text>
                <View style={[styles.container, { gap: 0, paddingTop: 0 }]}>
                    <View style={styles.profileButton}>
                        <TouchableOpacity
                            style={styles.profileTouch}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.profileText}>Login</Text>
                            <RightArrowSVG height={13} width={13} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.profileButton, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                        <TouchableOpacity
                            style={styles.profileTouch}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={styles.profileText}>Register</Text>
                            <RightArrowSVG height={13} width={13} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.settingsCategory}>Application settings</Text>
                <View style={styles.container}>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        padding: 20,
        gap: 25,
        borderBottomWidth: 1,
        borderColor: 'hsla(0,0%,0%, 0.35)'
    },
    button: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'hsla(0,0%,0%, 0.35)'
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
        padding: 10,
        fontSize: 18
    },
    activeText: {
        color: 'white',
        backgroundColor: '#006EE6',
    },
    touch: {
        flexGrow: 1,
        flexBasis: 0,
    },
    settingsCategory: {
        color: 'hsla(0,0%,0%, 0.75)',
        paddingHorizontal: 20,
        paddingTop: 15,
        fontSize: 14
    },
    profileTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    profileButton: {
        borderBottomWidth: 1,
        paddingVertical: 15,
        borderColor: 'hsla(0,0%,0%, 0.5)'
    },
    profileText: {
        fontSize: 16,
    },
});
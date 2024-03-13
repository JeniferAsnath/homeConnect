import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';

export default function Button({ name, onPress, accessibilityState }) {
    const animatedValues = {
        translate: useRef(new Animated.Value(0)).current,
        scale: useRef(new Animated.Value(0)).current,
    };
    const { translate, scale } = animatedValues;

    useEffect(() => {
        handleAnimated();
    }, [accessibilityState.selected]);

    const handleAnimated = () => {
        Animated.parallel([
            Animated.timing(translate, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 400,
                useNativeDriver: false
            }),
            Animated.timing(scale, {
                toValue: accessibilityState.selected ? 1 : 0,
                duration: 250,
                useNativeDriver: false
            })
        ]).start();
    };

    const translateStyle = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                    extrapolate: 'clamp'
                })
            }
        ]
    };

    const scaleStyle = {
        opacity: scale.interpolate({
            inputRange: [0.5, 1],
            outputRange: [0.5, 1],
            extrapolate: 'clamp'
        }),
        transform: [
            {
                scale: scale
            }
        ]
    };

    return (
        <TouchableOpacity
            style={[styles.button, accessibilityState.selected ? styles.selectedButton : null]}
            onPress={onPress}
        >
            <Animated.Text style={[styles.text, translateStyle, scaleStyle]}>
                {name}
            </Animated.Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#326383',
        margin: 'auto',
        marginBottom: 10,
    },
    selectedButton: {
        backgroundColor: 'black',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

// Utilisation du composant Button dans le composant parent

function ParentComponent() {
    const [selected, setSelected] = useState(false);

    const toggleBackground = () => {
        setSelected(!selected);
    };

    return (
        <View style={stylesC.container}>
            <Button
                name="Cliquez ici"
                onPress={toggleBackground}
                accessibilityState={{ selected: selected }}
            />
        </View>
    );
}
ParentComponent()
const stylesC = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});

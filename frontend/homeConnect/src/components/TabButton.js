import React from 'react';
import { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default ({item, accessibilityState, onPress}) => {
  const animatedValues = {
    translate : useRef(new Animated.Value(0)).current,
    scale : useRef(new Animated.Value(0)).current, 
  }
  const {translate, scale} = animatedValues
  useEffect(()=>{
    handleAnimated()
  }, [accessibilityState.selected])
  const handleAnimated = () => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue:accessibilityState.selected ? 1 : 0,
        duration : 400,
        useNativeDriver: false
        
      }),
      Animated.timing(scale, {
        toValue:accessibilityState.selected ? 1 : 0,
        duration : 250,
        useNativeDriver: false
        
      })
    ]).start()
  };

  const translateStyle= {
    transform : [
      {
        translateY: translate.interpolate({
          inputRange :[0, 1],
          outputRange :[0, -30],
          extrapolate :'clamp'
        })
      }
    ]
  }
  const scaleStyle= {
        opacity: scale.interpolate({
        inputRange :[.5, 1],
        outputRange :[.5, 1],
        extrapolate :'clamp'
      }),
      transform : [
      {
        scale: scale
      }
    ]
  }
  return (
    
   <TouchableOpacity style={styles.contenair} onPress={onPress} >
    <Animated.View  style={[styles.onglet, translateStyle]} >
      <Animated.View  style={[{width:50, height:50, borderRadius: 100, position: 'absolute', backgroundColor: '#F4511E' }, scaleStyle]}  />
      <Material name={item.icon} color={accessibilityState.selected ? '#fff' : '#33313B' } size={30}/>
    </Animated.View>
    <Animated.Text style={[styles.title, {opacity: scale }]} >{item.name}</Animated.Text>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contenair :{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    height: 60,
    alignSelf: 'stretch'
  },
  onglet : {
    width: 50,
    height: 50,
    borderRadius : 25,
    borderWidth: 4,
    borderColor: 'transparent', 
    justifyContent: 'center',
    alignItems:'center',
    overflow:'hidden'
  },
  title : {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign:'center',
    color: '#33313B',
    position: 'absolute',
    bottom: 20,
  }
})
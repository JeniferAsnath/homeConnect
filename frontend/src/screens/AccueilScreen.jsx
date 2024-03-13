import React from 'react'
import { Image, View, Text } from 'react-native'
import maison from '../../assets/rendu-3d-du-modele-maison.jpg'
import Button from '../components/Button'
export default function accueilScreen() {
  return (
    <View className=' items-center mb-10 '>
        <Image className="w-full h-[65%] rounded-tl-none rounded-bl-[150px] " source={maison} resizeMode='cover' />
        <Text className='w-[90%] text-center font-bold my-7 text-lg'>Connectez-vous aux Meilleures Locations de Maisons</Text>
        <Button name={"Log in"} />
        <Button name={"Sign up"} />

    </View>
  )
}

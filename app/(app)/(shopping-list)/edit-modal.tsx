import { View, Text, TextInput } from 'react-native'
import React from 'react'
import EditShoppingItem from '@/components/EditShoppingItem'
import { useLocalSearchParams } from 'expo-router'

const EditModal = () => {
    const { itemId } = useLocalSearchParams()
    console.log(itemId)
  return (
    <View>
      <EditShoppingItem ingredientId={itemId} />
    </View>
  )
}

export default EditModal
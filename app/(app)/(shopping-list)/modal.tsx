import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/context/ctx'
import { fetchShoppingList } from '@/clients/shopping-list'

const modal = (): JSX.Element => {
  const { token } = useSession()
  const { itemId } = useLocalSearchParams()
  const query = useQuery({
    queryKey: ['fetchShoppingList', token],
    queryFn: async () => await fetchShoppingList(token),
    refetchOnMount: false,
  })
  const ingredient = query.data?.ingredients.find(
    (ingredient) => ingredient.id === parseInt(itemId)
  )

  return (
    <View>
      <Text>{ingredient?.name}</Text>
      <Text>{ingredient?.measure}</Text>
    </View>
  )
}

export default modal

import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { fetchSLData } from '@/store/shopping-list'
import { type Dispatch } from 'redux'
import { type Ingredient } from '@/models/Recipe'
import { type StoreState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { useSession } from '@/context/ctx'

export default function Page(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch()
  const { token } = useSession()
  const data: Ingredient[] = useSelector(
    (state: StoreState) => state.shoppingList.ingredients
  )
  const loading: boolean = useSelector(
    (state: StoreState) => state.shoppingList.loading
  )
  useEffect(() => {
    dispatch(fetchSLData(token))
  }, [dispatch])

  return (
    <View>
      <Text>Shopping list</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {data?.map((ingredient, index) => (
            <Text key={index}>
              {ingredient.name}: {ingredient.measure}
            </Text>
          ))}
        </View>
      )}
    </View>
  )
}

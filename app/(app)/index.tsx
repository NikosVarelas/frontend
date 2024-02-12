import { ActivityIndicator, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { type Recipe } from '@/models/Recipe'
import { useSession } from '@/context/ctx'
import Carousel from '@/components/carousel'
import CustomButton from '@/components/CustomButton'
import React, { useEffect } from 'react'
import { fetchRecipeData } from '@/store/recipes'
import { type StoreState } from '@/store'
import {type Dispatch} from 'redux'

export default function Index(): JSX.Element {
  const { signOut, token } = useSession()
  const data: Recipe[] = useSelector((state: StoreState) => state.recipes.recipes)
  const loading: boolean = useSelector((state: StoreState) => state.recipes.loading)
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipeData(token))
  }, [dispatch])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? <ActivityIndicator /> : <Carousel data={data} />}
      <CustomButton
        title="Sign Out"
        onPress={() => {
          signOut()
        }}
      >
        Sign Out
      </CustomButton>
    </View>
  )
}

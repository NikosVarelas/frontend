import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { useSession } from '@/context/ctx'
import Carousel from '@/components/carousel'
import CustomButton from '@/components/CustomButton'
import React, { useEffect } from 'react'
import { fetchRecipeData } from '@/store/recipes'

export default function Index(): JSX.Element {
  const { signOut, token } = useSession()
  const data = useSelector((state) => state.recipes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipeData(token))
  }, [dispatch])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Carousel data={data} />
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

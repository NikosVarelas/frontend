import { ActivityIndicator, View, Text } from 'react-native' // Import Text from react-native
import { useSession } from '@/context/ctx'
import Carousel from '@/components/carousel'
import CustomButton from '@/components/CustomButton'
import React, { useEffect } from 'react'
import { useRecipeStore } from '@/store/recipeStore'

export default function Index(): JSX.Element {
  const { signOut, token } = useSession()
  const data = useRecipeStore((state) => state.recipes)
  const loading = useRecipeStore((state) => state.loading)
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes)
  const errorMessage = useRecipeStore((state) => state.errorMessage)

  useEffect(() => {
    fetchRecipes(token)
  }, [])

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      {errorMessage != null && <Text>Couldn't fetch recipes!</Text>}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {loading ? <ActivityIndicator /> : <Carousel data={data} />}
      </View>
      <View style={{}}>
        <CustomButton
          title="Sign Out"
          onPress={() => {
            signOut()
          }}
        >
          Sign Out
        </CustomButton>
      </View>
    </View>
  )
}

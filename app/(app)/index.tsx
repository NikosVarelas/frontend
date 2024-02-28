import { ActivityIndicator, View, Text } from 'react-native'
import { useSession } from '@/context/ctx'
import Carousel from '@/components/carousel'
import CustomButton from '@/components/CustomButton'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchRecipes } from '@/clients/recipe'
import { useRecipeStore } from '@/store/recipeStore'
import { type Recipe } from '@/models/Recipe'

export default function Index(): JSX.Element {
  const { signOut, token } = useSession()
  const replaceRecipes = useRecipeStore((state) => state.replace)

  const query = useQuery({
    queryKey: ['fetchRecipes'],
    queryFn: async () => await fetchRecipes(token),
    refetchOnMount: false,
  })

  if (query.isSuccess as boolean) {
    if (query.data.length > 0) {
      replaceRecipes(query.data as Recipe[])
    }
  }

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      {query.error != null && <Text>Could not fetch recipes!</Text>}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {(query.isLoading as boolean) ? (
          <ActivityIndicator />
        ) : (
          <Carousel data={query.data} />
        )}
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

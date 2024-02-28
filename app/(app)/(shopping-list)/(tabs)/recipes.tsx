import React from 'react'
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { fetchRecipes } from '@/clients/recipe'
import { useSession } from '@/context/ctx'
import { fetchShoppingList } from '@/clients/shopping-list'
import { type Recipe } from '@/models/Recipe'

export default function Index(): JSX.Element {
  const { token } = useSession()

  const { data: recipeData } = useQuery({
    queryKey: ['fetchRecipes'],
    queryFn: async () => await fetchRecipes(token),
    refetchOnMount: false,
  })

  const { data: shoppingList } = useQuery({
    queryKey: ['fetchShoppingList'],
    queryFn: async () => await fetchShoppingList(token),
    refetchOnMount: false,
  })

  const recipesInShoppingList = recipeData?.filter((recipe: Recipe) => {
    return shoppingList?.ingredients.some(
      (ingredient) => ingredient.recipe_id === recipe.id
    )
  })

  return (
    <View style={{ flex: 1 }}>
      {recipesInShoppingList !== undefined && recipesInShoppingList !== null ? (
        <FlatList
          data={recipesInShoppingList}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row' }}>
              <Image
                source={{ uri: item.image_url }}
                style={{ width: 100, height: 100 }}
              />
              <Text>{item.name}</Text>
              {/* Render additional recipe details here */}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  )
}

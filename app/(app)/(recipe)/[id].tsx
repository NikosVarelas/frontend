import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useSession } from '@/context/ctx'
import { type Recipe } from '@/models/Recipe'
import { FontAwesome } from '@expo/vector-icons'
import { useShoppingListStore } from '@/store/shoppingListStore'
import { useRecipeStore } from '@/store/recipeStore'

const Page = (): JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const recipeId = parseInt(id)
  const { token } = useSession()
  const shoppingListAdd = useShoppingListStore((state) => state.add)
  const recipes = useRecipeStore((state) => state.recipes)

  const recipeData: Recipe = recipes.find((recipe) => recipe.id === recipeId)

  const handleAddtoBasket = async (): Promise<void> => {
    if (recipeData != null) {
      router.push('/(app)')
      await shoppingListAdd(recipeData, token)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipeData.image_url }} style={styles.image} />
      <View style={styles.instructions}>
        <Text>{recipeData.instructions}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleAddtoBasket()
        }}
      >
        <FontAwesome
          name="shopping-basket"
          size={20}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.buttonText}> Add to basket</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  instructions: {
    marginTop: 20
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  image: {
    height: 350,
    width: 420,
    borderRadius: 8,
  },
})

export default Page

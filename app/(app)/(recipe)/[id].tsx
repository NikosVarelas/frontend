import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useSession } from '@/context/ctx'
import { type Recipe } from '@/models/Recipe'
import { FontAwesome } from '@expo/vector-icons'
import { useShoppingListStore } from '@/store/shoppingListStore'
import { useRecipeStore } from '@/store/recipeStore'
import { ScrollView } from 'react-native-gesture-handler'

const Page = (): JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const recipeId = parseInt(id)
  const { token } = useSession()
  const shoppingListAdd = useShoppingListStore((state) => state.addFromRecipe)
  const recipes = useRecipeStore((state) => state.recipes)

  const recipeData: Recipe | undefined = recipes.find((recipe) => recipe.id === recipeId)

  const handleAddtoBasket = async (): Promise<void> => {
    if (recipeData != null) {
      await shoppingListAdd(recipeId, token)
      router.push('/(app)')
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipeData.image_url }} style={styles.image} />
      <ScrollView style={styles.instructions}>
        <Text style={styles.instructionsText}>{recipeData.instructions}</Text>
      </ScrollView>
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
    flex: 1,
  },
  instructions: {
    marginTop: 20,
    padding: 8,
    flex: 1,
  },
  instructionsText: {
    fontFamily: 'space-mono',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  image: {
    marginTop: 10,
    height: Dimensions.get('window').height * 0.35,
    width: Dimensions.get('screen').width * 0.95,
    borderRadius: 8,
  },
})

export default Page

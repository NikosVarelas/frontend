import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useSession } from '@/context/ctx'
import { useDispatch, useSelector } from 'react-redux'
import { type Dispatch } from 'redux'
import { deleteRecipe } from '@/store/recipes'
import { addRecipe } from '@/store/shopping-list'
import { type StoreState } from '@/store'
import { type Recipe } from '@/models/Recipe'
import { FontAwesome } from '@expo/vector-icons'

const Page = (): JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const recipeId = parseInt(id)
  const { token } = useSession()
  const dispatch: Dispatch<any> = useDispatch()

  const recipes: Recipe[] = useSelector((state: StoreState) => state.recipes.recipes)
  const recipeData: Recipe | undefined = recipes.find(recipe => recipe.id === recipeId)

  const handleAddtoBasket = (): void => {
    if (recipeData != null) {
      dispatch(addRecipe(token, recipeData))
    }
  }

  const handleDeleteRecipeYes = async (): Promise<void> => {
    try {
      await dispatch(deleteRecipe(token, recipeId))
      router.push('/(app)')
    } catch (error) {
    }
  }

  const handleDeleteRecipe = (): void => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete the recipe?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('Cancel Pressed')
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            handleDeleteRecipeYes()
            router.push('/(app)')
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <View>
      <Text>Recipe: {id}</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleDeleteRecipe()
        }}
      >
        <FontAwesome name="trash" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Delete recipe</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default Page

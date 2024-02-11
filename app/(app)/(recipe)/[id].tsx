import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { useSession } from '@/context/ctx'
import { useDispatch } from 'react-redux'
import { type Dispatch } from 'redux'
import { deleteRecipe } from '@/store/recipes'

const Page = (): JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const recipeId = parseInt(id)
  const { token } = useSession()
  const dispatch: Dispatch = useDispatch()

  const handleAddtoBasket = (id: number): void => {
    console.log(`Added to basket recipe ${id}`)
  }

  const handleDeleteRecipeYes = async (id: number): Promise<void> => {
    try {
      await dispatch(deleteRecipe(token, recipeId))
      router.push('/(app)')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteRecipe = (id: number): void => {
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
            // Perform delete action here
            void handleDeleteRecipeYes(id)
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
          handleAddtoBasket(recipeId)
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
          handleDeleteRecipe(recipeId)
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

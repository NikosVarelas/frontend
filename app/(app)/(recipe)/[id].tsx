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
import { useRecipeStore } from '@/store/recipeStore'
import { ScrollView } from 'react-native-gesture-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addRecipeToSL } from '@/clients/shopping-list'
import Toast from 'react-native-toast-message'

const Page = (): JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const recipeId = parseInt(id)
  const { token } = useSession()
  const recipes = useRecipeStore((state) => state.recipes)
  const queryClient = useQueryClient()
  const [error, setError] = React.useState<string | null>(null)
  const errorToast = (error: string | null): void => {
    Toast.show({
      type: 'error',
      text1: 'Could not add recipe to shopping list',
      text2: error ?? 'An error occurred',
      position: 'top',
      visibilityTime: 3000,
      topOffset: 60,
    })
  }

  const successToast = (): void => {
    Toast.show({
      type: 'success',
      text1: 'Recipe added to shopping list',
      position: 'top',
      visibilityTime: 3000,
      topOffset: 60,
    })
  }

  const recipeData: Recipe | undefined = recipes.find(
    (recipe) => recipe.id === recipeId
  )
  const { mutate } = useMutation({
    mutationFn: async () => await addRecipeToSL(token, recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchShoppingList'],
      })
      successToast()
      router.push('/(app)')
    },
    onError: (error: any) => {
      errorToast(error.message)
    },
  })

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipeData.image_url }} style={styles.image} />
      <ScrollView style={styles.instructions}>
        <Text style={styles.instructionsText}>{recipeData.instructions}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          mutate(token, recipeId)
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

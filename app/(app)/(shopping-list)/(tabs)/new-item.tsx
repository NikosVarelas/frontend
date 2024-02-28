import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/context/ctx'
import { fetchShoppingList } from '@/clients/shopping-list'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useRecipeStore } from '@/store/recipeStore'
import Toast from 'react-native-toast-message'

const modal = (): JSX.Element => {
  const queryClient = useQueryClient()
  const { token } = useSession()
  const { itemId } = useLocalSearchParams()
  const [hasChanged, setHasChanged] = useState(false)
  const recipes = useRecipeStore((state) => state.recipes)
  const query = useQuery({
    queryKey: ['fetchShoppingList'],
    queryFn: async () => await fetchShoppingList(token),
    refetchOnMount: false,
  })

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

  const ingredient = query.data?.ingredients.find(
    (ingredient) => ingredient.id === parseInt(itemId)
  )
  const [ingredientName, setIngredientName] = useState(ingredient?.name)
  const [ingredientMeasure, setIngredientMeasure] = useState(
    ingredient?.measure
  )

  const recipeData = recipes.find(
    (recipe) => recipe.id === ingredient?.recipe_id
  )

  const { mutate } = useMutation({
    mutationFn: async () => await updateIngredient(token, ingredient?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // Use the queryClient
        queryKey: ['fetchShoppingList'],
      })
      successToast()
      router.push('/(app)')
    },
    onError: (error: any) => {
      errorToast(error.message)
    },
  })

  const onChangeHandler = (input: string, key: string): void => {
    if (input.trim().length > 0) {
      setHasChanged(true)
    } else {
      setHasChanged(false)
    }
    if (key === 'name') {
      setIngredientName(input)
    } else {
      setIngredientMeasure(input)
    }
  }

  const onSaveHandler = (): void => {
    console.log('Save')
  }

  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Add new ingredient!"
          defaultValue={ingredientName}
          onChange={(e) => {
            onChangeHandler(e.nativeEvent.text, 'name')
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Add measure!"
          defaultValue={ingredientMeasure}
          onChange={(e) => {
            onChangeHandler(e.nativeEvent.text, 'measure')
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'space-between',
            justifyContent: 'center',
            alignContent: 'space-between',
            margionTop: 10,
          }}
        >
          <TouchableOpacity
            style={[styles.disabledButton, hasChanged && styles.saveButton]}
            onPress={onSaveHandler}
            disabled={!hasChanged}
          >
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              router.back()
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.recipeContainer}>
        <TouchableOpacity>
          <Image
            source={{ uri: recipeData?.image_url }}
            style={styles.recipeImage}
          />
        </TouchableOpacity>
        <Text>{recipeData?.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'white',
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: 'grey',
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
  },
  deleteButton: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputAccessoryViewText: {
    color: 'blue',
  },
  recipeContainer: {
    borderTopColor: 'black',
    borderTopWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeImage: {
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.1,
    marginLeft: 10,
  },
})

export default modal

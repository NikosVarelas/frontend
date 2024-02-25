import React, { useEffect, useState } from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { useSession } from '@/context/ctx'
import { FlatList } from 'react-native-gesture-handler'
import ShoppingItem from '@/components/ShoppingItem'
import { useShoppingListStore } from '@/store/shoppingListStore'
import { router, useNavigation } from 'expo-router'
import AddIngredientForm from '@/components/AddShoppingItem'
import { type Ingredient } from '@/models/Recipe'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  deleteShoppingList,
  updateShoppingList,
} from '@/clients/shopping-list'
import { type ShoppingList } from '@/models/ShoppingList'

export default function Page(): JSX.Element {
  const { token } = useSession()
  const loading = useShoppingListStore((state) => state.loading)
  const [listKey, setListKey] = useState(0)
  const navigation = useNavigation()
  const [changed, setChanged] = useState(false)
  const queryClient = useQueryClient()
  const data: ShoppingList | undefined = queryClient.getQueryData(['fetchShoppingList', token])
  const [ingredientList, setIngredientList] = useState<Ingredient[]>(
    data?.ingredients ?? []
  )

  const updateMutation = useMutation({
    mutationFn: async (ingredientList: Ingredient[]) => {
      let data
      if (ingredientList.length > 0) {
        data = await updateShoppingList(token, ingredientList)
      } else {
        await deleteShoppingList(token)
        data = {
          ingredients: [],
        }
      }
      return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['fetchShoppingList', token], data)
      router.push('/page')
    },
    onError: () => {
      Alert.alert('Could not save shopping list')
    },
  })

  const handleAddIngredient = (newIngredient: Ingredient): void => {
    setIngredientList((prevList: Ingredient[] | undefined) => {
      if (prevList != null) {
        return [...prevList, newIngredient];
      } else {
        return [newIngredient];
      }
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      const hasChanges = !arraysAreEqual(
        ingredientList,
        data?.ingredients ?? [] as Ingredient[]
      )
      if (hasChanges) {
        e.preventDefault()
        showAlert(e.data.action)
      }
    })

    return unsubscribe
  }, [ingredientList, data?.ingredients ?? []])

  useEffect(() => {
    const hasChanges = !arraysAreEqual(
      ingredientList,
      data?.ingredients ?? [] as Ingredient[]
    )
    setChanged(hasChanges)
  }, [ingredientList, data?.ingredients ?? []])

  const arraysAreEqual = (arr1: Ingredient[], arr2: Ingredient[]): boolean => {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false
    }
    return true
  }

  const showAlert = (action: string): void => {
    Alert.alert(
      'Unsaved Changes',
      'You have unsaved changes. Are you sure you want to go back?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.dispatch(action)
          },
        },
      ]
    )
  }

  const handleDelete = (index: number): void => {
    setIngredientList((prev) => {
      const newList = [...prev]
      newList.splice(index, 1)
      return newList
    })
    setListKey((prevKey) => prevKey + 1)
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: Ingredient
    index: number
  }): JSX.Element => (
    <ShoppingItem
      item={item}
      index={item.id}
      onDelete={() => {
        handleDelete(index)
      }}
    />
  )

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 10,
          borderBottomWidth: 2,
          borderColor: 'gray',
        }}
      >
        <AddIngredientForm onAdd={handleAddIngredient} />
        {changed && (
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                updateMutation.mutate(ingredientList)
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ flex: 1, marginTop: 8 }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
          />
        ) : (
          <>
            <FlatList
              key={listKey}
              data={ingredientList}
              horizontal={false}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    marginBottom: 20,
  },
  listContainer: {
    marginTop: 5,
    borderColor: 'grey',
    padding: 6,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  itemName: {
    fontSize: 20,
  },
  itemMeasure: {
    marginLeft: 10,
  },
  itemText: {
    color: 'white',
    flexDirection: 'row',
    flex: 1,
    fontSize: 20,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 100,
    marginRight: 100,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
})

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
import { type Ingredient } from '@/models/Recipe'
import { useNavigation } from 'expo-router'
import AddIngredientForm from '@/components/AddShoppingItem'

export default function Page(): JSX.Element {
  const { token } = useSession()
  const data = useShoppingListStore((state) => state.ingredients)
  const [ingredientList, setIngredientList] = useState<Ingredient[]>(data)
  const loading = useShoppingListStore((state) => state.loading)
  const replaceShoppingList = useShoppingListStore((state) => state.replace)
  const [listKey, setListKey] = useState(0)
  const navigation = useNavigation()
  const [changed, setChanged] = useState(false)

  const handleAddIngredient = (newIngredient: Ingredient): void => {
    setIngredientList((prevList) => [...prevList, newIngredient])
  }

  const handleSave = (ingredientList: Ingredient[]): void => {
    console.log(ingredientList)
    replaceShoppingList(ingredientList)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      const hasChanges = !arraysAreEqual(ingredientList, data)
      if (hasChanges) {
        e.preventDefault()
        showAlert(e.data.action)
      }
    })

    return unsubscribe
  }, [ingredientList, data])

  useEffect(() => {
    const hasChanges = !arraysAreEqual(ingredientList, data)
    setChanged(hasChanges)
  }, [ingredientList, data])

  const arraysAreEqual = (arr1: Ingredient[], arr2: Ingredient[]): boolean => {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false
    }
    return true
  }

  const showAlert = (action: any): void => {
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
      index={index}
      onDelete={() => {
        handleDelete(index)
      }}
    />
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
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
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        <AddIngredientForm onAdd={handleAddIngredient} />
        {changed && (
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                handleSave(ingredientList)
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    borderColor: 'grey',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  itemName: {},
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
    marginTop: 100,
    marginBottom: 100,
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

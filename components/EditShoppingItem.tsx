// AddIngredientForm.tsx

import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { EvilIcons } from '@expo/vector-icons'
import { useSession } from '@/context/ctx'
import { useQuery } from '@tanstack/react-query'
import { fetchShoppingList } from '@/clients/shopping-list'

interface EditShoppingItemFormProps {
  ingredientId: string
}

const EditShoppingItem: React.FC<EditShoppingItemFormProps> = ({
  ingredientId,
}) => {
  const { token } = useSession()
  const { data } = useQuery({
    queryKey: ['fetchShoppingList'],
    queryFn: async () => await fetchShoppingList(token),
    refetchOnMount: false,
  })
  const ingredient = data?.ingredients.find(
    (ingredient) => ingredient.id === parseInt(ingredientId)
  )
  console.log(ingredientId)
  const [ingredientName, setIngredient] = useState(ingredient?.name)
  const [measureName, setMeasure] = useState(ingredient?.measure)

  return (
    <View style={styles.container}>
      <View style={styles.ingredientInput}>
      <TextInput
        style={styles.input}
        placeholder="Enter new ingredient"
        value={ingredientName}
        onChangeText={setIngredient}
      />
      </View>
      <View style={styles.measureInput}>
      <TextInput
        style={styles.input}
        placeholder="Enter measure"
        value={measureName}
        onChangeText={setMeasure}
      />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { console.log('pressed'); }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => { console.log('pressed'); }}
        >
          <EvilIcons name="trash" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  ingredientInput: {
    marginBottom: 10,
    height: Dimensions.get('window').height * 0.05,
  },
  measureInput: {
    height: Dimensions.get('window').height * 0.05,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashButton: {
    marginLeft: 10,
  },
})

export default EditShoppingItem

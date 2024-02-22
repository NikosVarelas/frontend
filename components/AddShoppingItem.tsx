// AddIngredientForm.tsx

import React, { useState } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { type Ingredient } from '@/models/Recipe'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons';


interface AddIngredientFormProps {
  onAdd: (ingredient: Ingredient) => void
}

const AddIngredientForm: React.FC<AddIngredientFormProps> = ({ onAdd }) => {
  const [ingredient, setIngredient] = useState('')
  const [measure, setMeasure] = useState('')

  const handleAddIngredient = (): void => {
    if (ingredient.trim().length > 0 && measure.trim().length > 0) {
      const newIngredient: Ingredient = {
        name: ingredient.trim(),
        measure: measure.trim(),
      }
      onAdd(newIngredient)
      setIngredient('')
      setMeasure('')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter new ingredient"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter measure"
        value={measure}
        onChangeText={setMeasure}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddIngredient}>
      <FontAwesome name="plus-square-o" size={26} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 5
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default AddIngredientForm

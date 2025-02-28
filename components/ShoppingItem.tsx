import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const ShoppingItem: React.FC<Prop> = ({ item, onDelete, index }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState(item.name)
  const [measure, setMeasure] = useState(item.measure)

  const toggleEdit = (): void => {
    setIsChecked(!isChecked)
  }

  const handleDelete = (): void => {
    onDelete(index)
  }

  return (
    <View>
      <View style={styles.itemContainer}>
        <View style={styles.itemText}>
          <TextInput
            style={styles.itemName}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.itemMeasure}
            value={measure}
            onChangeText={setMeasure}
          />
        </View>
        <TouchableOpacity onPress={handleDelete}>
          <FontAwesome name="trash" size={26} color="red" />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 4 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOpacity: 0.2
  },
  itemName: {
    fontSize: 18
  },
  itemMeasure: {
    marginLeft: 10,
    fontSize: 18
  },
  itemText: {
    color: 'white',
    flexDirection: 'row',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ShoppingItem

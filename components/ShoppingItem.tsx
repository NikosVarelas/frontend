import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const ShoppingItem: React.FC<Prop> = ({ item, onDelete, index }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState(item.name)
  const [measure, setMeasure] = useState(item.measure)

  const toggleEdit = (): void => {
    setIsChecked(!isChecked)
  }

  const handleDelete = (): void => {
    console.log(index)
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
        <TouchableOpacity style={styles.editButton} onPress={handleDelete}>
          <FontAwesome name="trash" size={26} color="red" />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 4 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    borderColor: 'grey',
  },
  itemContainer: {
    backgroundColor: 'white',
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
  editButton: {
    color: 'green',
    borderWidth: 0.2,
  },
})

export default ShoppingItem

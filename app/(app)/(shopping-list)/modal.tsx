import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
} from 'react-native'
import { fetchSLData } from '@/store/shopping-list'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from '@/context/ctx'
import { type StoreState } from '@/store'
import { type Dispatch } from 'redux'
import { FlatList } from 'react-native-gesture-handler'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

let isInitial = true
export default function Page(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch()
  const { token } = useSession()
  const data = useSelector(
    (state: StoreState) => state.shoppingList.ingredients
  )
  const loading = useSelector((state: StoreState) => state.shoppingList.loading)

  useEffect(() => {
    if (isInitial) {
      dispatch(fetchSLData(token))
      isInitial = false
    }
  }, [dispatch, token])

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={({ item }) => <ShoppingItem item={item} />}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  )
}

const ShoppingItem: React.FC<Prop> = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState(item.name)
  const [measure, setMeasure] = useState(item.measure)

  const toggleCheck = (): void => {
    setIsChecked(!isChecked)
  }

  return (
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
      <TouchableOpacity style={styles.editButton}>
      </TouchableOpacity>
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

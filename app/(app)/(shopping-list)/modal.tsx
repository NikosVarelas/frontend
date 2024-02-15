import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
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

  const toggleCheck = (): void => {
    setIsChecked(!isChecked)
  }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemText}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemMeasure}>{item.measure}</Text>
      </View>
      <BouncyCheckbox
        size={25}
        fillColor="green"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: 'green', borderRadius: 4 }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
        onPress={(isChecked: boolean) => {}}
      />
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
})

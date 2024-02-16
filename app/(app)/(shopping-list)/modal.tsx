import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { fetchSLData } from '@/store/shopping-list'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from '@/context/ctx'
import { type StoreState } from '@/store'
import { type Dispatch } from 'redux'
import { FlatList } from 'react-native-gesture-handler'
import ShoppingItem from '@/components/ShoppingItem'

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
    <View style={{flex:1}}>
      <View style={{flex: 1}}>
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
      <View style={{flex:1}}>
        <Text> Test </Text>
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
  editButton: {
    color: 'green',
    borderWidth: 0.2,
  },
})

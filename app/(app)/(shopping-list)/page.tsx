import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useSession } from '@/context/ctx'
import { FlatList } from 'react-native-gesture-handler'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useShoppingListStore } from '@/store/shoppingListStore'

let isInitial = true

export default function Page(): JSX.Element {
  const { token } = useSession()
  const data = useShoppingListStore((state) => state.ingredients)
  const loading = useShoppingListStore((state) => state.loading)
  const fetchShoppingList = useShoppingListStore(
    (state) => state.fetchShoppingList
  )

  useEffect(() => {
    if (isInitial) {
      fetchShoppingList(token)
      isInitial = false
    }
  }, [fetchShoppingList, token])

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

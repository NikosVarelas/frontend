import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useSession } from '@/context/ctx'
import { FlatList } from 'react-native-gesture-handler'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useShoppingListStore } from '@/store/shoppingListStore'

let isInitial = true

export default function Page(): JSX.Element {
  const { token } = useSession()
  const data = useShoppingListStore((state) => state.shoppingList)
  const loading = useShoppingListStore((state) => state.loading)
  const fetchShoppingList = useShoppingListStore(
    (state) => state.fetchShoppingList
  )

  useEffect(() => {
    if (isInitial) {
      void fetchShoppingList(token)
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
            renderItem={({ item }) => (
              <ShoppingItem item={item} index={item.ingredient.id} />
            )}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  )
}

interface ShoppingItemProp {
  item: {
    ingredient: {
      id: number
      name: string
      measure: string
    }
    isChecked: boolean
  }
}

const ShoppingItem: React.FC<ShoppingItemProp> = ({ item }) => {
  const setItemChecked = useShoppingListStore((state) => state.setItemChecked)

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemText}>
        <Text style={styles.itemName}>{item.ingredient.name}</Text>
        <Text style={styles.itemMeasure}>{item.ingredient.measure}</Text>
      </View>
      <BouncyCheckbox
        size={25}
        fillColor="green"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: 'green', borderRadius: 4 }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
        isChecked={item.isChecked}
        onPress={(isChecked: boolean) => {
          setItemChecked(item.ingredient.id, isChecked)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 5,
    borderColor: 'grey',
    padding: 6,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontFamily: 'space-mono',
  },
  itemMeasure: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: 'space-mono',
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

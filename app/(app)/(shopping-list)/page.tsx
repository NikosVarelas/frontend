import React from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useSession } from '@/context/ctx'
import { FlatList } from 'react-native-gesture-handler'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useShoppingListStore } from '@/store/shoppingListStore'
import { useQuery } from '@tanstack/react-query'
import { fetchShoppingList } from '@/clients/shopping-list'
import { type Ingredient } from '@/models/Recipe'

export default function Page(): JSX.Element {
  const { token } = useSession()
  const query = useQuery({
    queryKey: ['fetchShoppingList', token],
    queryFn: async () => await fetchShoppingList(token),
  })

  // Accessing checkedItems state from the store
  const checkedItems = useShoppingListStore((state) => state.checkedItems)
  const setItemChecked = useShoppingListStore((state) => state.setItemChecked)

  const handleToggleItem = (id: number, isChecked: boolean): void => {
    setItemChecked(id, isChecked)
  }

  return (
    <View style={styles.container}>
      {(query.isLoading as boolean) ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <FlatList
          data={query.data?.ingredients ?? []}
          renderItem={({ item }) => (
            <ShoppingItem
              item={item}
              isChecked={checkedItems.some(
                (checkedItem) => checkedItem.id === item.id
              )}
              onToggleItem={handleToggleItem}
            />
          )}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  )
}

interface ShoppingItemProps {
  item: Ingredient
  isChecked: boolean
  onToggleItem: (id: number, isChecked: boolean) => void
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  item,
  isChecked,
  onToggleItem,
}) => {
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
        isChecked={isChecked}
        onPress={(isChecked: boolean) => {
          onToggleItem(item.id, isChecked)
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
    flex: 1,
    justifyContent: 'center',
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

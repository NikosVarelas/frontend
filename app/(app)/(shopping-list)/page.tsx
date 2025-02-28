import React from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { useSession } from '@/context/ctx'
import { FlatList } from 'react-native-gesture-handler'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useShoppingListStore } from '@/store/shoppingListStore'
import { useQuery } from '@tanstack/react-query'
import { fetchShoppingList } from '@/clients/shopping-list'
import { type Ingredient } from '@/models/Recipe'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'

export default function Page(): JSX.Element {
  const { token } = useSession()
  const query = useQuery({
    queryKey: ['fetchShoppingList'],
    queryFn: async () => await fetchShoppingList(token),
    refetchOnMount: false,
  })

  // Accessing checkedItems state from the store
  const checkedItems = useShoppingListStore((state) => state.checkedItems)
  const setItemChecked = useShoppingListStore((state) => state.setItemChecked)

  const handleToggleItem = (id: number, isChecked: boolean): void => {
    setItemChecked(id, isChecked)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            router.push('/(app)')
          }}
        >
          <Ionicons name="home" size={26} />
        </TouchableOpacity>

        <Feather name="settings" size={26} color="black" />
      </View>
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
      <View style={styles.itemText}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemMeasure}>{item.measure}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            router.push('/(app)/(shopping-list)/(modal)/edit-ingredient')
          }}
        >
          <Feather name="edit" size={26} color="black" />
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    marginBottom: 10,
    height: Dimensions.get('window').height * 0.1,
    backgroundColor: 'green',
  },
  homeButton: {
    padding: 10
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

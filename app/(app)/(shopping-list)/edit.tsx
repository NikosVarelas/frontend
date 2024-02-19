import React, { useState } from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useSession } from '@/context/ctx'
import { FlatList } from 'react-native-gesture-handler'
import ShoppingItem from '@/components/ShoppingItem'
import { useShoppingListStore } from '@/store/shoppingListStore'
import { type Ingredient } from '@/models/Recipe'


export default function Page(): JSX.Element {
  const { token } = useSession()
  const data = useShoppingListStore((state) => state.ingredients)
  const ingredientList = useState<Ingredient[]>(data)
  const loading = useShoppingListStore((state) => state.loading)
  const deleteItem = useShoppingListStore((state) => state.deleteItem);

  const renderItem = ({ item, index }: { item: Ingredient; index: number }): JSX.Element => (
    <ShoppingItem item={item} index={index} onDelete={() => { deleteItem(index); }} />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
          </>
        )}
      </View>
      <View style={{ flex: 1 }}>
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

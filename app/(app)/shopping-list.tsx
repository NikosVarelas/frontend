import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchSLData } from '@/store/shopping-list';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from '@/context/ctx';
import { FlashList } from '@shopify/flash-list';
import { type StoreState } from '@/store';
import { type Dispatch} from 'redux'


export default function Page(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const { token } = useSession();
  const data = useSelector((state: StoreState) => state.shoppingList.ingredients);
  const loading = useSelector((state: StoreState) => state.shoppingList.loading);

  useEffect(() => {
    dispatch(fetchSLData(token));
  }, [dispatch, token]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <ShoppingItem item={item} />
            )}
            contentContainerStyle={styles.listContainer}
            estimatedItemSize={116}
          />
        </>
      )}
    </View>
  );
}

const ShoppingItem: React.FC<Prop> = ({ item }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const toggleCheck = (): void => {
      setIsChecked(!isChecked);
    };
  
    return (
      <TouchableOpacity onPress={toggleCheck}>
        <View style={styles.itemContainer}>
          <View style={[styles.circle, isChecked && styles.checkedCircle]} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeasure}>{item.measure}</Text>
        </View>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'blue',
    marginRight: 10,
  },
  checkedCircle: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: 'white',
  },
  itemName: {
    fontSize: 16,
    marginRight: 5,
  },
  itemMeasure: {
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 10, // Example padding related prop
    backgroundColor: 'white', // Example backgroundColor prop
  },
});

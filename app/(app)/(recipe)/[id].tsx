import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleAddtoBasket = (id: string) => {
    console.log(`Added to basket recipe ${id}`);
  };

  return (
    <View>
      <Text>Recipe: {id}</Text>
      <Pressable style={styles.button} onPress={() => handleAddtoBasket(id)}>
        <FontAwesome name="shopping-basket" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Add to basket</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    marginRight: 5, // Add spacing between the icon and text
  },
});

export default Page;

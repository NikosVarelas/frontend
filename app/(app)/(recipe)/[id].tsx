import React from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { axiosRequest } from '@/constants/axiosRequest';
import { useSession } from '@/context/ctx';
import { endpoints } from '@/constants/endpoint';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {token} = useSession();

  const handleAddtoBasket = (id: string) => {
    console.log(`Added to basket recipe ${id}`);
  };

  const handleDeleteRecipeYes = async (id: string) => {
        const [_, err] = await axiosRequest('DELETE', token, endpoints.deleteRecipe + `/${id}`);
        if (err) {
            console.log(err);
        }
};


  const handleDeleteRecipe = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete the recipe?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Perform delete action here
            handleDeleteRecipeYes(id)
            router.push('/(app)')
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  return (
    <View>
      <Text>Recipe: {id}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddtoBasket(id)}>
        <FontAwesome name="shopping-basket" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Add to basket</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleDeleteRecipe(id)}>
        <FontAwesome name="trash" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Delete recipe</Text>
      </TouchableOpacity>
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
    marginTop: 100
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

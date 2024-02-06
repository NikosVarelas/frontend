import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const NewRecipeForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied for accessing media library');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== '') {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleSubmit = () => {
    // Add your logic to handle the submission of the new recipe
    console.log('Recipe Name:', name);
    console.log('Recipe Description:', description);
    console.log('Recipe Ingredients:', ingredients);
    console.log('Recipe Image:', image);
  };

  return (
    <ScrollView style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Pick an Image" onPress={pickImage} />

      <Text style={styles.label}>Recipe Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Recipe Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Ingredients:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredient"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <Button title="Add Ingredient" onPress={handleAddIngredient} />

      <Text style={styles.label}>Ingredient List:</Text>
      {ingredients.map((item, index) => (
        <Text key={index} style={styles.ingredientItem}>
          {item}
        </Text>
      ))}

      <Button title="Submit Recipe" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  ingredientItem: {
    fontSize: 14,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
});

export default NewRecipeForm;

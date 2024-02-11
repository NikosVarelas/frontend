import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSession } from '@/context/ctx'
import { type Recipe, type Ingredient } from '@/clients/recipe-client'
import { axiosRequest } from '@/constants/axiosRequest'
import { endpoints } from '@/constants/endpoint'
import { router } from 'expo-router'

const NewRecipeForm = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ingredient, setIngredient] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const { token } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddIngredient = () => {
    if (ingredient) {
      const ingrQuanitity: Ingredient = {
        name: ingredient,
        quantity: 'test',
        quantity_type: 'test'
      }
      setIngredients([...ingredients, ingrQuanitity])
      setIngredient('')
    }
  };

  const handleSubmit = async () => {
    if (name && ingredients.length > 0) {
      setLoading(true)
      const requestData: Recipe = {
        name: name,
        description: description,
        image_url: image ? image : '',
        ingredients: ingredients,
      };
      try {
        const [data, err] = await axiosRequest('POST', token, endpoints.createRecipe, requestData)
        if (err) {
          throw new Error(err);
        }
        router.push('/(app)');
        setName('');
        setDescription('');
        setIngredients([]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (!name) {
        Alert.alert("Name can't be empty!");
      } else {
        Alert.alert('Please specify ingredients!');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Pick an Image" onPress={pickImage} />
      </View>

      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Recipe Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter recipe description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Ingredients</Text>
      <View style={styles.ingredientInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ingredient"
          value={ingredient}
          onChangeText={setIngredient}
        />
        <Button title="Add Ingredient" onPress={handleAddIngredient} />
      </View>

      <Text style={styles.label}>Ingredient List</Text>
      <ScrollView style={styles.ingredientListContainer}>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredientItem}>
            {item.name}: {item.quantity} {item.quantity_type}
          </Text>
        ))}
      </ScrollView>

      <Button title="Submit Recipe" onPress={handleSubmit} />

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  multilineInput: {
    height: 80,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  ingredientInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ingredientListContainer: {
    maxHeight: 120,
    marginBottom: 16,
  },
  ingredientItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewRecipeForm;

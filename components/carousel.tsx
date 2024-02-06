import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const Carousel = () => {
  const data = [
    { id: '1', image: require('./images/image1.jpg'), text: 'Item 1' },
    { id: '2', image: require('./images/image2.jpg'), text: 'Item 2' },
    { id: '3', image: require('./images/image3.jpg'), text: 'Item 3' },
    // Add more items as needed
  ];

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(recipe)/${item.id}`)}>
            <View style={styles.item}>
              <Image source={item.image} style={styles.image}/>
              <Text>{item.text}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 250
  },
  list: {
    marginBottom: 100
  },
  item: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '80%', // Adjust the height based on your preference
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default Carousel;

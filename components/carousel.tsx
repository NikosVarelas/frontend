import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const Carousel = (props) => {

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={props.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/(recipe)/${item.id}`)}>
            <View style={styles.item}>
              {/* <Image source={item.name} style={styles.image}/> */}
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 100
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

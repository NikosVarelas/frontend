import React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { router } from 'expo-router'

const Carousel = (props: { data: ArrayLike<any> | null | undefined }): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={props.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{width:200, height: 200, margin: 8}}
            onPress={() => {
              router.push(`/(recipe)/${item.id}`)
            }}
          >
            <View style={styles.item}>
              {/* <Image source={item.name} style={styles.image}/> */}
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  list: {
    marginBottom: 0
  },
  item: {
    fontWeight: 'bold',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 8,
    borderRadius: 10
  },
  image: {
    borderRadius: 10,
    marginBottom: 0
  }
})

export default Carousel

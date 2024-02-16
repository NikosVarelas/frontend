import React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { router } from 'expo-router'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'

const Carousel = (props: {
  data: ArrayLike<any> | null | undefined
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={props.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={{ width: 200, height: 200, margin: 8 }}
              onPress={() => {
                router.push(`/(recipe)/${item.id}`)
              }}
            >
              <View style={styles.item}>
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.itemName}>
              <Text>
                {item.name.length > 20
                  ? `${item.name.slice(0, 20)}...`
                  : item.name}
              </Text>
            </View>
          </View>
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
    marginBottom: 0,
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
    borderRadius: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  itemName: {
    marginTop: 10,
    fontStyle: 'italic',
  },
})

export default Carousel

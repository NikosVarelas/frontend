import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import EditShoppingItem from '@/components/EditShoppingItem'
import { router, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const EditModal = (): JSX.Element => {
  const { itemId }: { itemId: string } = useLocalSearchParams()
  console.log(itemId)
  return (
    <View style={styles.container}>
      <EditShoppingItem ingredientId={itemId} />
      <View style={styles.btnFooter}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => {
              router.back()
            }}
          >
            <Text style={styles.footerText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              router.back()
            }}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  btnFooter: {
    position: 'absolute',
    bottom: 0,
    height: Dimensions.get('window').height * 0.1,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -10 },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: 90,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 16,
    height: 50,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
}

export default EditModal

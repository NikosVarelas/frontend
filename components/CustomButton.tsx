import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type TouchableOpacityProps
} from 'react-native'

interface CustomButtonProps extends TouchableOpacityProps {
  title: string
  onPress: () => void
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 100,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 100,
    marginRight: 100
  }
})

export default CustomButton

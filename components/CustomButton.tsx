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
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
    marginBottom: 200
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})

export default CustomButton

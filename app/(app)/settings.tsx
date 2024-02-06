import CustomButton from '@/components/CustomButton'
import { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function Page() {
    const [isPressed, setIsPressed] = useState(false)

    return (
        <View>
            <CustomButton
                title="Press me"
                onPress={() => setIsPressed(true)}
            />
            {isPressed && (
                <Image
                    style={styles.image}
                    source={require('../../assets/images/georgia.jpeg')} 
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 400,  // Adjust width according to your requirements
        height: 300, // Adjust height according to your requirements
        resizeMode: 'center', // Adjust resizeMode according to your requirements
    },
});

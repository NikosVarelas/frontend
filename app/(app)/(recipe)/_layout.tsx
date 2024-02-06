import { Stack, router } from "expo-router";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{
                title: "Recipe",
                headerLeft: () => (
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={26} />
                    </Pressable>
                ),
                headerStyle: {
                    backgroundColor: 'green',
                },
                headerTintColor: 'white', 
            }}>
            </Stack.Screen>
        </Stack>
    )
}

export default Layout;

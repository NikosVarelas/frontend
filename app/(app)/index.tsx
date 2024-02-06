import { View } from 'react-native';

import { useSession } from '@/context/ctx';
import Carousel from '@/components/carousel';
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router';

export default function Index() {
  const { signOut } = useSession();
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Carousel/>
      <CustomButton 
        title="Sign Out"
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </CustomButton>
    </View>
  );
}

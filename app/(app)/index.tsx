import { View, ActivityIndicator } from 'react-native';

import { useSession } from '@/context/ctx';
import Carousel from '@/components/carousel';
import CustomButton from '@/components/CustomButton';
import { axiosRequest } from '@/constants/axiosRequest';
import { endpoints } from '@/constants/endpoint';
import useFetch from '@/hooks/useFetch';

export default function Index() {
  const { signOut, token } = useSession();
  const { data, loading, error } = useFetch('GET', endpoints.getAllRecipes, token);
  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    if (data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Carousel data={data}/>
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
}
}
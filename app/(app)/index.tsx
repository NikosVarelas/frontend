import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch} from 'react-redux'

import { useSession } from '@/context/ctx';
import Carousel from '@/components/carousel';
import CustomButton from '@/components/CustomButton';
import { endpoints } from '@/constants/endpoint';
import useFetch from '@/hooks/useFetch';
import { useEffect } from 'react';
import { fetchRecipeData } from '@/store/recipes';

export default function Index() {
  const { signOut, token } = useSession()
  const data = useSelector(state => state.recipes);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRecipeData(token))
  }, [dispatch])

  if (!data) {
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
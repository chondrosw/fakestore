/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}



const Stack = createNativeStackNavigator();

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: Rating;
};

type Rating = {
  rate: number;
  count: number;
};

function App(): JSX.Element {
  const [dataSource, setDataSource] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getProducts = async() => {
    try{
      const response = await fetch('https://fakestoreapi.com/products')
      const json = await response.json();
      setDataSource(json)
    } catch (error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=> {
    getProducts();
  },[]);

  function HomeScreen() {
    return (
        <View style={{ flex: 1, padding: 12  }}>
        { isLoading ? (<ActivityIndicator/>) : 
        (
          <FlatList
          data = {dataSource}
          numColumns={2}
          renderItem={ ({item}) => (
            <View style = {{  backgroundColor: '#ffffff',
            borderRadius: 10,
            borderWidth: 1, padding:8, width:160,margin: 12,alignItems:'center',alignContent:'center'}}>
              <Image source={{uri:item.image}} style={{width:120,height:120,resizeMode: 'contain',alignItems:'center',alignContent:'center'}}/>
              <Text style={{marginVertical:8}} numberOfLines={2} ellipsizeMode={"tail"}>
                {item.title}
              </Text>
              <View>
                <Text style={{marginVertical:8}} numberOfLines={1}>
                  Rating {item.rating.rate}
                </Text>
              </View>
            </View>
          )}
          />
        )}
      </View>
    );
  }

  const createThreeButtonAlert = () =>
  Alert.alert('Info mas e', 'Apakah kamu menginginkan saya?', [
    {
      text: 'Saya pikir-pikir dulu',
      onPress: () => console.log('Ask me later pressed'),
    },
    {
      text: 'Boleh',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Tidak donk', onPress: () => console.log('OK Pressed')},
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{
          title:"Chondro",
          headerBackTitle:"Back",
          headerRight:() => {
            return (<Button
              onPress={() => createThreeButtonAlert()}
              title="Info"
              color="#000"
            />)
          },
          
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
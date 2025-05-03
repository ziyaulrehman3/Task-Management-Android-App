import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View className="w-full flex justify-center items-center h-full gap-12">
      <Text className="text-3xl font-bold">Welcome to To-Do App</Text>
      <Pressable
        onPress={() => navigation.navigate('List')}
        className="bg-blue-800 w-48 h-16 rounded-full flex justify-center items-center">
        <Text className="text-white text-2xl font-bold">Get Start</Text>
      </Pressable>
    </View>
  );
}

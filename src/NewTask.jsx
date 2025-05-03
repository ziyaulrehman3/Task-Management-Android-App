import {View, Text, Pressable, TextInput} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewTask() {
  const navigation = useNavigation();

  const [newTask, setNewTask] = useState('');

  const localStorageFun = async () => {
    try {
      if (newTask.trim()) {
        const currentList = await AsyncStorage.getItem('todolist');
        const list = currentList != null ? JSON.parse(currentList) : [];
        const newList = [...list, {task: newTask, status: false}];
        const newList2 = JSON.stringify(newList);
        await AsyncStorage.setItem('todolist', newList2);
      }

      navigation.navigate('List');
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View className="p-4 h-full flex  justify-between">
      <View className="flex gap-8">
        <Text className="text-5xl font-bold">New Task</Text>

        <Pressable className="bg-black h-16 w-36 rounded-full flex justify-center items-center">
          <Text className="text-white text-2xl font-semibold ">Today</Text>
        </Pressable>

        <View className="flex gap-3">
          <Text className="text-gray-400">TITLE</Text>

          <TextInput
            value={newTask}
            onChangeText={text => setNewTask(text)}
            className="border-2 border-gray-300  h-16 w-full font-bold mx-auto rounded-full text-black text-2xl placeholder:text-gray-300 placeholder:text-xl px-3"
            placeholder="Write here Task"
          />
        </View>
      </View>

      <Pressable
        onPress={() => {
          localStorageFun();
        }}
        className="w-full rounded-full h-16 mx-auto flex justify-center items-center bg-black">
        <Text className="text-white text-2xl font-bold">Create</Text>
      </Pressable>
    </View>
  );
}

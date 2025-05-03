import {View, Text, Image, Button, Pressable, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function List() {
  const navigation = useNavigation();

  const [list, setList] = useState([]);
  const [noOfTask, setNoOfTask] = useState('0/0');

  const TestData = async () => {
    try {
      const fetchData = await AsyncStorage.getItem('todolist');
      const data = fetchData != null ? JSON.parse(fetchData) : [];
      setList(data);

      let marked = 0;

      data.map(item => {
        if (item.status) {
          marked++;
        }
      });

      setNoOfTask(`${marked} / ${data.length}`);
    } catch (err) {
      console.log(err);
    }
  };

  const TickMark = async index => {
    try {
      console.log('Hello');

      const list = await AsyncStorage.getItem('todolist');

      const listData = JSON.parse(list);
      const newList = listData[index];
      newList.status = !newList.status;
      let currentList = [...listData];
      currentList[index] = newList;
      setList(currentList);

      const finalList = JSON.stringify(currentList);
      await AsyncStorage.setItem('todolist', finalList);

      let marked = 0;

      currentList.map(item => {
        if (item.status) {
          marked++;
        }
      });

      setNoOfTask(`${marked} / ${currentList.length}`);
    } catch (err) {
      console.log(err);
    }
  };

  const EmptyList = async () => {
    try {
      await AsyncStorage.setItem('todolist', '');
      TestData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    TestData();
  }, []);

  return (
    <View className="w-full h-full">
      <View className="w-full h-[35%] relative">
        <Image
          source={require('./bg.jpg')}
          className="h-full w-full object-cover rounded-b-[40px]"
        />

        <View className="absolute top-2 right-2 h-16  flex flex-row gap-4">
          <Pressable onPress={EmptyList} className="">
            <Image
              className="h-12 w-12 "
              source={require('./images/reset.png')}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Home')}>
            <Image
              className="h-12 w-12"
              source={require('./images/home.png')}
            />
          </Pressable>
        </View>

        <Text className="leading-tight text-6xl font-bold w-[40%] absolute top-4 left-2 text-white">
          Daily Tasks
        </Text>

        <View className="absolute bottom-10 left-3">
          <Text className="text-4xl font-bold text-white">{noOfTask}</Text>
          <Text className="text-2xl text-white">tasks</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate('NewTask')}
          className=" z-10 absolute -bottom-10 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-gray-200 flex justify-center items-center">
          <Text className="text-[50px] text-center">+</Text>
        </Pressable>
      </View>

      <ScrollView className="w-full">
        <View className="w-[90%] mx-auto pt-12">
          {list.map((item, index) => {
            return (
              <View
                key={index}
                className="flex flex-row items-center gap-3 w-full pb-4">
                <Pressable onPress={() => TickMark(index)}>
                  <Text
                    className={`w-12 h-12 border-2 border-gray-400 rounded-full text-white text-4xl text-center items-center ${
                      item.status ? 'bg-gray-400 ' : 'bg-white'
                    }`}>
                    ✔
                  </Text>
                </Pressable>

                <Text
                  className={`text-4xl font-bold ${
                    item.status ? 'line-through' : ''
                  }`}>
                  {item.task}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

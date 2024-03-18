import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Dimensions, Pressable } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { useColorScheme } from 'nativewind';
import { useTailwind } from 'tailwind-rn';

const App = () => {
  const tailwind = useTailwind();
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Function to handle adding new data
  const handleAddData = () => {
    setData(prevData => [...prevData, { x: inputText, y: parseInt(inputNumber) }]);
    setInputText('');
    setInputNumber('');
  };

  return (
    <TailwindProvider utilities={utilities}>
      <View className='flex-[3] bg-white dark:bg-black pt-9'>
        <View className='p-5 items-end'>
          <Pressable className='p-1 bg-black dark:bg-white border border-gray-400 rounded items-center w-40' onPress={toggleColorScheme}>
            <Text className='text-white dark:text-black font-bold'>
              Click me to {colorScheme === 'dark' ? 'light' : 'dark'} mode!
            </Text>
          </Pressable>
        </View>
        <Text className='mt-5 mb-5 text-center text-2xl font-semibold text-black dark:text-white'>AlgoEnergy</Text>
        <View className='items-center justify-center bg-white dark:bg-black'>
          <TextInput
            className='w-60 mb-2 py-2 px-2 border border-gray-300 rounded text-black dark:text-white'
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter Name"
            placeholderTextColor="#777777"
          />
          <TextInput
            className='w-60 mb-5 py-2 px-2 border border-gray-300 rounded text-black dark:text-white'
            value={inputNumber}
            onChangeText={setInputNumber}
            keyboardType="numeric"
            placeholder="Enter Rating"
            placeholderTextColor="#777777"
          />
        </View>
        <View className='p-2 items-center'>
          <Pressable className='p-1 bg-blue-100 dark:bg-blue-400 border border-gray-400 rounded items-center w-40' onPress={handleAddData}>
            <Text className='text-black dark:text-white font-bold'>
              Add Data
            </Text>
          </Pressable>
        </View>
        <View className='items-center mt-5'>
          <Text className='text-black dark:text-white font-bold text-xl'>
            Ratings of Customers
          </Text>
          <View>
          <View>
            <LineChart
              data={{
                labels: data.map(item => item.x),
                datasets: [{ data: data.map(item => item.y) }],
              }}
              width={Dimensions.get("window").width/1.05} // from react-native
              height={220}
              yAxisSuffix="/10"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#777777",
                backgroundGradientFrom: "#777777",
                backgroundGradientTo: "#77777f",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                backgroundColor:'#777777'
              }}
            />
          </View>
          </View>
        </View>
      </View>
    </TailwindProvider>
  );
};

export default App;

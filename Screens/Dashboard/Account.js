import { Heading, HStack, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import {
  View,
  Box,
  NativeBaseProvider,
  Text,
  Center,
  Image,
} from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Account() {
  const [dataUser, setdataUser] = React.useState({});
  console.log(dataUser)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@data_user");
      setdataUser(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <NativeBaseProvider>
      <Box w={"100%"} h={"100%"} safeArea bg={"#fff"}>
        <Box w={"100%"}>
          <Center>
            <Image
              resizeMode={"contain"}
              borderRadius={100}
              source={{
                uri: dataUser.photo,
              }}
              alt="Alternate Text"
              size="xl"
            />
             <HStack top={2}>
                  <Text fontSize={"sm"}>{dataUser.name}</Text>
                </HStack>

            <VStack
              w={"90%"}
              h={"70%"}
              bg={"light.100"}
              top={4}
              borderRadius={5}
              shadow={1}
            >
              <View p={2}>
               

              </View>
            </VStack>
          </Center>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

import React, { useState, useEffect } from "react";
import {
  View,
  Box,
  NativeBaseProvider,
  Center,
  Button,
  Text,
  FlatList,
  HStack,
  VStack,
  Heading,
  Image,
  Modal,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TouchableOpacity } from "react-native";

export default function Dashboard({ navigation }) {
  const [dataScreen, setdataScreen] = React.useState({});
  const [dataUser, setdataUser] = React.useState({});
  const [showModal, setShowModal] = useState(false);

  function getKeys() {
    axios
      .get("https://birdra1n.x10.bz/IFPI_PORTARIA/api/keys/list", {
        params: {
          filter: "all",
        },
      })
      .then(function (response) {
        console.log(response);
        setdataScreen({
          ...dataScreen,
          HallList: response.data,
        });
      });
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@data_user");
      setdataUser(JSON.parse(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getKeys();
    getData();
  }, []);

  function ModalRequestKey(hall, description, status, conveyer) {
    setShowModal(true)
    setdataScreen({
      ...dataScreen,
      ModalHall: hall,
      ModalDescription: description,
      ModalStatus: status,
      ModalCoveyer: conveyer
    });

  }

  return (
    <NativeBaseProvider>
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.Body>
              <Heading fontSize={15}>
              Deseja solicitar a chave da sala {dataScreen.ModalHall}?
              </Heading>
              <Text  fontSize={"md"}>
                  {dataScreen.ModalDescription}
                </Text>

            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Não
                </Button>
                <Button
                  colorScheme={"success"}
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Sim
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>

      <Box w={"100%"} bg={"#FBFBFB"} maxW={500} h={"100%"}>
        <Box p={2} safeArea>
          <HStack>
            <Image
              source={{
                uri: "https://pbs.twimg.com/profile_images/438771627854024704/Az4OY07a_400x400.png",
              }}
              alt="Alternate Text"
              size="sm"
            />
            <View marginLeft={"2%"}>
              <Heading size={"sm"}>{dataUser.name}</Heading>
              <Text fontSize={10}>{dataUser.description}</Text>
              <Text fontSize={10} top={2}>
                INSTITUTO FEDERAL CAMPUS PEDRO II
              </Text>
            </View>
          </HStack>
        </Box>
        <Center top={5}>
          <FlatList
            w={"95%"}
            maxW={350}
            h={"80%"}
            numColumns={3}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: "space-around",
              marginLeft: 5,
              marginBottom: 5,
            }}
            showsVerticalScrollIndicator={false}
            data={dataScreen.HallList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  ModalRequestKey(
                    item.hall,
                    item.description,
                    item.status,
                    item.conveyer
                  )
                }
              >
                <Box
                  marginBottom={1}
                  alignItems={"center"}
                  bg={"light.50"}
                  borderRadius={5}
                  w={16}
                  h={59}
                  p={1}
                  shadow={1}
                >
                  <HStack>
                    <VStack>
                      <Heading size={"sm"}>Sala</Heading>
                      <Heading>{item.hall}</Heading>
                    </VStack>
                  </HStack>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </Center>
      </Box>
    </NativeBaseProvider>
  );
}

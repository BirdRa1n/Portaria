import { Heading, HStack, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import {
  View,
  Box,
  NativeBaseProvider,
  Text,
  Center,
  FlatList,
  Actionsheet,
  useDisclose,
  Button,
} from "native-base";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Requests() {
  const [dataRequest, setdataRequest] = React.useState({});
  const [ActionsheetData, setActionsheetData] = React.useState({});
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isRefreshing, setIsRefreshing] = useState(false)


  function RequestDataRequests() {
    axios
      .get("https://birdra1n.x10.bz/IFPI_PORTARIA/api/keys/requestslist/", {
        params: {
          filter: "user",
          id_code: "20191p2ti0169",
        },
      })
      .then(function (response) {
        let data = response.data;
        setdataRequest({
          ...dataRequest,
          Data: data,
        });
      });
  }
  function setDataActionsheet(
    code_request,
    hall,
    id_code_conveyer,
    id_request,
    last,
    name_conveyer,
    photo_conveyer,
    request_datatime,
    request_delivery
  ) {
    if (request_delivery == "null") {
      onOpen(!onOpen);
      setActionsheetData({
        ...ActionsheetData,
        request_delivery: "Em uso",
        hall: hall,
        code_request: code_request,
        id_code_conveyer: id_code_conveyer,
        id_request: id_request,
        last: last,
        name_conveyer: name_conveyer,
        photo_conveyer: photo_conveyer,
        request_datatime: request_datatime,
      });
    }
  }
  const onRefresh = () => {
    setIsRefreshing(true)
    RequestDataRequests()
    setIsRefreshing(false)
}
  useEffect(() => {
    RequestDataRequests();
  }, []);

  return (
    <NativeBaseProvider>
      <View w={"100%"} h={"100%"}>
        <Center w={"100%"} h={"100%"}>
          <FlatList
           onRefresh={onRefresh}
           refreshing={isRefreshing}
          
            top={2}
            w={"95%"}
            maxW={350}
            h={"80%"}
            showsVerticalScrollIndicator={false}
            data={dataRequest.Data}
            renderItem={({ item }) => (
              <Center>
                <TouchableOpacity
                  style={{ width: "100%" }}
                  onPress={() =>
                    setDataActionsheet(
                      item.code_request,
                      item.hall,
                      item.id_code_conveyer,
                      item.id_request,
                      item.last,
                      item.name_conveyer,
                      item.photo_conveyer,
                      item.request_datatime,
                      item.request_delivery
                    )
                  }
                >
                  <Box
                    marginBottom={1}
                    marginTop={1}
                    bg={"light.50"}
                    borderRadius={2}
                    w={"100%"}
                    maxW={400}
                    h={59}
                    p={0}
                    shadow={1}
                  >
                    <Heading p={1} size={"sm"}>
                    Solicitação: <Text>{item.request_datatime}</Text>
                    </Heading>
                  </Box>
                </TouchableOpacity>
              </Center>
            )}
            keyExtractor={(item) => item.id}
          />
        </Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <QRCode
              value={JSON.stringify(ActionsheetData)}
              size={150}
              logo={{
                uri: "https://pbs.twimg.com/profile_images/438771627854024704/Az4OY07a_400x400.png",
              }}
              logoSize={30}
              logoBackgroundColor="transparent"
            />
            <Text top={1}>{ActionsheetData.code_request}</Text>

            <VStack w={"100%"} marginBottom={20}>
              <HStack top={3}>
                <Heading size={"sm"}>Nome: </Heading>
                <Text fontSize={"sm"}>{ActionsheetData.name_conveyer}</Text>
              </HStack>
              <HStack top={3}>
                <Heading size={"sm"}>Data da solicitação: </Heading>
                <Text fontSize={"sm"}>{ActionsheetData.request_datatime}</Text>
              </HStack>
              <HStack top={3}>
                <Heading size={"sm"}>Sala: </Heading>
                <Text fontSize={"sm"}>{ActionsheetData.hall}</Text>
              </HStack>

              <HStack top={3}>
                <Heading size={"sm"}>Estado: </Heading>
                <Text bg={"green.400"} fontSize={"sm"}>
                  {ActionsheetData.request_delivery}
                </Text>
              </HStack>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </NativeBaseProvider>
  );
}

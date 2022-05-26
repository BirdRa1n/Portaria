import { VStack } from "native-base";
import React, { useState, useEffect } from "react";
import {
  View,
  Box,
  NativeBaseProvider,
  Center,
  Image,
  Heading,
  Text,
  KeyboardAvoidingView,
  HStack,
  FormControl,
  Input,
  Link,
  Button,
  WarningOutlineIcon,
  ScrollView,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { Platform } from "react-native";

export default function Login({ navigation }) {
  const [formData, setData] = React.useState({});

  function LoginNormalMethod() {
    axios
      .get("https://birdra1n.x10.bz/IFPI_PORTARIA/api/user/login/", {
        params: {
          method: "normal",
          id_code: formData.id_code,
          password: formData.password,
        },
      })
      .then(function (response) {
        let responseRequest = response.data;
        storeData(response.data);
        if (
          (responseRequest.warning_error != undefined) &
          (responseRequest.warning_error == "user does not exist")
        ) {
          setData({
            ...formData,
            IDState: true,
            PasswordState: false,
          });
        }

        if (
          (responseRequest.warning_error != undefined) &
          (responseRequest.warning_error == "incorrect password")
        ) {
          setData({
            ...formData,
            PasswordState: true,
            IDState: false,
          });
        }
        if (response.data.token_session !== undefined) {
          setData({
            ...formData,
            PasswordState: false,
            IDState: false,
          });

          navigation.navigate("Dashboard");
          console.log("Login realizado com sucesso!")
        }
      });
  }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@data_user", jsonValue);
    } catch (e) {
      console.log("erro ao efetuar o estado " + e);
    }
  };

  function checkPlataform(){
    if(Platform.OS == "web"){
      console.log("Plataform is Web")
      setData({
        ...formData,
        stateQRButton: true
      })
    }else{
      console.log("Plataform is !web")
      setData({
        ...formData,
        stateQRButton: false
      })
    }
  }

  useEffect(() => {
    checkPlataform()
  }, []);

  return (
    <NativeBaseProvider>
      <Box w={"100%"} h={"100%"} bg={"#fff"} safeArea>
        <ScrollView bg={"#fff"} showsVerticalScrollIndicator={false}>
          <Center>
            <Box
              w={"90%"}
              maxW={390}
              h={"91%"}
              maxH={900}
              bg={"light.100"}
              borderRadius={10}
              top={5}
            >
              <KeyboardAvoidingView
                h={{
                  base: "100%",
                  lg: "auto",
                }}
                maxH={{
                  base: "450px",
                  lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height" && Platform.OS === "android" ? "padding" : "height"}
              >
                <Center>
                  <Image
                    top={5}
                    source={{
                      uri: "https://pbs.twimg.com/profile_images/438771627854024704/Az4OY07a_400x400.png",
                    }}
                    alt="Alternate Text"
                    size="sm"
                  />
                </Center>

                <Center top={5}>
                  <Heading size={"sm"}>INSTITUTO</Heading>
                  <Heading size={"sm"}>FEDERAL</Heading>
                  <Text fontSize={"xl"}>Piauí</Text>
                </Center>

                <Center w="100%">
                  <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading
                      size="lg"
                      fontWeight="600"
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                    >
                      Bem vindo de volta
                    </Heading>
                    <Heading
                      mt="1"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      color="coolGray.600"
                      fontWeight="medium"
                      size="xs"
                    >
                      faça login para continuar!
                    </Heading>

                    <VStack
                      space={3}
                      mt="5"
                      _android={{
                        top: -10,
                      }}
                      _ios={{
                        top: -15,
                      }}
                    >
                      <FormControl isInvalid={formData.IDState}>
                        <FormControl.Label>
                          <HStack space={2}>
                            <FormControl.Label>ID</FormControl.Label>
                            <FormControl.ErrorMessage
                              top={-2.5}
                              leftIcon={<WarningOutlineIcon size="xs" />}
                            >
                              Usuário não encontrado
                            </FormControl.ErrorMessage>
                          </HStack>
                        </FormControl.Label>
                        <Input
                          onChangeText={(value) =>
                            setData({
                              ...formData,
                              id_code: value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl isInvalid={formData.PasswordState}>
                        <FormControl.Label>
                          <HStack space={2}>
                            <FormControl.Label>Senha</FormControl.Label>
                            <FormControl.ErrorMessage
                              top={-2.5}
                              leftIcon={<WarningOutlineIcon size="xs" />}
                            >
                              Senha incorreta
                            </FormControl.ErrorMessage>
                          </HStack>
                        </FormControl.Label>

                        <Input
                          type="password"
                          onChangeText={(value) =>
                            setData({
                              ...formData,
                              password: value,
                            })
                          }
                        />

                        <Link
                          _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "success.500",
                          }}
                          alignSelf="flex-end"
                          mt="1"
                        >
                          Esqueceu a senha?
                        </Link>
                      </FormControl>
                      <Button
                        mt="2"
                        colorScheme="success"
                        onPress={() => LoginNormalMethod()}
                      >
                        Entrar
                      </Button>
                      <HStack mt="6" justifyContent="center">
                        <Text
                          fontSize="sm"
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                        >
                          Veja o projeto no{" "}
                        </Text>
                        <Link
                          _text={{
                            color: "success.500",
                            fontWeight: "medium",
                            fontSize: "sm",
                          }}
                          href="https://github.com/BirdRa1n/SISTEMA-DE-PORTARIA-IFPI"
                        >
                          GitHub
                        </Link>
                      </HStack>
                      <Center>
                        <Button
                        isDisabled={formData.stateQRButton}
                          colorScheme={"success"}
                          onPress={()=>navigation.navigate("LoginQR")}
                          leftIcon={
                            <MaterialCommunityIcons
                              name="qrcode-scan"
                              size={24}
                              color="black"
                            />
                          }
                        >
                          Entre com QRCode
                        </Button>
                      </Center>
                    </VStack>
                  </Box>
                </Center>
              </KeyboardAvoidingView>
            </Box>
          </Center>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginQR({ navigation }) {
  const [formData, setData] = React.useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const dataqr = JSON.parse(data);
    if (dataqr.QRtoken !== undefined) {
      LoginQRCode(dataqr.QRtoken);
    } else {
      alert("QRCode inválido");
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@data_user", jsonValue);
    } catch (e) {
      console.log("erro ao efetuar o estado " + e);
    }
  };

  function LoginQRCode(value) {
    axios
      .get("https://birdra1n.x10.bz/IFPI_PORTARIA/api/user/login/", {
        params: {
          method: "QRCode",
          QRData: value,
        },
      })
      .then(function (response) {
        storeData(response.data);
        
        if (response.data.token_session !== undefined) {
          navigation.navigate("Dashboard");
        }
        
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "100%",
  },
});

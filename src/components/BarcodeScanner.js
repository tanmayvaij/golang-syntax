import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { width } from "../utils/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";

const BarcodeScanner = ({
  setIsModal,
  cameraRef,
  barcodeRecognized,
}) => {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => setIsModal(false)}>
            <MaterialCommunityIcons
              name="close-thick"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <BarCodeScanner
          ref={cameraRef}
          onBarCodeScanned={barcodeRecognized}
          style={{ width: "100%", height: "60%" }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(64, 64, 64, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 65,
    right: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  camera: {
    width: width * 0.8,
    height: 200,
    alignSelf: "center",
  },
});

export default BarcodeScanner;

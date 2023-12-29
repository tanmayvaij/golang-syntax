import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {RNCamera} from 'react-native-camera';
import { Camera } from "expo-camera"
import { width} from '../utils/constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BarcodeScanner = ({
  isModal,
  setIsModal,
  cameraRef,
  barcodeRecognized,
}) => {
  return (
    <Modal visible={isModal} transparent={true}>
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
        <Camera
          ref={cameraRef}
          style={styles.camera}
          onBarCodeScanned={barcodeRecognized}
          // barCodeTypes={[
          //   RNCamera.Constants.BarCodeType.ean8,
          //   RNCamera.Constants.BarCodeType.ean13,
          //   RNCamera.Constants.BarCodeType.pdf417,
          //   RNCamera.Constants.BarCodeType.code128,
          // ]}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(64, 64, 64, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 65,
    right: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  camera: {
    width: width * 0.8,
    height: 200,
    alignSelf: 'center',
  },
});

export default BarcodeScanner;

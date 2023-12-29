import React, { useContext, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { height, unitH, width } from "../../utils/constant";
import { AppContext } from "../../context/AppContext";
import EcomHelper from "../../utils/ecomHelper";

import * as ExpoImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function SealedSlamShutPhotoPage() {
  const { showActionSheetWithOptions } = useActionSheet();

  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const meterDetails = appContext.meterDetails;
  const [selectedImage, setSelectedImage] = useState(
    meterDetails?.slamShutPhoto
  );

  console.log("SealedSlamShutPhotoPage");
  console.log("=================== Slam shut photo", appContext.streamCounter);

  const backPressed = () => {
    appContext.setMeterDetails({
      ...meterDetails,
      slamShutPhoto: selectedImage,
    });
    navigation.goBack();
  };

  const nextPressed = async () => {
    if (!selectedImage) {
      EcomHelper.showInfoMessage("Please choose image");
      return;
    }

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      appContext.setBlobs(prev => [ ...prev, blob ])
    }
    catch(err) {
      console.log(err);
    }

    appContext.setMeterDetails({
      ...meterDetails,
      slamShutPhoto: selectedImage,
    });
    appContext.setStreamCounter(0);
    navigation.navigate("SealedCreepReliefPhotoPage");
  };

  const handleImagePicker = () => {
    showActionSheetWithOptions(
      {
        options: ["Cancel", "Take Photo", "Choose from Gallery"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          takePhoto();
        } else if (buttonIndex === 2) {
          chooseFromGallery();
        }
      }
    );
  };
  const takePhoto = () => {
    const options = {
      title: "Take Photo",
      mediaType: "photo",
      quality: 1,
    };

    ExpoImagePicker.launchCameraAsync(options)
      .then((response) => {
        setSelectedImage(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const chooseFromGallery = () => {
    const options = {
      title: "Choose from Gallery",
      mediaType: "photo",
      quality: 1,
    };

    ExpoImagePicker.launchImageLibraryAsync(options)
      .then((response) => {
        setSelectedImage(response.assets[0].uri);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.content}>
        <Header
          hasLeftBtn={true}
          hasCenterText={true}
          hasRightBtn={true}
          centerText={"Photo of Slam Shut"}
          leftBtnPressed={backPressed}
          rightBtnPressed={nextPressed}
        />
        <View style={styles.body}>
          <View style={styles.spacer} />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <View style={styles.row}>
            <Button
              title={
                selectedImage === undefined ? "Choose Image" : "Change Image"
              }
              onPress={handleImagePicker}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: width,
    height: height,
  },
  body: {
    marginHorizontal: width * 0.1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spacer: {
    height: unitH * 50,
  },
});

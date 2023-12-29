import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
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
import Text from "../../components/Text";
import { TextType } from "../../theme/typography";
import { AppContext } from "../../context/AppContext";
import EcomHelper from "../../utils/ecomHelper";

import * as ExpoImagePicker from "expo-image-picker";

export default function VentOutKioskPhotoPage() {

  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const meterDetails = appContext.meterDetails;
  let streamImages = meterDetails?.streamImages;
  console.log("VentOutKioskPhotoPage");

  let count = appContext.streamCounter;
  const creepReliefVentOut =
    streamImages != null
      ? Object.entries(streamImages).find(
          ([key]) => key === `creepReliefVentOut_${count}`
        )
      : null;
  const [selectedImage, setSelectedImage] = useState(
    creepReliefVentOut ? creepReliefVentOut[1] : null
  );

  useEffect(() => {
    const creepReliefVentOut =
      streamImages != null
        ? Object.entries(streamImages).find(
            ([key]) => key === `creepReliefVentOut_${count}`
          )
        : null;
    const photo = creepReliefVentOut ? creepReliefVentOut[1] : null;
    setSelectedImage(photo);
  }, [count, streamImages]);

  const streamNumber = appContext.streamNumber;
  console.log("VentOutKisokPhoto page == =count", appContext.streamCounter);
  console.log("VentOutKisokPhoto page == =count", appContext.streamNumber);

  const backPressed = () => {
    streamImages = {
      ...streamImages,
      [`creepReliefVentOut_${count}`]: selectedImage,
    };

    appContext.setMeterDetails({
      ...meterDetails,
      streamImages: streamImages,
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

    streamImages = {
      ...streamImages,
      [`creepReliefVentOut_${count}`]: selectedImage,
    };

    appContext.setMeterDetails({
      ...meterDetails,
      streamImages: streamImages,
    });

    console.log(appContext.meterDetails?.streamImages);

    count += 1;
    if (streamNumber === count) {
      appContext.setStreamCounter(0);
      navigation.navigate("RegulatorPage");
      console.log("up- upupjup");
    } else {
      console.log("dsafdasfdasfads");
      EcomHelper.showInfoMessage(`Stream ${count + 1} will be started`);
      appContext.setStreamCounter(count);
      navigation.navigate("SealedCreepReliefPhotoPage");
    }
  };

  const handleImagePicker = () => {
    Alert.alert("Choose Image", "how to choose image ?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Choose from gallery",
        onPress: chooseFromGallery,
      },
      {
        text: "Take photo",
        onPress: takePhoto,
      },
      {},
    ]);
  };
  const takePhoto = () => {
    const options = {
      title: "Take Photo",
      mediaType: "photo",
      quality: 1,
    };

    ExpoImagePicker.launchCameraAsync(options)
      .then((response) => {
        console.log(response.assets[0].uri);
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
        setSelectedImage(response);
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
          centerText={"Photo of Vent Outside"}
          leftBtnPressed={backPressed}
          rightBtnPressed={nextPressed}
        />
        <View style={styles.body}>
          <View style={styles.spacer} />
          <Text type={TextType.TEXTINPUT} style={{ borderWidth: 0 }}>
            {"Stream " + (count + 1)}
          </Text>
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

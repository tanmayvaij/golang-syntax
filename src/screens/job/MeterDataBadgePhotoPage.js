import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Text from "../../components/Text";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { unitH } from "../../utils/constant";
import { TextType } from "../../theme/typography";
import { AppContext } from "../../context/AppContext";
import EcomHelper from "../../utils/ecomHelper";

import * as ExpoImagePicker from "expo-image-picker";

function MeterDataBadgePhotoPage() {

  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const meterDetails = appContext.meterDetails;
  const removedMeterDetails = appContext.removedMeterDetails;
  let dataBadgePhoto =
    jobType === "Install"
      ? meterDetails?.dataBadgePhoto
      : jobType === "Removal" || jobType === "Warrant"
      ? removedMeterDetails?.dataBadgePhoto
      : null;
  const isPassedRemoval = appContext.passedRemoval;
  console.log(">>> Passed Removal >>>", isPassedRemoval);
  dataBadgePhoto = isPassedRemoval
    ? meterDetails?.dataBadgePhoto
    : dataBadgePhoto;
  const [selectedImage, setSelectedImage] = useState(dataBadgePhoto);
  console.log("MeterDataBadgePhotoPage");

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

    //change context value
    if (jobType === "Install") {
      appContext.setMeterDetails({
        ...meterDetails,
        dataBadgePhoto: selectedImage,
      });
      let isDiaphragm = [1, 2, 4].includes(meterDetails?.type.value);
      console.log("MeterDataBadge / isDiaphram??", isDiaphragm);
      if (!isDiaphragm) {
        // navigation.navigate('StreamsSetSealDetailsPage');
        navigation.navigate("MeterInstallationPhotoPage");
      } else {
        console.log("======= isDiaphragm meter : YES =======");
      }
    } else if (
      jobType === "Removal" ||
      jobType === "Exchange" ||
      jobType === "Warrant" ||
      jobType === "Maintenance"
    ) {
      if (isPassedRemoval) {
        appContext.setMeterDetails({
          ...meterDetails,
          dataBadgePhoto: selectedImage,
        });
        let isDiaphragm = [1, 2, 4].includes(meterDetails?.type.value);
        console.log("MeterDataBadge / isDiaphram??", isDiaphragm);
        if (!isDiaphragm) {
          // navigation.navigate('StreamsSetSealDetailsPage');
          navigation.navigate("MeterInstallationPhotoPage");
        } else {
          console.log("======= isDiaphragm meter : YES =======");
        }
        return;
      }
      appContext.setRemovedMeterDetails({
        ...removedMeterDetails,
        dataBadgePhoto: selectedImage,
      });
      navigation.navigate("MeterIndexPhotoPage");
    }
  };
  const backPressed = () => {
    if (jobType === "Install") {
      appContext.setMeterDetails({
        ...meterDetails,
        dataBadgePhoto: selectedImage,
      });
      let isDiaphragm = [1, 2, 4].includes(meterDetails?.type.value);
      console.log("MeterDataBadge / isDiaphram??", isDiaphragm);
      if (!isDiaphragm) {
        // navigation.navigate('StreamsSetSealDetailsPage');
        navigation.goBack();
      } else {
        console.log("======= isDiaphragm meter : YES =======");
      }
    } else if (
      jobType === "Removal" ||
      jobType === "Exchange" ||
      jobType === "Warrant" ||
      jobType === "Maintenance"
    ) {
      if (isPassedRemoval) {
        appContext.setMeterDetails({
          ...meterDetails,
          dataBadgePhoto: selectedImage,
        });
        let isDiaphragm = [1, 2, 4].includes(meterDetails?.type.value);
        console.log("MeterDataBadge / isDiaphram??", isDiaphragm);
        if (!isDiaphragm) {
          // navigation.navigate('StreamsSetSealDetailsPage');
          navigation.goBack();
        } else {
          console.log("======= isDiaphragm meter : YES =======");
        }
        return;
      }
      appContext.setRemovedMeterDetails({
        ...removedMeterDetails,
        dataBadgePhoto: selectedImage,
      });
      navigation.goBack();
    } else {
      navigation.goBack();
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
        setSelectedImage(response.assets[0].uri);
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

  const pageTitle = jobType === "Install" ? "New Meter Details" : jobType;

  return (
    <SafeAreaView style={styles.flex}>
      <Header
        hasLeftBtn={true}
        hasCenterText={true}
        hasRightBtn={true}
        centerText={pageTitle}
        leftBtnPressed={backPressed}
        rightBtnPressed={nextPressed}
      />
      <ScrollView style={styles.flex}>
        <View style={styles.spacer} />
        <View style={styles.body}>
          <Text type={TextType.BODY_1}>Set and sealed Photo</Text>
          <View style={styles.spacer} />
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  spacer: {
    height: unitH * 10,
  },
});

export default MeterDataBadgePhotoPage;

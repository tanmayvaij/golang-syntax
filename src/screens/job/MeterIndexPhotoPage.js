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
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { height, unitH, width } from "../../utils/constant";
import Text from "../../components/Text";
import { TextType } from "../../theme/typography";
import { AppContext } from "../../context/AppContext";
import EcomHelper from "../../utils/ecomHelper";

import * as ExpoImagePicker from "expo-image-picker";

export default function MeterIndexPhotoPage() {

  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const meterDetails = appContext.meterDetails;
  const removedMeterDetails = appContext.removedMeterDetails;
  let indexPhoto =
    jobType === "Install"
      ? meterDetails?.indexPhoto
      : jobType === "Removal" || jobType === "Exchange" || jobType === "Warrant"
      ? removedMeterDetails?.indexPhoto
      : null;
  const isPassedRemoval = appContext.passedRemoval;
  console.log(">>> Passed Removal >>>", isPassedRemoval);
  indexPhoto = isPassedRemoval ? meterDetails?.indexPhoto : indexPhoto;

  const [selectedImage, setSelectedImage] = useState(indexPhoto);
  console.log("MeterIndexPhotoPage");

  const backPressed = () => {
    let isDiaphragm = [1, 2, 4].includes(meterDetails?.type.value);
    if (jobType === "Install") {
      appContext.setMeterDetails({
        ...meterDetails,
        indexPhoto: selectedImage,
      });
      if (isDiaphragm) {
        navigation.goBack();
      } else {
        //meterDetails?.pressureTier.label === 'LP'
        navigation.goBack();
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
          indexPhoto: selectedImage,
        });
        if (isDiaphragm) {
          navigation.goBack();
        } else {
          //meterDetails?.pressureTier.label === 'LP'
          navigation.goBack();
        }
        return;
      }
      appContext.setRemovedMeterDetails({
        ...removedMeterDetails,
        indexPhoto: selectedImage,
      });
      navigation.goBack();
    } else {
      navigation.goBack();
    }
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
    
    let isDiaphragm = [1, 2, 4].includes(meterDetails?.type.value);
    console.log("MeterIndexPhoto / isDiaphram??", isDiaphragm);

    if (jobType === "Install") {
      appContext.setMeterDetails({
        ...meterDetails,
        indexPhoto: selectedImage,
      });
      if (isDiaphragm) {
        navigation.navigate("MeterInstallationPhotoPage");
      } else {
        //meterDetails?.pressureTier.label === 'LP'
        navigation.navigate("MeterDataBadgePhotoPage");
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
          indexPhoto: selectedImage,
        });
        if (isDiaphragm) {
          navigation.navigate("MeterInstallationPhotoPage");
        } else {
          //meterDetails?.pressureTier.label === 'LP'
          navigation.navigate("MeterDataBadgePhotoPage");
        }
        return;
      }
      appContext.setRemovedMeterDetails({
        ...removedMeterDetails,
        indexPhoto: selectedImage,
      });
      navigation.navigate("EcvPhotoPage");
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

  const pageTitle = jobType === "Install" ? "New Meter Details" : jobType; ///'Job Number: ECOM09134'

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.content}>
        <Header
          hasLeftBtn={true}
          hasCenterText={true}
          hasRightBtn={true}
          centerText={pageTitle}
          leftBtnPressed={backPressed}
          rightBtnPressed={nextPressed}
        />
        <View style={styles.spacer} />
        <View style={styles.body}>
          <Text type={TextType.BODY_1}>
            {jobType === "Install" ? "New" : "Removed"} Meter Index
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

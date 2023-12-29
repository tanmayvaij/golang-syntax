import React, { useContext, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { height, unitH, width } from "../../../utils/constant";
import Text from "../../../components/Text";
import { TextType } from "../../../theme/typography";
import { AppContext } from "../../../context/AppContext";
import EcomHelper from "../../../utils/ecomHelper";

import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ExpoImagePicker from "expo-image-picker";

export default function NewEcvPhotoPage() {
  const { showActionSheetWithOptions } = useActionSheet();

  const appContext = useContext(AppContext);
  const navigation = useNavigation();
  const jobType = appContext.jobType;
  const title = jobType === "Install" ? "New Meter Details" : jobType;
  const siteDetails = appContext.siteDetails;
  const removedSiteDetails = appContext.removedSiteDetails;
  const maintenanceDetails = appContext.maintenanceDetails;
  const ecvPhoto =
    jobType === "Install"
      ? siteDetails?.ecvPhoto
      : jobType === "Removal" || jobType === "Exchange" || jobType === "Warrant"
      ? removedSiteDetails?.ecvPhoto
      : jobType === "Maintenance"
      ? maintenanceDetails?.ecvPhoto
      : null;
  const [selectedImage, setSelectedImage] = useState(ecvPhoto);
  const isPassedRemoval = appContext.passedRemoval;
  const isStartRemoval = appContext.startRemoval;
  console.log(">>> Passed Removal >>>", isPassedRemoval);
  console.log(">>> Start Removal >>>", isStartRemoval);
  console.log("NewEcvPhotoPage");
  const backPressed = () => {
    if (jobType === "Install") {
      appContext.setSiteDetails({
        ...siteDetails,
        ecvPhoto: selectedImage,
      });
    } else if (jobType === "Maintenance" && !isStartRemoval) {
    } else if (
      jobType === "Removal" ||
      jobType === "Exchange" ||
      jobType === "Warrant" ||
      jobType === "Maintenance"
    ) {
      if (isPassedRemoval) {
        appContext.setSiteDetails({
          ...siteDetails,
          ecvPhoto: selectedImage,
        });
        navigation.goBack();
        return;
      }
      if (isStartRemoval) {
        appContext.setRemovedSiteDetails({
          ...removedSiteDetails,
          ecvPhoto: selectedImage,
        });
      }
    }
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

    if (jobType === "Install") {
      appContext.setSiteDetails({
        ...siteDetails,
        ecvPhoto: selectedImage,
      });
      navigation.navigate("MeterDetailsPage");
    } else if (jobType === "Maintenance" && !isStartRemoval) {
      navigation.navigate("MaintenanceQuestionsPage");
    } else if (
      jobType === "Removal" ||
      jobType === "Exchange" ||
      jobType === "Warrant" ||
      jobType === "Maintenance"
    ) {
      if (isPassedRemoval) {
        appContext.setSiteDetails({
          ...siteDetails,
          ecvPhoto: selectedImage,
        });
        navigation.navigate("MeterDetailsPage");
        return;
      }
      if (isStartRemoval) {
        appContext.setRemovedSiteDetails({
          ...removedSiteDetails,
          ecvPhoto: selectedImage,
        });
        navigation.navigate("RemovedMeterDetailsPage");
      }
    }
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

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.content}>
        <Header
          hasLeftBtn={true}
          hasCenterText={true}
          hasRightBtn={true}
          centerText={title}
          leftBtnPressed={backPressed}
          rightBtnPressed={nextPressed}
        />
        <View style={styles.spacer} />
        <View style={styles.body}>
          <Text type={TextType.BODY_1}>
            {jobType === "Install"
              ? "Picture of new installation from ECV to MOV"
              : "Picture of existing ECV"}
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

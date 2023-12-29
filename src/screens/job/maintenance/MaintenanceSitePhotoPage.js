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
import Text from "../../../components/Text";
import { height, unitH, width } from "../../../utils/constant";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { TextType } from "../../../theme/typography";
import { AppContext } from "../../../context/AppContext";
import EcomHelper from "../../../utils/ecomHelper";

import * as ExpoImagePicker from "expo-image-picker";

function MaintenanceSitePhotoPage() {

  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const maintenanceDetails = appContext.maintenanceDetails;
  const jobType = appContext.jobType;

  const [selectedImage, setSelectedImage] = useState(
    maintenanceDetails?.sitePhoto
  );

  console.log("==== MaintenanceSitePhotoPage ====");

  const backPressed = () => {
    appContext.setMaintenanceDetails({
      ...maintenanceDetails,
      sitePhoto: selectedImage,
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

    // entrance of building
    appContext.setMaintenanceDetails({
      ...maintenanceDetails,
      sitePhoto: selectedImage,
    });
    navigation.navigate("MaintenanceAssetTypeSelectionPage");
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

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.content}>
        <Header
          hasLeftBtn={true}
          hasCenterText={true}
          hasRightBtn={true}
          centerText={jobType}
          leftBtnPressed={backPressed}
          rightBtnPressed={nextPressed}
        />
        <View style={styles.spacer} />
        <View style={styles.body}>
          <Text type={TextType.CAPTION_2} style={styles.text}>
            Site Photo - Entrance of building
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
  content: {
    flex: 1,
  },
  body: {
    marginHorizontal: width * 0.1,
  },
  text: {
    alignSelf: "flex-start",
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

export default MaintenanceSitePhotoPage;

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
import OptionalButton from "../../../components/OptionButton";
import EcomHelper from "../../../utils/ecomHelper";
import { AppContext } from "../../../context/AppContext";

import * as ExpoImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function DsearLabelPhotoPage() {
  const { showActionSheetWithOptions } = useActionSheet();

  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const title = jobType === "Install" ? "New Meter Details" : jobType;

  const standardDetails = appContext.standardDetails;

  const [selectedImage, setSelectedImage] = useState(
    standardDetails?.dsearLabelPhoto
  );
  const [hasExtraPhoto, setHasExtraPhoto] = useState(false);

  console.log("DsearLabelPhotoPage");
  const backPressed = () => {
    appContext.setStandardDetails({
      ...standardDetails,
      dsearLabelPhoto: selectedImage,
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

    appContext.setStandardDetails({
      ...standardDetails,
      dsearLabelPhoto: selectedImage,
    });

    if (hasExtraPhoto) {
      navigation.navigate("ExtraPhotoPage");
    } else {
      navigation.navigate("SettingsLabelPage");
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
          <Text type={TextType.BODY_1} style={{ textAlign: "left" }}>
            {"DSEAR Label"}
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
          <View style={styles.spacer} />
          <Text>Do you Wish to Add extra job photos</Text>
          <View style={styles.optionContainer}>
            <OptionalButton
              options={["Yes", "No"]}
              actions={[
                () => {
                  setHasExtraPhoto(true);
                },
                () => {
                  setHasExtraPhoto(false);
                },
              ]}
              value={
                hasExtraPhoto == null ? null : hasExtraPhoto ? "Yes" : "No"
              }
            />
          </View>
          <View style={styles.spacer} />
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
  optionContainer: {
    width: 100,
    marginVertical: unitH * 10,
    alignSelf: "flex-start",
  },
  spacer: {
    height: unitH * 50,
  },
});

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
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { height, unitH, width } from "../../../utils/constant";
import Text from "../../../components/Text";
import { TextType } from "../../../theme/typography";
import EcomHelper from "../../../utils/ecomHelper";
import { AppContext } from "../../../context/AppContext";

import * as ExpoImagePicker from "expo-image-picker";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";

export default function SettingsLabelPage() {
  let axiosConfig = {};

  getItemAsync("userToken").then((token) => {
    if (token) {
      axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Basic ${token}`,
        },
      };
    }
  });

  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const title = jobType === "Install" ? "New Meter Details" : jobType;

  const siteDetails = appContext.siteDetails;
  const meterDetails = appContext.meterDetails;
  const regulatorDetails = appContext.regulatorDetails;
  const standardDetails = appContext.standardDetails;

  const warrantDetails = appContext.warrantDetails;

  const removedSiteDetails = appContext.removedSiteDetails;
  const removedMeterDetails = appContext.removedMeterDetails;

  const maintenanceDetails = appContext.maintenanceDetails;

  const blobs = appContext.blobs

  const [selectedImage, setSelectedImage] = useState(
    standardDetails?.settingsLabelPhoto
  );

  console.log("SettingsLabelPage");
  const backPressed = () => {
    appContext.setStandardDetails({
      ...standardDetails,
      settingsLabelPhoto: selectedImage,
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

    const formData = new FormData();

    blobs.forEach((blob, index) => {
      formData.append(`image${index}`, blob, `image${index}.jpg`);  
    });

    appContext.setStandardDetails({
      ...standardDetails,
      settingsLabelPhoto: selectedImage,
    });

    // submit

    if (jobType === "Install") {
      /*
      siteDetails, meterDetails, regulatorDetails, standardDetails
      */
      
      EcomHelper.showInfoMessage(
        "SiteDetails, MeterDetails, RegulatorDetails, and StandardDetails will be submitted"
      );

      const data = {
        mprn: siteDetails?.mprn,
        jobType: "install",
        ...siteDetails,
        ...meterDetails,
        ...regulatorDetails,
        ...standardDetails,
      }

      formData.append("data", data)

      axios
        .post(
          "http://test.ecomdata.co.uk/api/data/",
          formData,
          axiosConfig
        )
        .then((response) => {
          // Handle the response data
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error.message);
        });
    } else if (jobType === "Removal") {
      console.log("==== removedSiteDetails ====");
      console.log(removedSiteDetails);
      console.log("==== removedMeterDetails ====");
      console.log(removedMeterDetails);
      console.log("==== standardDetails ====");
      console.log(standardDetails);
      EcomHelper.showInfoMessage(
        "RemovedSiteDetails, RemovedMeterDetails, and StandardDetails will be submitted"
      );

      const data = {
        mprn: siteDetails?.mprn,
        jobType: "Removal",
        ...removedSiteDetails,
        ...removedMeterDetails,
        ...standardDetails,
      }

      formData.append("data", data)

      axios
        .post(
          "http://test.ecomdata.co.uk/api/data/",
          formData,
          axiosConfig
        )
        .then((response) => {
          // Handle the response data
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error.message);
        });
    } else if (jobType === "Exchange") {
      console.log("==== removedSiteDetails ====");
      console.log(removedSiteDetails);
      console.log("==== removedMeterDetails ====");
      console.log(removedMeterDetails);
      console.log("==== siteDetails ====");
      console.log(siteDetails);
      console.log("==== meterDetails ====");
      console.log(meterDetails);
      console.log("==== regulatorDetails ====");
      console.log(regulatorDetails);
      console.log("==== standardDetails ====");
      console.log(standardDetails);
      EcomHelper.showInfoMessage(
        "RemovedSiteDetails, RemovedMeterDetails, SiteDetails, MeterDetails, RegulatorDetails, and StandardDetails will be submitted"
      );

      const data = {
        mprn: siteDetails?.mprn,
        jobType: "Exchange",
        ...removedSiteDetails,
        ...removedMeterDetails,
        ...siteDetails,
        ...meterDetails,
        ...regulatorDetails,
        ...standardDetails,
      }

      formData.append("data", data)

      axios
        .post(
          "http://test.ecomdata.co.uk/api/data/",
          formData,
          axiosConfig
        )
        .then((response) => {
          // Handle the response data
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error.message);
        });
    } else if (jobType === "Warrant") {
      console.log("==== warrantDetails ====");
      console.log(warrantDetails);
      console.log("==== removedSiteDetails ====");
      console.log(removedSiteDetails);
      console.log("==== removedMeterDetails ====");
      console.log(removedMeterDetails);
      console.log("==== standardDetails ====");
      console.log(standardDetails);
      EcomHelper.showInfoMessage(
        "warrantDetails, RemovedSiteDetails, RemovedMeterDetails, and StandardDetails will be submitted"
      );

      const data = {
        mprn: siteDetails?.mprn,
        jobType: "Warrant",
        ...warrantDetails,
        ...removedMeterDetails,
        ...removedMeterDetails,
        ...standardDetails,
      }

      formData.append("data", data)

      axios
        .post(
          "http://test.ecomdata.co.uk/api/data/",
          formData,
          axiosConfig
        )
        .then((response) => {
          // Handle the response data
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error.message);
        });
    } else if (jobType === "Maintenance") {
      console.log("==== maintenanceDetails ====");
      console.log(maintenanceDetails);
      console.log("==== removedSiteDetails ====");
      console.log(removedSiteDetails);
      console.log("==== removedMeterDetails ====");
      console.log(removedMeterDetails);
      console.log("==== standardDetails ====");
      console.log(standardDetails);
      EcomHelper.showInfoMessage(
        "MaintenanceDetails, RemovedSiteDetails, RemovedMeterDetails, and StandardDetails will be submitted"
      );

        const data = {
          mprn: siteDetails?.mprn,
          jobType: "Maintenance",
          ...maintenanceDetails,
          ...removedSiteDetails,
          ...removedMeterDetails,
          ...standardDetails,
        }

        formData.append("data", data)

      axios
        .post(
          "http://test.ecomdata.co.uk/api/data/",
          formData,
          axiosConfig
        )
        .then((response) => {
          // Handle the response data
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error.message);
        });
    }

    navigation.navigate("SubmitSuccessPage");
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
          rightBtnText={"Submit"}
          centerText={title}
          leftBtnPressed={backPressed}
          rightBtnPressed={nextPressed}
        />
        <View style={styles.spacer} />
        <View style={styles.body}>
          <Text type={TextType.BODY_1} style={{ textAlign: "left" }}>
            {`Settings Label`}
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

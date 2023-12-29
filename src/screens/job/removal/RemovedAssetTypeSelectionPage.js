import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { unitH, unitW, width } from "../../../utils/constant";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import Text from "../../../components/Text";
import { TextType } from "../../../theme/typography";
import TextInput from "../../../components/TextInput";
import SwitchWithTitle from "../../../components/Switch";
import { AppContext } from "../../../context/AppContext";
import EcomHelper from "../../../utils/ecomHelper";

function RemovedAssetTypeSelectionPage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  const jobType = appContext.jobType;
  const removedMeterDetails = appContext.removedMeterDetails;

  const [isMeter, setIsMeter] = useState(removedMeterDetails?.isMeter);
  const [isAmr, setIsAmr] = useState(removedMeterDetails?.isAmr);
  const [isCorrector, setIsCorrector] = useState(
    removedMeterDetails?.isCorrector
  );
  console.log("RemovedAssetTypeSelectionPage");
  const backPressed = () => {
    appContext.setRemovedMeterDetails({
      isMeter: isMeter,
      isAmr: isAmr,
      isCorrector: isCorrector,
    });
    navigation.goBack();
  };
  const nextPressed = () => {
    if (!isMeter && !isAmr && !isCorrector) {
      EcomHelper.showInfoMessage(
        "You can move next if at least 1 asset type is selected"
      );
      return;
    }

    appContext.setRemovedMeterDetails({
      isMeter: isMeter,
      isAmr: isAmr,
      isCorrector: isCorrector,
    });

    if (isCorrector) {
      navigation.navigate("CorrectorDetailsPage");
    } else if (isAmr) {
      navigation.navigate("DataLoggerDetailsPage");
    } else {
      //isMeter
      navigation.navigate("NewEcvPhotoPage");
    }
  };

  return (
    <SafeAreaView style={styles.content}>
      <Header
        hasLeftBtn={true}
        hasCenterText={true}
        hasRightBtn={true}
        centerText={""}
        leftBtnPressed={backPressed}
        rightBtnPressed={nextPressed}
      />
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView style={styles.content}>
          <View style={styles.body}>
            <Text type={TextType.CAPTION_3}>{jobType}</Text>
            <SwitchWithTitle
              title={"Meter"}
              value={isMeter}
              onValueChange={(e) => {
                setIsMeter(e);
              }}
            />
            <View style={styles.spacer} />
            <SwitchWithTitle
              title={"AMR"}
              value={isAmr}
              onValueChange={(e) => {
                setIsAmr(e);
              }}
            />
            <View style={styles.spacer} />
            <SwitchWithTitle
              title={"Corrector"}
              value={isCorrector}
              onValueChange={(e) => {
                setIsCorrector(e);
              }}
            />
            <View style={styles.spacer} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginHorizontal: width * 0.1,
  },
  mprn: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "60%",
    height: unitH * 40,
    marginLeft: unitW * 30,
    // alignSelf: 'center',
  },

  spacer: {
    height: unitH * 20,
  },
});

export default RemovedAssetTypeSelectionPage;

import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { isIos, unitH, width } from "../../../utils/constant";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import Text from "../../../components/Text";
import OptionalButton from "../../../components/OptionButton";
import EcomDropDown from "../../../components/DropDown";
import TextInput from "../../../components/TextInput";
import { AppContext } from "../../../context/AppContext";
import EcomHelper from "../../../utils/ecomHelper";

function StandardPage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const title = jobType === "Install" ? "New Meter Details" : jobType;
  const standardDetails = appContext.standardDetails;
  const meterDetails = appContext.meterDetails;

  const [testPassed, setTestPassed] = useState(standardDetails?.testPassed);
  const [confirmStandard, setConfirmStandard] = useState(
    standardDetails?.confirmStandard
  );
  const [riddorReportable, setRiddorReportable] = useState(
    standardDetails?.riddorReportable == null
      ? meterDetails?.isStandard
      : standardDetails?.riddorReportable
  );
  const [useOutlet, setUseOutlet] = useState(standardDetails?.useOutlet);
  const [pressure, setPressure] = useState(standardDetails?.pressure);
  const [confirmText, setConfirmText] = useState(standardDetails?.confirmText);
  const [signature, setSignature] = useState(standardDetails?.signature);

  console.log("StandardPage");

  const nextPressed = () => {
    if (testPassed == null) {
      EcomHelper.showInfoMessage("Please answer if tightness test passed");
      return;
    }
    if (confirmStandard == null) {
      EcomHelper.showInfoMessage(
        "Please answer if the network service/ECV confirm to standards"
      );
      return;
    }
    if (riddorReportable == null) {
      EcomHelper.showInfoMessage("Please answer if RIDDOR reportable");
      return;
    }
    if (useOutlet == null) {
      EcomHelper.showInfoMessage("Please answer if Outlet kit is used");
      return;
    }
    if (pressure == null) {
      EcomHelper.showInfoMessage("Please choose inlet pressure");
      return;
    }
    if (confirmText == null) {
      EcomHelper.showInfoMessage("Please confirm if all works was carried out");
      return;
    }
    if (signature == null) {
      EcomHelper.showInfoMessage("Please enter signature");
      return;
    }

    appContext.setStandardDetails({
      ...standardDetails,
      testPassed: testPassed,
      confirmStandard: confirmStandard,
      riddorReportable: riddorReportable,
      useOutlet: useOutlet,
      pressure: pressure,
      confirmText: confirmText,
      signature,
    });
    appContext.setMeterDetails({
      ...meterDetails,
      isStandard: riddorReportable,
    });

    if (riddorReportable === true) {
      navigation.navigate("RiddorReportPage");
    } else {
      if (confirmStandard === true) {
        navigation.navigate("SnClientInfoPage");
      } else {
        navigation.navigate("CompositeLabelPage");
      }
    }
  };
  const backPressed = () => {
    appContext.setStandardDetails({
      ...standardDetails,
      testPassed: testPassed,
      confirmStandard: confirmStandard,
      riddorReportable: riddorReportable,
      useOutlet: useOutlet,
      pressure: pressure,
      confirmText: confirmText,
      signature,
    });

    navigation.goBack();
  };

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
  ];

  return (
    <SafeAreaView style={styles.content}>
      <Header
        hasLeftBtn={true}
        hasCenterText={true}
        hasRightBtn={true}
        centerText={title}
        leftBtnPressed={backPressed}
        rightBtnPressed={nextPressed}
      />
      <KeyboardAvoidingView
        style={styles.content}
        behavior={isIos ? "padding" : null}
      >
        <ScrollView style={styles.content}>
          <View style={styles.spacer} />
          <View style={styles.body}>
            <Text>Tightness test passed</Text>
            <View style={styles.optionContainer}>
              <OptionalButton
                options={["Yes", "No"]}
                actions={[
                  () => {
                    setTestPassed(true);
                  },
                  () => {
                    setTestPassed(false);
                  },
                ]}
                value={testPassed == null ? null : testPassed ? "Yes" : "No"}
              />
            </View>
            <View style={styles.spacer} />
            <Text>Does the network service /ECV confirm to standards</Text>
            <View style={styles.optionContainer}>
              <OptionalButton
                options={["Yes", "No"]}
                actions={[
                  () => {
                    setConfirmStandard(true);
                  },
                  () => {
                    setConfirmStandard(false);
                  },
                ]}
                value={
                  confirmStandard == null
                    ? null
                    : confirmStandard
                    ? "Yes"
                    : "No"
                }
              />
            </View>
            <View style={styles.spacer} />
            <Text>RIDDOR reportable</Text>
            <View style={styles.optionContainer}>
              <OptionalButton
                options={["Yes", "No"]}
                actions={[
                  () => {
                    setRiddorReportable(true);
                  },
                  () => {
                    setRiddorReportable(false);
                  },
                ]}
                value={
                  riddorReportable == null
                    ? null
                    : riddorReportable
                    ? "Yes"
                    : "No"
                }
              />
            </View>
            <View style={styles.spacer} />
            <Text>Outlet kit be used</Text>
            <View style={styles.optionContainer}>
              <OptionalButton
                options={["Yes", "No"]}
                actions={[
                  () => {
                    setUseOutlet(true);
                  },
                  () => {
                    setUseOutlet(false);
                  },
                ]}
                value={useOutlet == null ? null : useOutlet ? "Yes" : "No"}
              />
            </View>
            <View style={styles.spacer} />
            <View style={styles.row}>
              <EcomDropDown
                width={width * 0.35}
                value={pressure}
                valueList={data}
                placeholder={"Inlet pressure"}
                onChange={(item) => {
                  console.log(item);
                  //{"_index": 1, "label": "Item 2", "value": "2"}
                  setPressure(item);
                }}
              />
            </View>
            <View style={styles.spacer} />
            <Text>{`I confirm that all works have been carried out in 
accordance with current industry standards and 
health safety policies`}</Text>
            <View style={styles.spacer} />
            <View style={styles.row}>
              <TextInput
                value={confirmText}
                onChangeText={(text) => {
                  setConfirmText(text);
                }}
                style={{
                  ...styles.input,
                  width: width * 0.8,
                  height: unitH * 150,
                }}
                multiline={true}
              />
            </View>
            <View style={styles.spacer} />
            <Text>{`Signature`}</Text>
            <View style={styles.spacer} />
            <View style={styles.row}>
              <TextInput
                value={signature}
                onChangeText={(text) => {
                  setSignature(text);
                }}
                style={{
                  ...styles.input,
                  width: width * 0.8,
                  height: unitH * 100,
                }}
                multiline={true}
              />
            </View>
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
    marginHorizontal: width * 0.1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: width * 0.35,
    alignSelf: "center",
    height: unitH * 40,
  },
  optionContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: width * 0.35,
  },
  spacer: {
    height: unitH * 20,
  },
});

export default StandardPage;

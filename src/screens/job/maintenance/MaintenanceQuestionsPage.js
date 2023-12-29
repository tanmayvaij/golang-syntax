import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Text from "../../../components/Text";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { width, unitH } from "../../../utils/constant";
import { TextType } from "../../../theme/typography";
import TextInput, { TextInputWithTitle } from "../../../components/TextInput";
import OptionalButton from "../../../components/OptionButton";
import { AppContext } from "../../../context/AppContext";
import EcomHelper from "../../../utils/ecomHelper";

function MaintenanceQuestionsPage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const maintenanceDetails = appContext.maintenanceDetails;
  const jobType = appContext.jobType;
  const title = jobType === "Install" ? "New Meter Details" : jobType;
  const [isRisky, setIsRisky] = useState(maintenanceDetails?.isRisky);
  const [isCarryOut, setIsCarryOut] = useState(maintenanceDetails?.isCarryOut);
  const [isFitted, setIsFitted] = useState(maintenanceDetails?.isFitted);
  const [condition, setCondition] = useState(maintenanceDetails?.condition);
  const [oilLevel, setOilLevel] = useState(maintenanceDetails?.oilLevel);
  const [isClearPipes, setIsClearPipes] = useState(
    maintenanceDetails?.isClearPipes
  );
  const [notes, setNotes] = useState(maintenanceDetails?.notes);
  const [signature, setSignature] = useState(maintenanceDetails?.signature);
  const [isConfirm, setIsConfirm] = useState(maintenanceDetails?.isConfirm);

  console.log("MaintenanceQuestionsPaqge");

  const nextPressed = () => {
    if (isRisky == null) {
      EcomHelper.showInfoMessage(
        "Please answer if job covered by the gneric risk assessment"
      );
      return;
    }
    if (isCarryOut == null) {
      EcomHelper.showInfoMessage("Please answer if job can be carried out");
      return;
    }
    if (isFitted == null) {
      EcomHelper.showInfoMessage("Please answer if By-pass fitted");
      return;
    }
    if (condition == null) {
      EcomHelper.showInfoMessage("Please choose Condition of meter housing");
      return;
    }
    if (oilLevel == null) {
      EcomHelper.showInfoMessage("Please choose Metal oil level");
      return;
    }
    if (isClearPipes == null) {
      EcomHelper.showInfoMessage("Please answer if vent pipes clear");
      return;
    }
    if (notes == null) {
      EcomHelper.showInfoMessage("Please enter engineer notes");
      return;
    }
    if (isConfirm == null) {
      EcomHelper.showInfoMessage(
        "Please answer if Customer Installation Pipework and appliances confirm to current standards"
      );
      return;
    }
    appContext.setMaintenanceDetails({
      ...maintenanceDetails,
      isRisky: isRisky,
      isCarryOut: isCarryOut,
      isFitted: isFitted,
      condition: condition,
      oilLevel: oilLevel,
      isClearPipes: isClearPipes,
      notes: notes,
      signature,
      isConfirm: isConfirm,
    });
    navigation.navigate("RemovedSiteDetailsPage");
  };
  const backPressed = () => {
    appContext.setMaintenanceDetails({
      ...maintenanceDetails,
      isRisky: isRisky,
      isCarryOut: isCarryOut,
      isFitted: isFitted,
      condition: condition,
      oilLevel: oilLevel,
      isClearPipes: isClearPipes,
      notes: notes,
      signature,
      isConfirm: isConfirm,
    });
    navigation.goBack();
  };

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
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView style={styles.content}>
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          <View style={styles.body}>
            <View style={styles.optionContainer}>
              <Text type={TextType.CAPTION_2} style={styles.text}>
                {"Is the job covered by the generic risk assessment"}
              </Text>
              <View style={styles.option}>
                <OptionalButton
                  options={["Yes", "No"]}
                  actions={[
                    () => {
                      setIsRisky(true);
                    },
                    () => {
                      setIsRisky(false);
                    },
                  ]}
                  value={isRisky == null ? null : isRisky ? "Yes" : "No"}
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.optionContainer}>
              <Text type={TextType.CAPTION_2} style={styles.text}>
                {"Can the Job be carried out"}
              </Text>
              <View style={styles.option}>
                <OptionalButton
                  options={["Yes", "No"]}
                  actions={[
                    () => {
                      setIsCarryOut(true);
                    },
                    () => {
                      setIsCarryOut(false);
                    },
                  ]}
                  value={isCarryOut == null ? null : isCarryOut ? "Yes" : "No"}
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.optionContainer}>
              <Text type={TextType.CAPTION_2} style={styles.text}>
                {"Is a By-pass fitted"}
              </Text>
              <View style={styles.option}>
                <OptionalButton
                  options={["Yes", "No"]}
                  actions={[
                    () => {
                      setIsFitted(true);
                    },
                    () => {
                      setIsFitted(false);
                    },
                  ]}
                  value={isFitted == null ? null : isFitted ? "Yes" : "No"}
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.optionContainer}>
              <Text
                type={TextType.CAPTION_2}
                style={{ ...styles.text, width: width * 0.4 }}
              >
                {"Condition of meter housing"}
              </Text>
              <View style={styles.option}>
                <OptionalButton
                  options={["Poor", "ok", "good"]}
                  actions={[
                    () => {
                      setCondition("Poor");
                    },
                    () => {
                      setCondition("ok");
                    },
                    () => {
                      setCondition("good");
                    },
                  ]}
                  value={condition}
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.optionContainer}>
              <Text
                type={TextType.CAPTION_2}
                style={{ ...styles.text, width: width * 0.18 }}
              >
                {"Meter oil level"}
              </Text>
              <View style={styles.option}>
                <OptionalButton
                  options={["Low", "ok", "overfilled", "N/A"]}
                  actions={[
                    () => {
                      setOilLevel("Low");
                    },
                    () => {
                      setOilLevel("ok");
                    },
                    () => {
                      setOilLevel("overfilled");
                    },
                    () => {
                      setOilLevel("N/A");
                    },
                  ]}
                  value={oilLevel}
                  style={{ width: width * 0.18 }}
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.optionContainer}>
              <Text
                type={TextType.CAPTION_2}
                style={{ ...styles.text, width: width * 0.4 }}
              >
                {"vent pipes clear"}
              </Text>
              <View style={styles.option}>
                <OptionalButton
                  options={["Yes", "No", "N/A"]}
                  actions={[
                    () => {
                      setIsClearPipes("Yes");
                    },
                    () => {
                      setIsClearPipes("No");
                    },
                    () => {
                      setIsClearPipes("N/A");
                    },
                  ]}
                  value={isClearPipes}
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.spacer} />
            <View style={styles.noteContainer}>
              <TextInputWithTitle
                title={"engineers notes"}
                onChangeText={(e) => {
                  setNotes(e);
                }}
                style={styles.input}
                multiline={true}
                numberOfLines={5}
                value={notes}
              />
            </View>
            <View style={styles.spacer} />
            <View style={{ marginHorizontal: 20 }}>
            <TextInputWithTitle
              title={"Signature"}
              onChangeText={(e) => {
                setSignature(e);
              }}
              style={{ backgroundColor: "white" }}
              value={signature}
            />
            </View>
            <View style={styles.spacer} />
            <View style={styles.optionContainer}>
              <Text
                type={TextType.CAPTION_2}
                style={{ ...styles.text, width: width * 0.6 }}
              >
                {
                  "Does the Customer Installation Pipework and appliances confirm to current standards"
                }
              </Text>
              <View style={styles.option}>
                <OptionalButton
                  options={["Yes", "No"]}
                  actions={[
                    () => {
                      setIsConfirm(true);
                    },
                    () => {
                      setIsConfirm(false);
                    },
                  ]}
                  value={isConfirm == null ? null : isConfirm ? "Yes" : "No"}
                />
              </View>
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
    marginVerticalHorizontal: width * 0.1,
  },
  optionContainer: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    width: width * 0.5,
    textAlign: "left",
    lineHeight: unitH * 20,
  },
  option: {
    justifyContent: "center",
  },
  noteContainer: {
    width: width * 0.9,
    alignSelf: "center",
  },
  input: {
    height: unitH * 100,
    alignSelf: "center",
  },

  spacer: {
    height: unitH * 20,
  },
});

export default MaintenanceQuestionsPage;

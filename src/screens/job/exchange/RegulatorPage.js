import React, { useContext, useRef, useState } from "react";
import {
  Button,
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
import TextInput from "../../../components/TextInput";
import OptionalButton from "../../../components/OptionButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import EcomHelper from "../../../utils/ecomHelper";
import { AppContext } from "../../../context/AppContext";
import BarcodeScanner from "../../../components/BarcodeScanner";

const alphanumericRegex = /^[a-zA-Z0-9]+$/;

function RegulatorPage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const title = jobType === "Install" ? "New Meter Details" : jobType;
  const regulatorDetails = appContext.regulatorDetails;

  const camera = useRef(null);
  const [serialNumber, setSerialNumber] = useState(
    regulatorDetails?.serialNumber
  );
  const [isModal, setIsModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isSealedRegulator, setIsSealedRegulator] = useState(
    regulatorDetails?.isSealedRegulator
  );
  const [isPurged, setIsPurged] = useState(regulatorDetails?.isPurged);
  const [isLabelled, setIsLabelled] = useState(regulatorDetails?.isLabelled);
  const [isVentilation, setIsVentilation] = useState(
    regulatorDetails?.isVentilation
  );
  const [isChatBox, setIsChatBox] = useState(regulatorDetails?.isChatBox);
  const [serialNoExist, setSerialNoExist] = useState(
    regulatorDetails?.serialNoExist
  );
  const [isAdditionalMaterial, setIsAdditionalMaterial] = useState(
    regulatorDetails?.isAdditionalMaterial
  );
  const [isNewLogger, setIsNewLogger] = useState(regulatorDetails?.isNewLogger);
  console.log("RegulatorPage");

  const nextPressed = () => {
    // validate
    if (serialNumber == null || serialNumber === "") {
      EcomHelper.showInfoMessage("Please scan regulator SN");
      return;
    }
    if (serialNoExist === null) {
      EcomHelper.showInfoMessage("Please answer if serial no exist");
      return;
    }
    if (isSealedRegulator == null) {
      EcomHelper.showInfoMessage("Please answer if regulator was sealed");
      return;
    }
    if (isPurged == null) {
      EcomHelper.showInfoMessage(
        "Please answer if new meter, customer appliances and pipe work been purged and relit satisfactory including a visual inspection"
      );
      return;
    }
    if (isLabelled == null) {
      EcomHelper.showInfoMessage(
        "Please answer if installation was correctly labelled"
      );
      return;
    }
    if (isVentilation == null) {
      EcomHelper.showInfoMessage(
        "Please answer if there is a purpose made ventilation"
      );
      return;
    }
    if (isChatBox == null) {
      EcomHelper.showInfoMessage(
        "Please answer if new chatter box has been installed"
      );
      return;
    }
    if (isAdditionalMaterial == null) {
      EcomHelper.showInfoMessage(
        "Please answer if there is any additional materials"
      );
      return;
    }

    appContext.setRegulatorDetails({
      ...regulatorDetails,
      serialNumber: serialNumber,
      date: date,
      isSealedRegulator: isSealedRegulator,
      isPurged: isPurged,
      isLabelled: isLabelled,
      isVentilation: isVentilation,
      isChatBox: isChatBox,
      isAdditionalMaterial: isAdditionalMaterial,
      isNewLogger: isNewLogger,
      serialNoExist: serialNoExist,
    });
    navigation.navigate("RegulatorPhotoPage");
  };
  const backPressed = () => {
    appContext.setRegulatorDetails({
      ...regulatorDetails,
      serialNumber: serialNumber,
      date: date,
      isSealedRegulator: isSealedRegulator,
      isPurged: isPurged,
      isLabelled: isLabelled,
      isVentilation: isVentilation,
      isChatBox: isChatBox,
      isAdditionalMaterial: isAdditionalMaterial,
      isNewLogger: isNewLogger,
      serialNoExist: serialNoExist,
    });
    navigation.goBack();
  };

  const scanBarcode = () => {
    setIsModal(true);
  };

  const barcodeRecognized = (codes) => {
    EcomHelper.showInfoMessage(codes.data);
    console.log(codes);
    setIsModal(false);
    setSerialNumber(codes.data);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const convertedDateTime = moment(selectedDate).format("MM/DD/YYYY");
    setDate(convertedDateTime);
    console.log(convertedDateTime);
  };

  const RepeatedComponent = ({ title, action1, action2, value }) => {
    return (
      <View style={styles.optionContainer}>
        <Text>{title}</Text>
        <View style={styles.spacer2} />
        <OptionalButton
          options={["Yes", "No"]}
          actions={[action1, action2]}
          value={value}
        />
      </View>
    );
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
          <View style={styles.body}>
            <View style={styles.row}>
              <View
                style={{
                  width: width * 0.45,
                  alignSelf: "flex-end",
                }}
              >
                <Text>Regulator serial number</Text>
                <View style={styles.spacer2} />
                <View style={{ ...styles.row, width: width * 0.35 }}>
                  <TextInput
                    onChangeText={(txt) => {
                      if (alphanumericRegex.test(txt)) setSerialNumber(txt);
                    }}
                    style={{
                      ...styles.input,
                      width: width * 0.25,
                      alignSelf: "flex-end",
                    }}
                    value={serialNumber}
                  />
                  <Button title="📷" onPress={scanBarcode} />
                </View>
              </View>
              <View style={{ width: width * 0.35, alignSelf: "flex-end" }}>
                <RepeatedComponent
                  title={"Has the Regulator been sealed"}
                  action1={() => {
                    setIsSealedRegulator(true);
                  }}
                  action2={() => {
                    setIsSealedRegulator(false);
                  }}
                  value={
                    isSealedRegulator == null
                      ? null
                      : isSealedRegulator === true
                      ? "Yes"
                      : "No"
                  }
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <Text>
              {
                "HAS THE NEW METER, CUSTOMERS APPLIANCES AND PIPE WORK BEEN PURGED AND RELIT SATISFACTORY INCLUDING A VISUAL INSPECTION"
              }
            </Text>
            <View style={styles.spacer} />
            <View style={{ ...styles.optionContainer, width: width * 0.4 }}>
              <OptionalButton
                options={["Yes", "No"]}
                actions={[
                  () => {
                    setIsPurged(true);
                  },
                  () => {
                    setIsPurged(false);
                  },
                ]}
                value={isPurged == null ? null : isPurged ? "Yes" : "No"}
              />
            </View>
            <View style={styles.spacer} />
            <RepeatedComponent
              title={"Installation correclty labelled"}
              action1={() => {
                setIsLabelled(true);
              }}
              action2={() => {
                setIsLabelled(false);
              }}
              value={isLabelled == null ? null : isLabelled ? "Yes" : "No"}
            />
            <View style={styles.spacer} />
            <RepeatedComponent
              title={"Is there purpose made ventilation"}
              action1={() => {
                setIsVentilation(true);
              }}
              action2={() => {
                setIsVentilation(false);
              }}
              value={
                isVentilation == null ? null : isVentilation ? "Yes" : "No"
              }
            />
            <View style={styles.spacer} />
            <RepeatedComponent
              title={"Has a new Chatterbox been installed"}
              action1={() => {
                setIsChatBox(true);
                setIsAdditionalMaterial(false);
                setIsNewLogger(false);
              }}
              action2={() => {
                setIsChatBox(false);
              }}
              value={isChatBox == null ? null : isChatBox ? "Yes" : "No"}
            />

            <View style={styles.spacer} />
            <RepeatedComponent
              title={"Does regulator have a serial number"}
              action1={() => {
                setSerialNoExist(true);
              }}
              action2={() => {
                setSerialNoExist(false);
              }}
              value={
                serialNoExist == null ? null : serialNoExist ? "Yes" : "No"
              }
            />

            <View style={styles.spacer} />
            <RepeatedComponent
              title={"Any additional materials"}
              action1={() => {
                setIsChatBox(false);
                setIsAdditionalMaterial(true);
                setIsNewLogger(false);
              }}
              action2={() => {
                setIsAdditionalMaterial(false);
              }}
              value={
                isAdditionalMaterial == null
                  ? null
                  : isAdditionalMaterial
                  ? "Yes"
                  : "No"
              }
            />
            {/* <View style={styles.spacer} />
            <View style={styles.row}>
              <View style={{ width: width * 0.35, alignItems: "flex-start" }}>
                <Text>OAMI inspection date</Text>
                <View style={styles.spacer2} />
                <DateTimePicker
                  value={moment(date, "MM/DD/YYYY").toDate()}
                  mode="date"
                  display="default"
                  minimumDate={new Date(2020, 10, 20)}
                  maximumDate={new Date(2040, 10, 20)}
                  onChange={handleDateChange}
                />
              </View>
            </View> */}
          </View>
          {isModal && <BarcodeScanner
            setIsModal={setIsModal}
            cameraRef={camera}
            onBarcodeRead={barcodeRecognized}
          />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  body: {
    marginHorizontal: width * 0.05,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  input: {
    width: width * 0.35,
    alignSelf: "center",
  },
  optionContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  spacer: {
    height: unitH * 20,
  },
  spacer2: {
    height: 10,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonIcon: {
    width: 20,
    height: 20,
    // Other styles for the close icon
  },
});

export default RegulatorPage;

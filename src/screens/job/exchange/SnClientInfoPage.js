import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Button as RNButton,
} from "react-native";
import { unitH, width } from "../../../utils/constant";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { TextInputWithTitle } from "../../../components/TextInput";
import Text, { CenteredText } from "../../../components/Text";
import { TextType } from "../../../theme/typography";
import OptionalButton from "../../../components/OptionButton";
import { PrimaryColors, Transparents } from "../../../theme/colors";
import { AppContext } from "../../../context/AppContext";
import EcomHelper from "../../../utils/ecomHelper";
import { EcomPressable as Button } from "../../../components/ImageButton";

function SnClientInfoPage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const jobType = appContext.jobType;
  const title = jobType === "Install" ? "New Meter Details" : jobType;

  const standardDetails = appContext.standardDetails;

  const [type, setType] = useState(standardDetails?.type);
  const [location, setLocation] = useState(standardDetails?.location);
  const [make, setMake] = useState(standardDetails?.make);
  const [model, setModel] = useState(standardDetails?.model);
  const [serialNumber, setSerialNumber] = useState(
    standardDetails?.serialNumber
  );
  const [descript, setDescript] = useState(standardDetails?.descript);
  const [isEscapeGas, setIsEscapeGas] = useState(standardDetails?.isEscapeGas);
  const [isMeterIssue, setIsMeterIssue] = useState(
    standardDetails?.isMeterIssue
  );
  const [isPipeworkIssue, setIsPipeworkIssue] = useState(
    standardDetails?.isPipeworkIssue
  );
  const [isChimneyFlute, setIsChimneyFlute] = useState(
    standardDetails?.isChimneyFlute
  );

  console.log({
    isChimneyFlute,
    isDisconnectDanger,
    isEscapeGas,
    isMeterIssue,
  });

  const [isVentilation, setIsVentilation] = useState(
    standardDetails?.isVentilation
  );
  const [isOther, setIsOther] = useState(standardDetails?.isOther);
  const [isDisconnectDanger, setIsDisconnectDanger] = useState(
    standardDetails?.isDisconnectDanger
  );
  const [isTurnOffDanger, setIsTurnOffDanger] = useState(
    standardDetails?.isTurnOffDanger
  );
  const [isNotRemove, setIsNotRemove] = useState(standardDetails?.isNotRemove);
  const [remedial, setRemedial] = useState(standardDetails?.remedial);

  const [info, setInfo] = useState({
    type: "",
    location: "",
    make: "",
    model: "",
    serialNumber: "",
    description: "",
  });

  const [tableData, setTableData] = useState([]);

  const [isModal, setIsModal] = useState(false);

  const backPressed = () => {
    appContext.setStandardDetails({
      ...standardDetails,
      type: type,
      location: location,
      make: make,
      model: model,
      serialNumber: serialNumber,
      descript: descript,
      isEscapeGas: isEscapeGas,
      isMeterIssue: isMeterIssue,
      isPipeworkIssue: isPipeworkIssue,
      isChimneyFlute: isChimneyFlute,
      isVentilation: isVentilation,
      isOther: isOther,
      isDisconnectDanger: isDisconnectDanger,
      isTurnOffDanger: isTurnOffDanger,
      isNotRemove: isNotRemove,
      remedial: remedial,
      tableData,
    });
    navigation.goBack();
  };

  const nextPressed = () => {
    if (type == null) {
      EcomHelper.showInfoMessage("Please enter type");
      return;
    }
    if (location == null) {
      EcomHelper.showInfoMessage("Please enter location");
      return;
    }
    if (make == null) {
      EcomHelper.showInfoMessage("Please enter make");
      return;
    }
    if (model == null) {
      EcomHelper.showInfoMessage("Please enter model");
      return;
    }
    if (serialNumber == null) {
      EcomHelper.showInfoMessage("Please enter serial number");
      return;
    }
    if (descript == null) {
      EcomHelper.showInfoMessage("Please enter description of fault");
      return;
    }
    if (isDisconnectDanger == null) {
      EcomHelper.showInfoMessage(
        'Please answer "Immediately dangerous has been disconnected and labelled do not use"'
      );
      return;
    }
    if (isTurnOffDanger == null) {
      EcomHelper.showInfoMessage(
        'Please answer "At risk, Has been turned off and labelled danger do not use"'
      );
      return;
    }
    if (isNotRemove == null) {
      EcomHelper.showInfoMessage(
        'Please answer "At risk, However turning off does not remove the risk"'
      );
      return;
    }
    if (remedial == null) {
      EcomHelper.showInfoMessage(
        'Please answer "Remdeial action required to rectify the unsafe situation"'
      );
      return;
    }

    appContext.setStandardDetails({
      ...standardDetails,
      type: type,
      location: location,
      make: make,
      model: model,
      serialNumber: serialNumber,
      descript: descript,
      isEscapeGas: isEscapeGas,
      isMeterIssue: isMeterIssue,
      isPipeworkIssue: isPipeworkIssue,
      isChimneyFlute: isChimneyFlute,
      isVentilation: isVentilation,
      isOther: isOther,
      isDisconnectDanger: isDisconnectDanger,
      isTurnOffDanger: isTurnOffDanger,
      isNotRemove: isNotRemove,
      remedial: remedial,
      tableData,
    });
    navigation.navigate("GasSafeWarningPage");
  };

  console.log("SnClientInfoPage");

  return (
    <SafeAreaView style={styles.flex}>
      <Header
        hasLeftBtn={true}
        hasCenterText={true}
        hasRightBtn={true}
        centerText={title}
        leftBtnPressed={backPressed}
        rightBtnPressed={nextPressed}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView style={styles.flex}>
          <View style={styles.spacer} />
          <Text type={TextType.CAPTION_2}>
            Add appliance / job installation
          </Text>
          <View style={styles.spacer} />
          <View style={styles.row}>
            <TextInputWithTitle
              title={"Type"}
              value={type}
              placeholder={""}
              onChangeText={(txt) => {
                setType(txt);
              }}
              containerStyle={styles.inputContainer}
            />
            <TextInputWithTitle
              title={"Location"}
              placeholder={""}
              value={location}
              onChangeText={(txt) => {
                setLocation(txt);
              }}
              containerStyle={styles.inputContainer}
            />
          </View>

          <View style={styles.spacer} />
          <View style={styles.row}>
            <TextInputWithTitle
              title={"Make"}
              placeholder={""}
              value={make}
              onChangeText={(txt) => {
                setMake(txt);
              }}
              containerStyle={styles.inputContainer}
            />
            <TextInputWithTitle
              title={"Model"}
              placeholder={""}
              value={model}
              onChangeText={(txt) => {
                setModel(txt);
              }}
              containerStyle={styles.inputContainer}
            />
          </View>

          <View style={styles.spacer} />
          <View style={styles.row}>
            <View>
              <TextInputWithTitle
                title={"Serial Number"}
                placeholder={""}
                value={serialNumber}
                keyboardType="numeric"
                onChangeText={(txt) => {
                  setSerialNumber(txt);
                }}
                containerStyle={styles.inputContainer}
              />
              <View style={styles.spacer} />
              <RNButton
                title="Add"
                onPress={() => {
                  setTableData((prev) => [
                    ...prev,
                    { type, location, model, make, serialNumber, descript },
                  ]);
                  setType("");
                  setLocation("");
                  setMake("");
                  setModel("");
                  setSerialNumber("");
                  setDescript("");
                }}
              />
            </View>
            <TextInputWithTitle
              title={"Description of fault"}
              value={descript}
              placeholder={""}
              onChangeText={(txt) => {
                setDescript(txt);
              }}
              style={{ height: unitH * 150 }}
              multiline={true}
              containerStyle={styles.inputContainer}
            />
          </View>

          <View style={styles.spacer} />
          <View
            style={{ ...styles.row, backgroundColor: Transparents.BlueColor2 }}
          >
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.18 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Escape of Gas"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.12 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Meter issue"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.18 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Pipework issue"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.18 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Chimney/Flute"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.14 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Ventilation"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.1 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Other"}
            </CenteredText>
          </View>
          <View
            style={{
              ...styles.row,
              backgroundColor: Transparents.Clear,
              borderBottomWidth: 1,
            }}
          >
            <View style={{ ...styles.headerCell, width: width * 0.18 }}>
              <Button
                onPress={() => {
                  let v = !isEscapeGas;
                  setIsEscapeGas(v);
                }}
              >
                <Text>{isEscapeGas ? "✅" : "❌"}</Text>
              </Button>
            </View>
            <View style={{ ...styles.headerCell, width: width * 0.12 }}>
              <Button
                onPress={() => {
                  setIsMeterIssue(!isMeterIssue);
                }}
              >
                <Text>{isMeterIssue ? "✅" : "❌"}</Text>
              </Button>
            </View>
            <View style={{ ...styles.headerCell, width: width * 0.18 }}>
              <Button
                onPress={() => {
                  setIsPipeworkIssue(!isPipeworkIssue);
                }}
              >
                <Text>{isPipeworkIssue ? "✅" : "❌"}</Text>
              </Button>
            </View>
            <View style={{ ...styles.headerCell, width: width * 0.18 }}>
              <Button
                onPress={() => {
                  setIsChimneyFlute(!isChimneyFlute);
                }}
              >
                <Text>{isChimneyFlute ? "✅" : "❌"}</Text>
              </Button>
            </View>
            <View style={{ ...styles.headerCell, width: width * 0.14 }}>
              <Button
                onPress={() => {
                  setIsVentilation(!isVentilation);
                }}
              >
                <Text>{isVentilation ? "✅" : "❌"}</Text>
              </Button>
            </View>
            <View style={{ ...styles.headerCell, width: width * 0.1 }}>
              <Button
                onPress={() => {
                  setIsOther(!isOther);
                }}
              >
                <Text>{isOther ? "✅" : "❌"}</Text>
              </Button>
            </View>
          </View>
          <View style={styles.spacer} />
          <View style={styles.row}>
            <View>
              <Text>{`Immediately dangerous 
has been disconnected and 
labelled do not use`}</Text>
              <View style={styles.spacer2} />
              <View style={styles.optionContainer}>
                <OptionalButton
                  options={["Yes", "No"]}
                  actions={[
                    () => {
                      setIsDisconnectDanger(true);
                    },
                    () => {
                      setIsDisconnectDanger(false);
                    },
                  ]}
                  value={isDisconnectDanger}
                />
              </View>
            </View>

            <View>
              <Text>{`At risk, Has been 
 turned off and 
labelled danger do not use`}</Text>
              <View style={styles.spacer2} />
              <View style={styles.optionContainer}>
                <OptionalButton
                  options={["Yes", "No"]}
                  actions={[
                    () => {
                      setIsTurnOffDanger(true);
                    },
                    () => {
                      setIsTurnOffDanger(false);
                    },
                  ]}
                  value={isTurnOffDanger}
                />
              </View>
            </View>
          </View>
          <View style={styles.spacer} />
          <View style={styles.row}>
            <View>
              <Text>{`At Risk, 
However turning off 
does not remove the risk`}</Text>
              <View style={styles.spacer2} />
              <View style={styles.optionContainer}>
                <OptionalButton
                  options={["Yes", "No"]}
                  actions={[
                    () => {
                      setIsNotRemove(true);
                    },
                    () => {
                      setIsNotRemove(false);
                    },
                  ]}
                  value={isNotRemove}
                />
              </View>
            </View>
            <View>
              <TextInputWithTitle
                title={
                  "Remedial action required to rectify the unsafe situation"
                }
                placeholder={""}
                onChangeText={(txt) => {
                  setRemedial(txt);
                }}
                value={remedial}
                style={{ height: unitH * 60 }}
                multiline={true}
                containerStyle={styles.inputContainer}
              />
            </View>
          </View>
          <View style={styles.spacer} />
          <View
            style={{ ...styles.row, backgroundColor: Transparents.BlueColor2 }}
          >
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Type"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Make"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Location"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Model"}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"serial no."}
            </CenteredText>
            <CenteredText
              containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
              type={TextType.HEADER_TABLE}
              style={styles.blackTxt}
            >
              {"Description"}
            </CenteredText>
          </View>

          {tableData.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  ...styles.row,
                  backgroundColor: Transparents.Clear,
                  borderBottomWidth: 1,
                }}
              >
                <CenteredText
                  containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
                  type={TextType.HEADER_TABLE}
                  style={styles.blackTxt}
                >
                  {item.type}
                </CenteredText>
                <CenteredText
                  containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
                  type={TextType.HEADER_TABLE}
                  style={styles.blackTxt}
                >
                  {item.make}
                </CenteredText>
                <CenteredText
                  containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
                  type={TextType.HEADER_TABLE}
                  style={styles.blackTxt}
                >
                  {item.location}
                </CenteredText>
                <CenteredText
                  containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
                  type={TextType.HEADER_TABLE}
                  style={styles.blackTxt}
                >
                  {item.model}
                </CenteredText>
                <CenteredText
                  containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
                  type={TextType.HEADER_TABLE}
                  style={styles.blackTxt}
                >
                  {item.serialNumber}
                </CenteredText>
                <CenteredText
                  containerStyle={{ ...styles.headerCell, width: width * 0.15 }}
                  type={TextType.HEADER_TABLE}
                  style={styles.blackTxt}
                >
                  {item.descript}
                </CenteredText>
              </View>
            );
          })}

          <View style={styles.spacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  content: {
    alignSelf: "center",
  },
  inputContainer: {
    width: width * 0.35,
  },
  row: {
    width: width * 0.9,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  optionContainer: {
    width: 100,
    justifyContent: "space-between",
  },
  spacer: {
    height: unitH * 20,
  },
  spacer2: {
    height: 10,
  },
  blackTxt: {
    color: "black",
    textAlign: "left",
  },
  headerCell: {
    textAlign: "center",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: PrimaryColors.Black,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderColor: PrimaryColors.Black,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SnClientInfoPage;

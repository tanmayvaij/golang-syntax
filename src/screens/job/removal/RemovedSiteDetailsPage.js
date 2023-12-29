import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { height, unitH, width } from "../../../utils/constant";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import TextInput, { TextInputWithTitle } from "../../../components/TextInput";
import { TextType } from "../../../theme/typography";
import OptionalButton from "../../../components/OptionButton";
import { AppContext } from "../../../context/AppContext";
import EcomHelper from "../../../utils/ecomHelper";
import EcomDropDown from "../../../components/DropDown";

const ukPostCodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/;
const phoneNumberRegex = /^\d{10}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function RemovedSiteDetailsPage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  const jobType = appContext.jobType;
  const removedSiteDetails = appContext.removedSiteDetails;

  console.log("RemovedSiteDetailsPage");
  const [companyName, setCompanyName] = useState(
    removedSiteDetails?.companyName ?? ""
  );
  const [buildingName, setBuildingName] = useState(
    removedSiteDetails?.buildingName ?? ""
  );

  const [mprn, setMprn] = useState(removedSiteDetails?.mprn ?? "");
  const [address1, setAddress1] = useState(removedSiteDetails?.address1 ?? "");
  const [address2, setAddress2] = useState(removedSiteDetails?.address2 ?? "");
  const [address3, setAddress3] = useState(removedSiteDetails?.address3 ?? "");
  const [town, setTown] = useState(removedSiteDetails?.town ?? "");
  const [county, setCounty] = useState(removedSiteDetails?.county ?? "");
  const [postCode, setPostCode] = useState(removedSiteDetails?.postCode ?? "");
  const [title, setTitle] = useState(removedSiteDetails?.title ?? "")
  const [contact, setContact] = useState(removedSiteDetails?.contact ?? "");
  const [email1, setEmail1] = useState(removedSiteDetails?.email1 ?? "");
  const [email2, setEmail2] = useState(removedSiteDetails?.email2 ?? "");
  const [number1, setNumber1] = useState(removedSiteDetails?.number1 ?? "");
  const [number2, setNumber2] = useState(removedSiteDetails?.number2 ?? "");
  const [instructions, setInstructions] = useState(
    removedSiteDetails?.instructions ?? ""
  );
  const [confirmContact, setConfirmContact] = useState(
    removedSiteDetails?.confirmContact
  );

  const backPressed = () => {
    appContext.setRemovedSiteDetails({
      ...removedSiteDetails,
      mprn: mprn,
      companyName: companyName,
      buildingName: buildingName,
      address1: address1,
      address2: address2,
      address3: address3,
      town: town,
      county: county,
      postCode: postCode,
      title: title,
      contact: contact,
      email1: email1,
      email2: email2,
      number1: number1,
      number2: number2,
      instructions: instructions,
      confirmContact: confirmContact,
    });
    // appContext.setStartRemoval(true);
    navigation.goBack();
  };

  const nextPressed = () => {
    if (buildingName === "") {
      EcomHelper.showInfoMessage("Please input Building Name");
      return;
    }
    if (address1 === "") {
      EcomHelper.showInfoMessage("Please input Address1");
      return;
    }
    if (town === "") {
      EcomHelper.showInfoMessage("Please input Town/City");
      return;
    }
    if (county === "") {
      EcomHelper.showInfoMessage("Please input County");
      return;
    }
    if (postCode === "") {
      EcomHelper.showInfoMessage("Please input Post Code");
      return;
    }
    if (!ukPostCodeRegex.test(postCode)) {
      EcomHelper.showInfoMessage("Not a valid uk post code");
      return;
    }
    if (!phoneNumberRegex.test(number1) || !phoneNumberRegex.test(number2)) {
      EcomHelper.showInfoMessage("Not a valid phone number");
      return;
    }
    if (!emailRegex.test(email1) || !emailRegex.test(email2)) {
      EcomHelper.showInfoMessage("Not a valid email");
      return;
    }
    if (confirmContact == null) {
      EcomHelper.showInfoMessage("Please make sure if all contact is correct");
      return;
    }
    if (!mprn) {
      EcomHelper.showInfoMessage("Please input MPRN");
      return;
    }
    if (mprn?.length < 5) {
      EcomHelper.showInfoMessage("MPRN should be 5 ~ 15 digits");
      return;
    }

    appContext.setRemovedSiteDetails({
      ...removedSiteDetails,
      mprn: mprn,
      companyName: companyName,
      buildingName: buildingName,
      address1: address1,
      address2: address2,
      address3: address3,
      town: town,
      county: county,
      postCode: postCode,
      title: title,
      contact: contact,
      number1: number1,
      number2: number2,
      email1: email1,
      email2: email2,
      instructions: instructions,
      confirmContact: confirmContact,
    });
    appContext.setStartRemoval(true);

    if (
      jobType === "Removal" ||
      jobType === "Exchange" ||
      jobType === "Warrant" ||
      jobType === "Maintenance"
    ) {
      navigation.navigate("RemovedSitePhotoPage");
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <Header
        hasLeftBtn={true}
        hasCenterText={true}
        hasRightBtn={true}
        centerText={""}
        leftBtnPressed={backPressed}
        rightBtnPressed={nextPressed}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView style={styles.flex}>
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Company name"}
            placeholder={"ECOM"}
            value={companyName}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, "");
              setCompanyName(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Building name/ number *"}
            placeholder={"the warehouse"}
            value={buildingName}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, "");
              setBuildingName(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />

          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"MPRN *"}
            placeholder={"mprn"}
            value={mprn}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^0-9]/g, "");
              const limitedText = filteredText.slice(0, 15);
              setMprn(limitedText);
            }}
            containerStyle={styles.inputContainer}
            keyboardType="numeric"
          />

          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Address 1 *"}
            placeholder={"example load"}
            value={address1}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, "");
              setAddress1(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Address 2"}
            placeholder={""}
            value={address2}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, "");
              setAddress2(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Address 3"}
            placeholder={""}
            value={address3}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, "");
              setAddress3(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Town/city *"}
            placeholder={""}
            value={town}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z]/g, "");
              setTown(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"County *"}
            placeholder={""}
            value={county}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z]/g, "");
              setCounty(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Post Code *"}
            placeholder={""}
            value={postCode}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s]/g, "");
              setPostCode(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />

          <View>
            <View style={{ marginHorizontal: 40 }}>
              <View style={styles.spacer2} />
              <EcomDropDown
                value={title}
                valueList={[
                  { _index: 1, label: "Mr", value: "Mr" },
                  { _index: 2, label: "Mrs", value: "Mrs" },
                  { _index: 3, label: "Ms", value: "Ms" },
                  { _index: 4, label: "Dr", value: "Dr" },
                ]}
                placeholder={"Title"}
                onChange={(e) => {
                  console.log(e);
                  setTitle(e);
                }}
              />
            </View>

            <View style={styles.spacer} />
            <TextInputWithTitle
              title={"Site Contact"}
              placeholder={""}
              value={contact}
              onChangeText={(txt) => {
                const filteredText = txt.replace(/[^a-zA-Z]/g, "");
                setContact(filteredText);
              }}
              containerStyle={styles.inputContainer}
            />
          </View>

          <View style={styles.spacer} />
          <View style={styles.contactContainer}>
            <Text type={TextType.CAPTION_2}>{"Contact Numbers"}</Text>
            <View style={styles.spacer2} />
            <View style={styles.contactContent}>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={number1}
                onChangeText={(txt) => {
                  const filteredText = txt.replace(/[^0-9]/g, "");
                  setNumber1(filteredText);
                }}
              />
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={number2}
                onChangeText={(txt) => {
                  const filteredText = txt.replace(/[^0-9]/g, "");
                  setNumber2(filteredText);
                }}
              />
            </View>
          </View>

          <View style={styles.spacer} />
          <View style={styles.contactContainer}>
            <Text type={TextType.CAPTION_2}>{"Emails"}</Text>
            <View style={styles.spacer2} />
            <View style={styles.contactContent}>
              <TextInput
                style={styles.input}
                value={email1}
                onChangeText={(txt) => {
                  setEmail1(txt);
                }}
              />
              <TextInput
                style={styles.input}
                value={email2}
                onChangeText={(txt) => {
                  setEmail2(txt);
                }}
              />
            </View>
          </View>

          <View style={styles.spacer} />
          <TextInputWithTitle
            title={"Contact Instructions"}
            placeholder={""}
            value={instructions}
            onChangeText={(txt) => {
              const filteredText = txt.replace(/[^a-zA-Z0-9\s@.]/g, "");
              setInstructions(filteredText);
            }}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          <View style={styles.optionContainer}>
            <Text type={TextType.CAPTION_2}>
              {"Is all contact details correct? *"}
            </Text>
            <OptionalButton
              options={["Yes", "No"]}
              actions={[
                () => {
                  setConfirmContact(true);
                },
                () => {
                  setConfirmContact(false);
                },
              ]}
              value={
                confirmContact ? "Yes" : confirmContact === false ? "No" : null
              }
            />
          </View>
          <View style={styles.spacer} />
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
  inputContainer: {
    width: width * 0.8,
    alignSelf: "center",
  },
  input: {
    width: "45%",
    alignSelf: "center",
  },
  contactContainer: {
    width: "80%",
    alignSelf: "center",
    alignItems: "flex-start",
  },
  contactContent: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  optionContainer: {
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  spacer: {
    height: unitH * 20,
  },
  spacer2: {
    height: unitH * 10,
  },
});

export default RemovedSiteDetailsPage;

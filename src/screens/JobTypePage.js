import React, { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { height, unitH } from "../utils/constant";
import { PrimaryColors } from "../theme/colors";
import { EcomPressable as Button } from "../components/ImageButton";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context";
import Header from "../components/Header";

function JobTypePage() {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  const navigateToPage = ({ name }) => {
    console.log(name);
    appContext.setPassedRemoval(false);
    appContext.setStartRemoval(false);
    navigation.navigate(name);
  };
  const backPressed = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.flex}>
      <Header
        hasLeftBtn={true}
        hasCenterText={true}
        hasRightBtn={false}
        centerText={""}
        leftBtnPressed={backPressed}
        rightBtnPressed={null}
      />
      <ScrollView style={styles.flex}>
        <View style={styles.body}>
          <Button
            onPress={() => {
              appContext.setJobTypes("Install");
              navigateToPage({ name: "SiteDetailsPage" });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonTxt}>Asset Install</Text>
          </Button>
          <View style={styles.spacer} />
          <Button
            onPress={() => {
              appContext.setJobTypes("Removal");
              navigateToPage({ name: "RemovedSiteDetailsPage" });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonTxt}>Asset Removal</Text>
          </Button>
          <View style={styles.spacer} />
          <Button
            onPress={() => {
              appContext.setJobTypes("Exchange");
              navigateToPage({ name: "RemovedSiteDetailsPage" });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonTxt}>Asset Exchange</Text>
          </Button>
          <View style={styles.spacer} />
          <Button
            onPress={() => {
              appContext.setJobTypes("Survey");
              navigateToPage({ name: "SurveyPage" });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonTxt}>Survey</Text>
          </Button>
          <View style={styles.spacer} />
          <Button
            onPress={() => {
              appContext.setJobTypes("Warrant");
              navigateToPage({ name: "WarrantPage" });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonTxt}>Warrant</Text>
          </Button>
          <View style={styles.spacer} />
          <Button
            onPress={() => {
              appContext.setJobTypes("Maintenance");
              navigateToPage({ name: "MaintenanceSiteDetailsPage" });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonTxt}>Maintenance / CallOut</Text>
          </Button>
          <View style={styles.spacer} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.85,
  },
  spacer: {
    height: unitH * 20,
  },
  button: {
    width: "70%",
    height: unitH * 50,
    backgroundColor: PrimaryColors.Blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
    borderColor: "black",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowOffset: {
      width: 2.5,
      height: 2.5,
    },
  },
  buttonTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
});

export default JobTypePage;

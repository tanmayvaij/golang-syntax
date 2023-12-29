import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { setItemAsync } from "expo-secure-store";
import TextInput from "../components/TextInput";
import { height, unitH, isIos } from "../utils/constant";
import { PrimaryColors, Transparents } from "../theme/colors";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const signIn = async () => {
    try {
      axios
        .post("http://test.ecomdata.co.uk/api/token/", { username, password })
        .then((res) => {
          console.log(res);
          setItemAsync("userToken", data.access).then(() => {
            navigation.navigate("Home");
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  const handleLoginPress = () => {
    setErrorMessage("");
    signIn();
  };

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={isIos ? "padding" : null}
      >
        <ScrollView style={styles.flex}>
          <View style={{ justifyContent: "center", height: height * 0.9 }}>
            <View style={styles.logoContainer}>
              <Image source={require("../../assets/icons/logo167.png")} />
            </View>
            <View style={styles.body}>
              {errorMessage.length > 0 && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder={"User Name"}
                style={styles.input}
              />
              <View style={styles.spacer} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={"Password"}
                secureTextEntry={true}
                style={styles.input}
              />
              <View style={styles.spacer} />
              <Pressable
                onPress={handleLoginPress}
                title="Submit"
                style={styles.button}
              >
                <Text style={styles.buttonTxt}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  flex: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    height: unitH * 50,
    backgroundColor: Transparents.SandColor2,
    borderRadius: 0,
    color: PrimaryColors.Black,
    paddingVertical: unitH * 10,
  },
  spacer: {
    height: unitH * 10,
  },
  button: {
    width: "70%",
    height: unitH * 50,
    backgroundColor: PrimaryColors.Blue,
    alignItems: "center",
    justifyContent: "center",
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: unitH * 10,
  },
});

export default LoginPage;

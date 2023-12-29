import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SubmitSuccessPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>SubmitSuccessPage</Text>
      <Button
        title="OK"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default SubmitSuccessPage;

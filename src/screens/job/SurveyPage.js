import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function SurveyPage() {
  return (
    <View style={styles.content}>
      <Text>Survey Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SurveyPage;

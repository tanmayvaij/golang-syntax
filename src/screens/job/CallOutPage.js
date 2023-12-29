import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function CallOutPage() {
  return (
    <View style={styles.content}>
      <Text>CallOut Page</Text>
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

export default CallOutPage;

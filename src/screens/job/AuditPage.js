import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function AuditPage() {
  return (
    <View style={styles.content}>
      <Text>Audit Page</Text>
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

export default AuditPage;

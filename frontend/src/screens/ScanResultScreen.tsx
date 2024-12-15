import { StyleSheet, Text, View } from 'react-native';

export default function ScanResultScreen() {
  return (
    <View style={styles.container}>
      <Text>ScanResultScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

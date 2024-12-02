import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function ActivityMetrics({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.rowLayout}>
      <Text style={{ ...styles.title, fontSize: 16 }}>{title}</Text>
      <Text style={{ ...styles.title, ...styles.value }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto',
    fontWeight: 500,
  },
  value: {
    fontSize: 14,
    color: '#828282',
  },
  rowLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

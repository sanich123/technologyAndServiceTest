import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function ErrorComponent({ error, refetch }: { error: unknown; refetch: () => object }) {
  return (
    <View>
      <Text variant="bodyLarge">{`An error occured: ${JSON.stringify(error)}`}</Text>
      <Button onPress={() => refetch()}>
        <Text variant="bodyLarge">Обновить страницу</Text>
      </Button>
    </View>
  );
}

import { MainScreen } from "./src/screens/main";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainScreen />
    </SafeAreaView>
  );
}

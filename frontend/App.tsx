import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { MainScreen } from "./src/screens/main";
import { SafeAreaView } from "react-native";
import { apiSlice } from "./src/store/api/api-slice";

export default function App() {
  return (
    <ApiProvider api={apiSlice}>
      <SafeAreaView style={{ flex: 1 }}>
        <MainScreen />
      </SafeAreaView>
    </ApiProvider>
  );
}

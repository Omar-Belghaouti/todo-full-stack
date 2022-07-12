import { Dimensions, StyleSheet } from "react-native";

export const AddTodoStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    padding: 10,
  },
  input: {
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: Dimensions.get("window").width - 100,
  },
});

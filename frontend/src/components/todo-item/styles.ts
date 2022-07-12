import { Dimensions, StyleSheet } from "react-native";

export const TodoItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 10,
    width: Dimensions.get("window").width,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: Dimensions.get("window").width - 170,
  },
  date: {
    fontSize: 12,
    color: "#ccc",
    marginRight: 10,
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

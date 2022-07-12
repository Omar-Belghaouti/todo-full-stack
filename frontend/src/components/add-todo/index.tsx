import { Button, Text, TextInput, View } from "react-native";
import { FC, useCallback, useState } from "react";

import { AddTodoStyles } from "./styles";

interface AddTodoProps {
  onAddPress: () => void;
}

export const AddTodo: FC<AddTodoProps> = ({ onAddPress }) => {
  const [text, setText] = useState("");
  const onAddPressHandler = useCallback(() => {
    if (text.length > 0) {
      onAddPress();
      setText("");
    } else {
      alert("Please enter some text");
    }
  }, [onAddPress, setText, text]);

  return (
    <View style={AddTodoStyles.container}>
      <TextInput
        style={AddTodoStyles.input}
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Add" onPress={onAddPressHandler} />
    </View>
  );
};

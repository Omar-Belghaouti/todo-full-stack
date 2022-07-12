import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FC, useEffect, useState } from "react";

import { EditTodoStyles } from "./styles";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import { Todo } from "../../models";

interface EditTodoProps {
  visible: boolean;
  todo: Todo | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const EditTodo: FC<EditTodoProps> = ({
  visible,
  todo,
  onSubmit,
  onCancel,
}) => {
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setCompleted(todo.completed);
    }
  }, [todo]);

  return (
    <Modal
      presentationStyle="overFullScreen"
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={EditTodoStyles.centeredView}>
        <View style={EditTodoStyles.modalView}>
          <TextInput
            style={EditTodoStyles.input}
            value={text}
            onChangeText={setText}
            multiline
          />
          <View style={EditTodoStyles.row}>
            <Text style={EditTodoStyles.text}>Completed ?</Text>
            <TouchableOpacity
              onPress={() => {
                setCompleted(!completed);
              }}
            >
              <FontAwesomeIcon
                name={completed ? "check-circle" : "check-circle-o"}
                color="#2196f3"
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={EditTodoStyles.row}>
            <Button title="Submit" onPress={onSubmit} />
            <Button title="Cancel" onPress={onCancel} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

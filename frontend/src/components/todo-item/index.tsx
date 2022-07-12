import { Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow, parseISO } from "date-fns";

import { FC } from "react";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import { Todo } from "../../models";
import { TodoItemStyles } from "./styles";

interface TodoItemProps {
  todo: Todo;
  onEditPress: () => void;
  onTogglePress: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  onEditPress,
  onTogglePress,
}) => {
  return (
    <View style={TodoItemStyles.container}>
      <View style={TodoItemStyles.row}>
        <TouchableOpacity onPress={onTogglePress}>
          <FontAwesomeIcon
            name={todo.completed ? "check-circle" : "check-circle-o"}
            color="#2196f3"
            size={30}
          />
        </TouchableOpacity>
        <Text
          style={[
            TodoItemStyles.text,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
            },
          ]}
          numberOfLines={3}
        >
          {todo.text}
        </Text>
      </View>
      <View style={TodoItemStyles.column}>
        <TouchableOpacity onPress={onEditPress}>
          <FontAwesomeIcon name="edit" color="#2196f3" size={25} />
        </TouchableOpacity>
        <Text style={TodoItemStyles.date}>
          {formatDistanceToNow(parseISO(todo.updatedAt))} ago
        </Text>
      </View>
    </View>
  );
};

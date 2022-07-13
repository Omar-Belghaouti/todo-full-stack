import { FlatList, Text, View } from "react-native";

import { FC } from "react";
import { Todo } from "../../models";
import { TodoItem } from "../todo-item";
import { TodoListStyles } from "./styles";

interface TodoListProps {
  todos: Todo[];
  onItemEditPress: (todo: Todo) => void;
  onItemTogglePress: (todo: Todo) => void;
  onItemDeletePress: (todo: Todo) => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  onItemEditPress,
  onItemTogglePress,
  onItemDeletePress,
}) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onEditPress={() => onItemEditPress(item)}
          onTogglePress={() => onItemTogglePress(item)}
          onDeletePress={() => onItemDeletePress(item)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => <Text>No todos here</Text>}
    />
  );
};

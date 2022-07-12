import { FC, useState } from "react";
import { Text, View } from "react-native";

import { AddTodo } from "../../components/add-todo";
import { EditTodo } from "../../components/edit-todo";
import { MainStyles } from "./styles";
import { Todo } from "../../models";
import { TodoList } from "../../components/todo-list";
import { testTodos } from "../../test";

interface MainScreenProps {}

export const MainScreen: FC<MainScreenProps> = ({}) => {
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  return (
    <View style={MainStyles.container}>
      <AddTodo
        onAddPress={() => {
          console.log("added");
        }}
      />
      <TodoList
        todos={testTodos}
        onItemEditPress={(item) => {
          setSelectedTodo(item);
          setShowEditTodo(true);
        }}
        onItemTogglePress={(item) => console.log(item)}
      />
      <EditTodo
        todo={selectedTodo}
        visible={showEditTodo}
        onSubmit={() => {}}
        onCancel={() => {
          setShowEditTodo(false);
        }}
      />
    </View>
  );
};

import { ActivityIndicator, Text, View } from "react-native";
import { FC, useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../store/api/api-slice";

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
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  return (
    <View style={MainStyles.container}>
      <AddTodo
        onAddPress={(text) => {
          addTodo({ text });
        }}
      />
      {isLoading && <ActivityIndicator />}
      {isSuccess && (
        <TodoList
          todos={todos}
          onItemEditPress={(item) => {
            setSelectedTodo(item);
            setShowEditTodo(true);
          }}
          onItemTogglePress={(item) =>
            updateTodo({
              id: item.id,
              completed: !item.completed,
              text: item.text,
            })
          }
          onItemDeletePress={(item) => deleteTodo({ id: item.id })}
        />
      )}
      {isError && <Text style={MainStyles.error}>{error.error}</Text>}
      <EditTodo
        todo={selectedTodo}
        visible={showEditTodo}
        onSubmit={(text, completed) =>
          updateTodo({
            id: selectedTodo!.id,
            completed,
            text,
          })
        }
        onCancel={() => {
          setShowEditTodo(false);
        }}
      />
    </View>
  );
};

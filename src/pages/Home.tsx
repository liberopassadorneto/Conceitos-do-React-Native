import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundTask = updatedTasks.find((item) => item.title === newTaskTitle);

    if (foundTask) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
      return false;
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks((oldState) => [...oldState, data]);
    }
  }

  function handleToggleTaskDone(taskId: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundTask = updatedTasks.find((item) => item.id === taskId);

    if (!foundTask) return false;
    else {
      foundTask.done = !foundTask.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(taskId: number) {
    //TODO - remove task from state
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundTask = updatedTasks.find((item) => item.id === taskId);

    if (!foundTask) return false;
    else {
      foundTask.title = taskNewTitle;
      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});

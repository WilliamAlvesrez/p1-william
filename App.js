import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { Check } from "lucide-react-native";
import TaskItem from "./componentes/TaskItem";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [sortOrder, setSortOrder] = useState("decrescente");

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Baixa");

  const addOrUpdateTask = () => {
    if (!taskName.trim()) {
      Alert.alert("Erro", "O nome da tarefa não pode estar vazio");
      return;
    }

    const newTask = {
      id: currentTask ? currentTask.id : Date.now(),
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
    };

    setTasks((currentTasks) => {
      if (currentTask) {
        // Atualizar tarefa existente
        return currentTasks.map((t) => (t.id === currentTask.id ? newTask : t));
      } else {
        // Adicionar nova tarefa
        return [...currentTasks, newTask];
      }
    });

    // Resetar estados
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("Baixa");
    setModalVisible(false);
    setCurrentTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setTaskPriority(task.priority);
    setModalVisible(true);
  };

  const sortTasks = () => {
    const priorityOrder = {
      Alta: 3,
      Media: 2,
      Baixa: 1,
    };

    const sortedTasks = [...tasks].sort((a, b) => {
      return sortOrder === "decrescente"
        ? priorityOrder[b.priority] - priorityOrder[a.priority]
        : priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setTasks(sortedTasks);
    setSortOrder(sortOrder === "decrescente" ? "crescente" : "decrescente");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Tarefas</Text>

      <Pressable style={styles.sortButton} onPress={sortTasks}>
        <Text style={styles.sortButtonText}>
          Ordenar:{" "}
          {sortOrder === "decrescente"
            ? "Maior Prioridade"
            : "Menor Prioridade"}
        </Text>
      </Pressable>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onEdit={editTask} onDelete={deleteTask} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Nenhuma tarefa cadastrada</Text>
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() => {
          setCurrentTask(null);
          setTaskName("");
          setTaskDescription("");
          setTaskPriority("Baixa");
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentTask ? "Editar Tarefa" : "Nova Tarefa"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da Tarefa"
              value={taskName}
              onChangeText={setTaskName}
            />

            <TextInput
              style={styles.input}
              placeholder="Descrição da Tarefa"
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline
            />

            <View style={styles.priorityContainer}>
              {["Baixa", "Media", "Alta"].map((priority) => (
                <Pressable
                  key={priority}
                  style={[
                    styles.priorityButton,
                    taskPriority === priority && styles.selectedPriority,
                  ]}
                  onPress={() => setTaskPriority(priority)}
                >
                  {taskPriority === priority && (
                    <Check color="white" size={16} />
                  )}
                  <Text style={styles.priorityButtonText}>{priority}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={addOrUpdateTask}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7FAFC",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2D3748",
  },
  sortButton: {
    backgroundColor: "#48BB78",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  sortButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4299E1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  priorityButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  selectedPriority: {
    backgroundColor: "#4299E1",
  },
  priorityButtonText: {
    marginLeft: 5,
    color: "black",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E53E3E",
  },
  cancelButtonText: {
    color: "#E53E3E",
    textAlign: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#4299E1",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
  },
  emptyListText: {
    textAlign: "center",
    color: "#718096",
    marginTop: 50,
  },
});

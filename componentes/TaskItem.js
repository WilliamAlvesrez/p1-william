import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Edit, Trash2 } from 'lucide-react-native';
import Prioridades from './Prioridades';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskContent}>
        <PriorityIcon priority={task.priority} />
        <View style={styles.taskText}>
          <Text style={styles.taskTitle}>{task.name}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      </View>
      <View style={styles.taskActions}>
        <Pressable onPress={() => onEdit(task)}>
          <Edit color="#4A5568" size={24} />
        </Pressable>
        <Pressable onPress={() => onDelete(task.id)}>
          <Trash2 color="#E53E3E" size={24} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  taskText: {
    marginLeft: 10,
    flex: 1
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748'
  },
  taskDescription: {
    fontSize: 14,
    color: '#718096'
  },
  taskActions: {
    flexDirection: 'row',
    gap: 15
  }
});

export default TaskItem;
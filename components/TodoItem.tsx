import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { Todo } from '../types/todo';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface TodoItemProps {
  todo: Todo;
  drag?: () => void;
  isActive?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, drag, isActive }) => {
  const { theme } = useTheme();
  const toggleTodo = useMutation(api.todo.toggleTodo);
  const deleteTodo = useMutation(api.todo.deleteTodo);

  const colors = Colors[theme];

  const handleToggle = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await toggleTodo({ id: todo._id });
  };

  const handleDelete = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await deleteTodo({ id: todo._id });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderBottomColor: colors.border },
        isActive && styles.activeItem,
      ]}
    >
      <TouchableOpacity
        onPress={handleToggle}
        style={[
          styles.checkCircle,
          { borderColor: todo.completed ? 'transparent' : colors.border },
          todo.completed && styles.checkCircleCompleted,
        ]}
      >
        {todo.completed && (
          <Ionicons name="checkmark" size={14} color="#fff" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onLongPress={drag} style={styles.textContainer}>
        <Text
          style={[
            styles.text,
            {
              color: todo.completed ? colors.textCompleted : colors.text,
              textDecorationLine: todo.completed ? 'line-through' : 'none',
            },
          ]}
        >
          {todo.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Ionicons name="close" size={18} color={colors.textCompleted} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  activeItem: {
    opacity: 0.5,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleCompleted: {
    backgroundColor: '#c058f3',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    letterSpacing: -0.25,
  },
  deleteButton: {
    padding: 4,
  },
});
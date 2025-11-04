import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { FilterType, Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { FilterTabs } from './FilterTabs';

const { width } = Dimensions.get('window');

export const TodoList: React.FC = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const todos = useQuery(api.todo.getTodos);
  const updateTodoOrder = useMutation(api.todo.updateTodoOrder);
  const clearCompleted = useMutation(api.todo.clearCompleted);

  const colors = Colors[theme];

  // Filter todos based on active filter
  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    
    switch (activeFilter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, activeFilter]);

  // Count active items
  const itemsLeft = useMemo(() => {
    if (!todos) return 0;
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const handleDragEnd = async ({ data }: { data: Todo[] }) => {
    // Update order for all todos
    try {
      for (let i = 0; i < data.length; i++) {
        await updateTodoOrder({
          todoId: data[i]._id,
          newOrder: i,
        });
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      await clearCompleted();
    } catch (error) {
      console.error('Error clearing completed:', error);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <TodoItem todo={item} drag={drag} isActive={isActive} />
      </ScaleDecorator>
    );
  };

  if (todos === undefined) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.cardBackground }]}>
        <ActivityIndicator size="large" color={Colors.common.primaryBlue} />
      </View>
    );
  }

  if (todos.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.emptyText, { color: colors.textCompleted }]}>
          No todos yet. Create one above!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.todoCard, { backgroundColor: colors.cardBackground }]}>
        <DraggableFlatList
          data={filteredTodos}
          onDragEnd={handleDragEnd}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          style={styles.draggableList}
          ListFooterComponent={
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              itemsLeft={itemsLeft}
              onClearCompleted={handleClearCompleted}
            />
          }
        />
      </View>

      <Text style={[styles.dragHint, { color: colors.textCompleted }]}>
        Drag and drop to reorder list
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoCard: {
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    minHeight: 200, // Changed from maxHeight to minHeight
  },
  draggableList: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    borderRadius: 5,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    height: 200,
  },
  emptyContainer: {
    borderRadius: 5,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    height: 200,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  dragHint: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
});
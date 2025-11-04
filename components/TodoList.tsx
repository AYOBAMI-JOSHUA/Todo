import { useMutation, useQuery } from 'convex/react';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Colors } from '../constants/Colors';
import { api } from '../convex/_generated/api';
import { useTheme } from '../hooks/useTheme';
import { FilterType, Todo } from '../types/todo';
import { FilterTabs } from './FilterTabs';
import { TodoItem } from './TodoItem';

const { width, height } = Dimensions.get('window');

export const TodoList: React.FC = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const todos = useQuery(api.todo.getTodos);
  console.log('TodoList render - raw todos:', todos);
  const updateTodoOrder = useMutation(api.todo.updateTodoOrder);
  const clearCompleted = useMutation(api.todo.clearCompleted);

  const colors = Colors[theme];

  // Filter todos based on active filter
  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    console.log('Filtering todos - active filter:', activeFilter);
    
    switch (activeFilter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, activeFilter]);
  console.log('Filtered todos:', filteredTodos);

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
    console.log('Rendering todo item:', item);
    return (
      <ScaleDecorator>
        <TodoItem todo={item} drag={drag} isActive={isActive} />
      </ScaleDecorator>
    );
  };

  if (todos === undefined) {
    console.log('TodoList in loading state');
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.cardBackground }]}>
        <ActivityIndicator size="large" color={Colors.common.primaryBlue} />
        <Text style={[styles.emptyText, { color: colors.textCompleted, marginTop: 10 }]}>
          Loading todos...
        </Text>
      </View>
    );
  }

  // FIXED: Check filteredTodos instead of todos
  if (filteredTodos.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.emptyText, { color: colors.textCompleted }]}>
          {activeFilter === 'all' 
            ? 'No todos yet. Create one above!'
            : `No ${activeFilter} todos`
          }
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
          containerStyle={styles.listContainer}
          contentContainerStyle={styles.listContent}
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
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  listContainer: {
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
    minHeight: 200,
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
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  dragHint: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
});
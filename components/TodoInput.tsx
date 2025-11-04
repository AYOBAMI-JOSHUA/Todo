import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';

export const TodoInput: React.FC = () => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const addTodo = useMutation(api.todo.addTodo);

  const colors = Colors[theme];

  const handleSubmit = async () => {
    if (text.trim()) {
      setIsLoading(true);
      try {
        const result = await addTodo({ text: text.trim() });
        console.log('addTodo result:', result);
        setText('');
      } catch (error) {
        console.error('Error adding todo:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <TouchableOpacity
        style={[styles.checkCircle, { borderColor: colors.border }]}
        disabled
      >
        {isLoading && <ActivityIndicator size="small" color={Colors.common.primaryBlue} />}
      </TouchableOpacity>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Create a new todo..."
        placeholderTextColor={colors.textCompleted || "#999"}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        editable={!isLoading}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.common.primaryBlue} />
        ) : (
          <Ionicons name="add" size={20} color={colors.text} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
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
  input: {
    flex: 1,
    fontSize: 16,
    letterSpacing: -0.25,
  },
  addButton: {
    padding: 8,
  },
});
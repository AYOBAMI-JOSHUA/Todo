import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { BackgroundImage } from '../components/BackgroundImage';
import { ThemeToggle } from '../components/ThemeToggle';
import { TodoInput } from '../components/TodoInput';
import { TodoList } from '../components/TodoList';

const { width, height } = Dimensions.get('window');
const isTabletOrDesktop = width >= 768;

export default function Index() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <BackgroundImage />

      <View style={[styles.content, isTabletOrDesktop && styles.contentDesktop]}>
        <View style={styles.header}>
          <Text style={styles.title}>T O D O</Text>
          <ThemeToggle />
        </View>

        {/* Todo Input */}
        <TodoInput />


        {/* Todo List - FIXED: Remove fixed height */}
        <View style={styles.todoListWrapper}>
          <TodoList />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    flex: 1, // Add flex: 1 to take full height
  },
  contentDesktop: {
    maxWidth: 540,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 12,
    color: '#ffffff',
  },
  todoListWrapper: {
    flex: 1, // FIXED: Use flex instead of fixed height
  },
});
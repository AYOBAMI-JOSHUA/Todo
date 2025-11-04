import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { BackgroundImage } from '../components/BackgroundImage';
import { ThemeToggle } from '../components/ThemeToggle';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';

const { width } = Dimensions.get('window');
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
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, isTabletOrDesktop && styles.contentDesktop]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>T O D O</Text>
            <ThemeToggle />
          </View>

          {/* Todo Input */}
          <TodoInput />

          {/* Todo List - Fixed height container to prevent nesting issues */}
          <View style={styles.todoListWrapper}>
            <TodoList />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    minHeight: '100%', // Ensure content takes full height
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
    minHeight: 200, // Ensure minimum height for the list
    flex: 1,
  },
});
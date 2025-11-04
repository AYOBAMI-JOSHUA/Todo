import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Colors } from '../constants/Colors';
import { FilterType } from '../types/todo';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  itemsLeft: number;
  onClearCompleted: () => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  itemsLeft,
  onClearCompleted,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View>
      {/* Bottom info bar */}
      <View
        style={[
          styles.infoContainer,
          { backgroundColor: colors.cardBackground, borderTopColor: colors.border },
        ]}
      >
        <Text style={[styles.itemsLeft, { color: colors.textCompleted }]}>
          {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left
        </Text>

        {/* Desktop filter tabs - only show on tablets/desktop */}
        {isTablet && (
          <View style={styles.desktopFilters}>
            <TouchableOpacity onPress={() => onFilterChange('all')}>
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === 'all' ? Colors.common.primaryBlue : colors.textCompleted },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onFilterChange('active')}>
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === 'active' ? Colors.common.primaryBlue : colors.textCompleted },
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onFilterChange('completed')}>
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === 'completed' ? Colors.common.primaryBlue : colors.textCompleted },
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={onClearCompleted}>
          <Text style={[styles.clearCompleted, { color: colors.textCompleted }]}>
            Clear Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mobile filter tabs - only show on mobile */}
      {!isTablet && (
        <View
          style={[
            styles.mobileFiltersContainer,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <TouchableOpacity onPress={() => onFilterChange('all')}>
            <Text
              style={[
                styles.filterText,
                { color: activeFilter === 'all' ? Colors.common.primaryBlue : colors.textCompleted },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFilterChange('active')}>
            <Text
              style={[
                styles.filterText,
                { color: activeFilter === 'active' ? Colors.common.primaryBlue : colors.textCompleted },
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFilterChange('completed')}>
            <Text
              style={[
                styles.filterText,
                { color: activeFilter === 'completed' ? Colors.common.primaryBlue : colors.textCompleted },
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  itemsLeft: {
    fontSize: 14,
  },
  desktopFilters: {
    flexDirection: 'row',
    gap: 18,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  clearCompleted: {
    fontSize: 14,
  },
  mobileFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 16,
    marginTop: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
});
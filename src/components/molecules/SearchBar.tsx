import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from '../atoms/TextField';
import { Search } from 'lucide-react-native';
import { colors } from '../../utils/colors';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      leftIcon={<Search size={20} color={colors.text.secondary} />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
  },
});

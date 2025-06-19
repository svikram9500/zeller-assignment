import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Option<T> = {
  label: string;
  value: T;
};

type RadioButtonOptionsProps<T extends string | number> = {
  title: string;
  options: Option<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
};

// Reusable radio button group with a title and selectable options.
// Supports string/number values and triggers onChange on selection.

const RadioButtonOptions = <T extends string | number>(
  props: RadioButtonOptionsProps<T>,
) => {
  const { title, options, selectedValue, onChange } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.radioGroup}>
        {options.map(option => {
          const selected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={option.value.toString()}
              testID={`option-${option.value}`}
              style={[styles.radioButton, selected && styles.radioSelected]}
              onPress={() => onChange(option.value)}
            >
              <View
                style={[
                  styles.radioOuter,
                  { borderColor: selected ? '#007bff' : '#ccc' },
                ]}
              >
                {selected && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 18
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  radioGroup: {
    flexDirection: 'column',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  radioSelected: {
    backgroundColor: '#e3f0ff',
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
  },
  radioCircleSelected: {
    borderColor: '#007bff',
    backgroundColor: '#007bff',
  },
  radioLabel: {
    fontSize: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
});

export default RadioButtonOptions;

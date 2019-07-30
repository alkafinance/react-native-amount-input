import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Colors, TextInput, Title} from 'react-native-paper';
import {AmountInput} from '../src';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingScrollView>
        <View style={styles.section}>
          <Title>With initial quantity</Title>
          <AmountInput defaultQuantity={0} style={styles.nativeTextInput} />
        </View>
        <View style={styles.section}>
          <Title>Without default quantity</Title>
          <AmountInput style={styles.nativeTextInput} />
        </View>
        <View style={styles.section}>
          <Title>With custom currency</Title>
          <AmountInput
            defaultQuantity={0}
            currency="EUR"
            style={styles.nativeTextInput}
          />
        </View>
        <View style={styles.section}>
          <Title>With custom TextInput component</Title>
          <AmountInput
            defaultQuantity={0}
            currency="EUR"
            TextInputComponent={TextInput}
          />
        </View>
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  nativeTextInput: {
    fontSize: 17,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
});

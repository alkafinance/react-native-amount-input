# react-native-amount-input

[![npm package](https://img.shields.io/npm/v/react-native-amount-input.svg)](https://www.npmjs.org/package/react-native-amount-input)
[![CircleCI Status](https://img.shields.io/circleci/project/github/alkafinance/react-native-amount-input/master.svg)](https://circleci.com/gh/alkafinance/workflows/react-native-amount-input/tree/master)
![Supports iOS](https://img.shields.io/badge/platforms-ios-lightgrey.svg)
![MIT License](https://img.shields.io/npm/l/react-native-amount-input.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

React Native JS-only amount (decimal) input component. Optimized for iOS.

<img src="./.github/demo.gif" width="auto" height="640">

## Getting started

`$ npm install react-native-amount-input --save`

## Usage

Import `AmountInput` and use it more or less like the regular `TextInput` component from React Native core.

```javascript
import {AmountInput} from 'react-native-amount-input';

function MyComponent() {
  return (
    <View>
      <AmountInput
        currency="USD"
        defaultQuantity={defaultQuantity}
        onChangeQuantity={handleChangeQuantity}
      />
    </View>
  );
}
```

## API

In addition to the regular `TextInput` props, you can also provide the following props for extra customization:

### Props

- [`currency`](#currency)
- [`defaultQuantity`](#defaultQuantity)
- [`onChangeQuantity`](#onChangeQuantity)
- [`TextInputComponent`](#TextInputComponent)

---

# Reference

## Props

### `currency`

Sets the currency for a fixed symbol prefix in the text input box. Has to be a [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) currency code.

| Type     | Required |
| -------- | -------- |
| `string` | No       |

### `defaultQuantity`

Provides an initial value that will change when the user starts typing.

| Type     | Required |
| -------- | -------- |
| `number` | No       |

### `onChangeQuantity`

Callback that is called when the entered quantity changes. Changed quantity is passed as a single string argument to the callback handler.

| Type             | Required |
| ---------------- | -------- |
| `number => void` | No       |

### `TextInputComponent`

Sets the base text input component.

| Type               | Required |
| ------------------ | -------- |
| `typeof TextInput` | No       |

## License

[MIT License](./LICENSE) © Alka, Inc

import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInput,
  TextInputProps,
} from 'react-native'
import {
  AmountInputAccessoryView,
  AmountInputAccessoryViewSymbol,
} from './AmountInputAccessoryView'
import {isNegativeZero} from './utils/isNegativeZero'
import {toFixedSafe} from './utils/toFixedSafe'
import {shiftDecimal} from './utils/shiftDecimal'

const MAX_AMOUNT = 1000000000000 // 1 trillion

export interface AmountInputProps
  extends Omit<
    TextInputProps,
    | 'autoCorrect'
    | 'keyboardType'
    | 'keyboardAppearance'
    | 'inputAccessoryViewID'
  > {
  currency?: string
  defaultQuantity?: number | null | undefined
  onChangeQuantity?: (newQuantity: number) => void
  TextInputComponent?: React.ComponentType<
    TextInputProps & {ref?: React.Ref<TextInput>}
  >
}

export const AmountInput = React.forwardRef(
  (
    {
      currency,
      defaultQuantity,
      onChangeQuantity,
      TextInputComponent = TextInput,

      value: valueProp,
      onChangeText,
      onKeyPress,
      ...textInputProps
    }: AmountInputProps,
    ref: React.Ref<TextInput>,
  ) => {
    const [value, setValue] = useState(() => {
      if (typeof defaultQuantity !== 'undefined') {
        if (defaultQuantity !== null) return toFixedSafe(defaultQuantity, 2)
      }
      if (typeof valueProp !== 'undefined') {
        if (valueProp !== null) return toFixedSafe(Number(valueProp), 2)
      }

      return ''
    })

    const inputAccessoryViewID = useMemo(
      () => `amount-input-accessory-view-${Date.now()}`,
      [],
    )
    const prefix = useMemo(() => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
      })

      return formatter.format(0)[0]
    }, [currency])

    useEffect(() => {
      if (onChangeQuantity) onChangeQuantity(Number(value))
      if (onChangeText) onChangeText(value)
    }, [onChangeQuantity, onChangeText, value])

    const handleKeyPress = useCallback(
      (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (onKeyPress) {
          onKeyPress(event)
        }

        const keyValue = event.nativeEvent.key

        const quantity = Number(value)
        if (keyValue === 'Backspace') {
          if (quantity === 0 && !isNegativeZero(quantity)) {
            setValue('')

            return
          }
        }

        let newQuantity = quantity
        if (/\d/.test(keyValue)) {
          newQuantity =
            shiftDecimal(quantity, 2, 1) +
            Number(
              `${
                isNegativeZero(quantity) || quantity < 0 ? '-0' : '0'
              }.0${keyValue}`,
            )
        } else if (keyValue === '-') {
          newQuantity = -quantity
        } else if (keyValue === 'Backspace') {
          newQuantity = shiftDecimal(quantity, 2, -1)
        }
        if (newQuantity > MAX_AMOUNT) newQuantity = quantity

        setValue(toFixedSafe(newQuantity, 2))
      },
      [onKeyPress, value],
    )
    const handleSymbolPress = useCallback(
      (symbol: AmountInputAccessoryViewSymbol) => {
        let newQuantity = Number(value)

        switch (symbol) {
          case 'C':
            newQuantity = 0
            break
          case '+/-':
            newQuantity = -Number(value)
            break
          default:
            break
        }

        setValue(toFixedSafe(newQuantity, 2))
      },
      [value],
    )

    return (
      <>
        <AmountInputAccessoryView
          onSymbolPress={handleSymbolPress}
          nativeID={inputAccessoryViewID}
        />
        <TextInputComponent
          placeholder={`${prefix}0.00`}
          onKeyPress={handleKeyPress}
          autoCorrect={false}
          keyboardType="numeric"
          keyboardAppearance="light"
          inputAccessoryViewID={inputAccessoryViewID}
          {...textInputProps}
          ref={ref}
          value={value === '' ? '' : `${prefix}${value}`}
        />
      </>
    )
  },
)

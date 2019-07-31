import React from 'react'
import {
  InputAccessoryView,
  InputAccessoryViewProps,
  StyleSheet,
  Text as NativeText,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native'

const {width: SCREEN_WIDTH} = Dimensions.get('window')
const BUTTON_PADDING_VERTICAL = 8
const BUTTON_MARGIN_HORIZONTAL = 6

const BUTTON_SYMBOLS = ['C', '+/-'] as const

export type AmountInputAccessoryViewSymbol = (typeof BUTTON_SYMBOLS)[number]

export interface AmountInputAccessoryViewProps extends InputAccessoryViewProps {
  onSymbolPress: (symbol: AmountInputAccessoryViewSymbol) => void
}

export const AmountInputAccessoryView: React.FC<
  AmountInputAccessoryViewProps
> = ({onSymbolPress, ...inputAccessoryViewProps}) => (
  <InputAccessoryView {...inputAccessoryViewProps}>
    <View style={styles.buttons}>
      {BUTTON_SYMBOLS.map(symbol => (
        <View key={symbol} style={styles.buttonWrapper}>
          <TouchableHighlight
            underlayColor="#b5c1d0"
            onPress={() => onSymbolPress(symbol)}
            style={styles.button}>
            <NativeText style={styles.buttonText}>{symbol}</NativeText>
          </TouchableHighlight>
        </View>
      ))}
    </View>
  </InputAccessoryView>
)

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: BUTTON_PADDING_VERTICAL,
    backgroundColor: '#d0d3d8' /* iOS light keyboard color */,
  },
  buttonWrapper: {
    marginHorizontal: BUTTON_MARGIN_HORIZONTAL,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#88898d',
    shadowRadius: 0,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 1},
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: SCREEN_WIDTH / BUTTON_SYMBOLS.length - BUTTON_MARGIN_HORIZONTAL,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '400',
  },
})

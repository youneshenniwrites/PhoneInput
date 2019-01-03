import React from 'react'
import { 
  View,
  Text,
  StyleSheet, 
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
// native base imports
import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

import data from './Countries'

// Default render of country flag
const defaultFlag = data.filter(
  obj => obj.name === 'United Kingdom'
  )[0].flag

export default class App extends React.Component {
  state = {
    flag: defaultFlag
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                {/* Phone input with native-base */}
                <Item rounded style={styles.itemStyle}>
                  <Icon
                    active
                    name='call'
                    style={styles.iconStyle}
                  />
                  {/* country flag */}
                  <View><Text>{this.state.flag}</Text></View>
                  <Icon
                    active
                    name='md-arrow-dropdown'
                    style={[styles.iconStyle, { marginLeft: 0 }]}
                  />
                  <Input 
                    placeholder='+44766554433'
                    placeholderTextColor='#adb4bc'
                    keyboardType={'phone-pad'}
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={false}
                    style={styles.input}                   
                  />
                </Item>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    bottom: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#aa73b7',
  },
  iconStyle: {
    color: '#5a52a5',
    fontSize: 28,
    marginLeft: 15
  },
  itemStyle: {
    marginBottom: 10,
  },
})

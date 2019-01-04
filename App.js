import React from 'react'
import { 
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet, 
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity
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
    flag: defaultFlag,
    modalVisible: false,
    phoneNumber: '',
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  showModal() {
    this.setState({ modalVisible: true })
  }
  hideModal() {
    this.setState({ modalVisible: false })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()
  }
  async selectCountry(country) {
    const countryData = await data
    try {
      // Get a country code
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get a country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Update the state
      this.setState({ phoneNumber: countryCode, flag: countryFlag })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }
  render() {
    const countryData = data
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
                    onPress={() => this.showModal()}
                  />
                  <Input 
                    placeholder='+44766554433'
                    placeholderTextColor='#adb4bc'
                    keyboardType={'phone-pad'}
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={false}
                    style={styles.inputStyle}    
                    value={this.state.phoneNumber}
                    ref='PhoneInput'
                    onChangeText={(val) => this.onChangeText('phoneNumber', val)}               
                  />
                  {/* Modal for country code and flag */}
                  <Modal
                    animationType="slide" // fade
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 7, marginTop: 80 }}>
                        <FlatList
                          data={countryData}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={
                            ({ item }) =>
                              <TouchableWithoutFeedback onPress={() => this.selectCountry(item.name)}>
                                <View style={styles.countryStyle}>
                                  <Text style={styles.textStyle}>
                                    {item.flag} {item.name} ({item.dial_code})
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                          }
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => this.hideModal()} 
                        style={styles.closeButtonStyle}>
                        <Text style={styles.textStyle}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
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
  inputStyle: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5a52a5',
  },
  textStyle: {
    padding: 5,
    fontSize: 18
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#99ff',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center', 
    borderTopWidth: 1,
    borderTopColor: '#211f',
    backgroundColor: '#fff3',
  }
})

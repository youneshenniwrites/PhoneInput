import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
// native base imports
import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Container style={styles.infoContainer}>
          {/* Phone input with native-base */}
          <Item rounded style={styles.itemStyle}>
            <Icon
              active
              name='call'
              style={styles.iconStyle}
            />
            <Input style={styles.input} />
          </Item>
        </Container>
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

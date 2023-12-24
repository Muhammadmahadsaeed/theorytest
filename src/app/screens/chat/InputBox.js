import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { theme } from '../../utils/colors';
import { CameraIcon, SendIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';

const InputBox = React.forwardRef((props, ref) => {

  const textInput = useRef()

  const [msg, setMsg] = useState('')

  return (
    <KeyboardAvoidingView
      style={{ width: '100%' }}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.btn}>
          <View style={styles.icon}>
            <CameraIcon />
          </View>
        </TouchableOpacity>
        <TextInput
          ref={textInput}
          placeholder={'Type your question here…'}
          style={styles.textInput}
          placeholderTextColor={theme.gray}
          multiline
          value={msg}
          onChangeText={(text) => setMsg(text)}
        />
        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.btn}>
          <View style={styles.icon}>
            <SendIcon />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
})

export default InputBox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.searchFieldBg,
    height: 44,
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    height: 20,
    width: 20,
  },
  textInput: {
    flex: 1,
    color: theme.inputText,
    fontSize: 14,
    fontFamily: Fonts.medium,
    height: 44,
    paddingLeft: 5,
    marginHorizontal: 5,
  },
})
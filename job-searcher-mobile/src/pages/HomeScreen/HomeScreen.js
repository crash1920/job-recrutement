import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Banner from '../../../assets/banner.jpg';

export default function HomeScreen() {
  const inputAccessoryViewID = 'uniqueID';
  const initialText = '';
  const [text, setText] = useState(initialText);
  return (
    <View style={styles.container}>
      <ImageBackground source={Banner} style={styles.image} >
        {/* Add text in the middle of the image */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>ti chnowa hedha mala app</Text>
          <TextInput style={styles.input}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={setText}
            value={text}
            placeholder={'Please type here…'}></TextInput>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    shadowColor: 'black',
    opacity: 0.7,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',

  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
});

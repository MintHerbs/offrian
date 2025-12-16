import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


function RoundButton({ onPress, icon }) {
  return (
    
      <Pressable onPress={onPress}>
        <View style={[styles.button, styles.buttonContent]}>
          {icon ? icon : null}
          
        </View>
      </Pressable>
   
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,           // Equal width and height
    height: 60,
    borderRadius: 30,    // Half of width/height
    backgroundColor: '#D8E4FF',
    justifyContent: 'center',
    alignItems: 'center',
},

  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

});

export default RoundButton;

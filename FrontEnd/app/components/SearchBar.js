import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  Keyboard,
  Image
} from 'react-native';

const SearchIcon = require('../assets/search/Search.png');
const TuneIcon = require('../assets/search/Tune.png');

const { height } = Dimensions.get('window');

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsExpanded(true);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, 
    }).start();
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    Animated.timing(animValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setIsExpanded(false);
    });
  };

  // Interpolations
  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0], 
  });

  const containerHeight = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, height], 
  });

  const horizontalMargin = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0], 
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          top: translateY,
          height: containerHeight,
          left: horizontalMargin,
          right: horizontalMargin,
          backgroundColor: isExpanded ? 'white' : 'transparent',
        },
      ]}
    >
      {/* Replaced SafeAreaView with a standard View. 
          The 'Screen' component now handles the top spacing.
      */}
      <View style={{ flex: 1 }}>
        <View style={styles.searchHeader}>
          <View style={styles.searchSection}>
            <Image source={SearchIcon} style={styles.iconLeft} />
            
            <TextInput
              style={styles.input}
              placeholder="Search..."
              onFocus={handleFocus}
              placeholderTextColor="#999"
            />

            <TouchableOpacity>
              {/* Removed tintColor to keep original PNG colors */}
              <Image source={TuneIcon} style={styles.iconRight} />
            </TouchableOpacity>
          </View>
          
          {isExpanded && (
            <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>

        {isExpanded && (
          <Animated.View style={[styles.content, { opacity: animValue }]}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.resultPlaceholder} />
            <View style={styles.resultPlaceholder} />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 999,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Requested background
    borderRadius: 100,          // Fully rounded pill shape
    paddingHorizontal: 18,
    height: 48,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#000',
  },
  iconLeft: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#999',
  },
  iconRight: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    // No tintColor here
  },
  cancelBtn: {
    marginLeft: 12,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  resultPlaceholder: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 10,
  }
});

export default SearchBar;
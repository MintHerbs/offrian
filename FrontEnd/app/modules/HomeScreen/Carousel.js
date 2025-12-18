import React, { useState } from 'react';
import {
  View, Image, StyleSheet, ScrollView, Dimensions
} from 'react-native';

// Import your SVG icons as components
// We go up two levels (../../) to get from modules/HomeScreen to the app folder, then into assets
import SelectedIcon from '../../assets/navigation/Selected.svg';
import NotSelectedIcon from '../../assets/navigation/NotSelected.svg';

function Carousel(props) {
  const { width } = Dimensions.get('window');
  const height = width * 0.7;

  const [active, setActive] = useState(0);

  const change = (event) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        scrollEventThrottle={50} // Improves scroll tracking smoothness
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}>
        {props.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width, height, resizeMode: 'cover' }}
          />
        ))}
      </ScrollView>

      {/* Pagination Container */}
      <View style={styles.pagination}>
        {props.images.map((image, index) => (
          <View key={index} style={styles.iconContainer}>
            {/* Logic: If this index is active, show Selected, otherwise show NotSelected */}
            {index === active ? (
              <SelectedIcon width={30} height={30} />
            ) : (
              <NotSelectedIcon width={7} height={7} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#000',
    },

  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,       // Adjusted to bring icons inside the image area slightly
    alignSelf: 'center',
  },
  iconContainer: {
    marginHorizontal: 5, // Adds small space between the icons
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carousel;
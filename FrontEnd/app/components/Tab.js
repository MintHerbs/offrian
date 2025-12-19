
import * as React from 'react';

import { useWindowDimensions, StyleSheet, Text } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import AdBanner from '../modules/HomeScreen/AdBanner';
import UsernameScreen from '../screens/UsernameScreen';
import Button from './button';





const renderScene = SceneMap({

  first: AdBanner,

  second: Button,

  third: UsernameScreen,

});


const routes = [

  { key: 'first', title: 'Upcoming' },

  { key: 'second', title: 'Completed' },

  { key: 'third', title: 'Cancelled' },

];


function Tabs() {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);


  return (



    <TabView

      style={styles.TabView}

      navigationState={{ index, routes }}

      renderScene={renderScene}

      onIndexChange={setIndex}

      initialLayout={{ width: layout.width }}

      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
          activeColor={styles.activeText.color}
          inactiveColor={styles.inactiveText.color}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color, margin: 8 }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />



  );

}


const styles = StyleSheet.create({

  TabView: {

    backgroundColor: '#fff',

    flex: 1,

  },

  tabBar: {

    backgroundColor: '#fff',

    elevation: 0,       // Removes shadow on Android

    shadowOpacity: 0,   // Removes shadow on iOS

  },

  indicator: {

    backgroundColor: '#417FFF',

    height: 3,          // Optional: thickness of the selection bar

  },

  activeText: {

    color: '#417FFF',

    fontWeight: '600',

  },

  inactiveText: {

    color: '#A4A4A4',

  }

});


export default Tabs; 
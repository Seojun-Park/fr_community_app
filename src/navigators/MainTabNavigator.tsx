import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import MenuStackNavigator from './MenuStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import ProfileStackNavigtor from './ProfileStackNavigator';

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Menu: undefined;
  Profile: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParamList>();

const BottomTabBar = ({navigation, state}) => {
  return (
    <React.Fragment>
      <BottomNavigation
        style={styles.tabStyle}
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab
          title="HOME"
          icon={<Icon {...{width: 25, height: 25}} name="home-outline" />}
        />
        <BottomNavigationTab
          title="SEARCH"
          icon={<Icon {...{width: 25, height: 25}} name="search-outline" />}
        />
        <BottomNavigationTab
          title="MENU"
          icon={<Icon {...{width: 25, height: 25}} name="menu-outline" />}
        />
        <BottomNavigationTab
          title="PROFILE"
          icon={<Icon {...{width: 25, height: 25}} name="person-outline" />}
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomTabBar {...props} />}>
      <MainTab.Screen name="Home" component={HomeStackNavigator} />
      <MainTab.Screen name="Search" component={SearchStackNavigator} />
      <MainTab.Screen name="Menu" component={MenuStackNavigator} />
      <MainTab.Screen name="Profile" component={ProfileStackNavigtor} />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 17,
    paddingTop: 10,
  },
});

export default MainTabNavigator;

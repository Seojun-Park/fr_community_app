import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import SearchStackNavigator from './SearchStackNavigator';
import ProfileStackNavigtor from './ProfileStackNavigator';
import ChatStackNavigator from './ChatStackNavigator';

export type MainTabParamList = {
  Home: {
    id: number;
    token: string;
  };
  Search: undefined;
  Chat: {
    id: number;
    token: string;
  };
  Profile: {
    id: number;
    token: string;
  };
};

interface IProps {
  route: {
    params: {
      id: number;
      token: string;
    };
  };
}

interface TabProps {
  navigation: any;
  state: any;
}

const MainTab = createBottomTabNavigator<MainTabParamList>();

const BottomTabBar: React.FC<TabProps> = ({navigation, state}) => {
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
          title="Chat"
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

const MainTabNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {id, token} = params;
  return (
    <MainTab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <MainTab.Screen
        name="Home"
        component={HomeStackNavigator}
        initialParams={{id}}
      />
      <MainTab.Screen name="Search" component={SearchStackNavigator} />
      <MainTab.Screen
        name="Chat"
        component={ChatStackNavigator}
        initialParams={{id}}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileStackNavigtor}
        initialParams={{id, token}}
      />
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

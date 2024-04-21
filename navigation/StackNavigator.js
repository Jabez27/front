  // src/navigation/StackNavigator.js

  import React from 'react';
  import { createStackNavigator } from '@react-navigation/stack';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
  import { StatusBar } from 'react-native';



  import GradePost from '../screens/Grade/GradePost';
  import LoginScreen from '../screens/Main/LoginScreen';
  import RegisterScreen from '../screens/Main/RegisterScreen';
  import FeedScreen from '../screens/Feed/FeedScreen'; 
  //import ChatScreen from '../screens/Chat/ChatScreen'; // Update import statement
  import GradebookScreen from '../screens/Grade/GradebookScreen'; // Update import statement
  import HomeworkScreen from '../screens/Home/HomeworkScreen'; // Update import statement
  import PostHomework from '../screens/Home/PostHomework';
  import FeedPost from '../screens/Feed/FeedPost';
  import MarksTable from '../screens/Grade/MarksTable'; 
  import GroupList from '../screens/Chat/GroupList';
  import CreateChatroomScreen from '../screens/Chat/CreateChatroom';
  import Chatroom from '../screens/Chat/Chatroom';
  import UserProfileScreen from '../screens/User/UserProfileScreen';
  import Payment from '../screens/Main/Payment';

  import { Entypo } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();



  const StackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#ffffff', }, headerTitleAlign: 'center', headerTintColor: '#000000', headerTitleStyle: { fontWeight: 'bold', },}}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNa} options={{ headerShown: false }} />
        <Stack.Screen name="MarksTable" component={MarksTable} />
        <Stack.Screen name="Chatroom" component={Chatroom} />
        <Stack.Screen name="Group" component={GroupList} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    );
  };

  const DrawerNa = () => {
    return (
      <>
        <StatusBar hidden={true} />
        <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: '#ffffff', }, headerTitleAlign: 'center', headerTintColor: '#000000', headerTitleStyle: { fontWeight: 'bold', },}}>
          <Drawer.Screen
            name="SBOA JC"
            component={BottomTabs}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="HomePost"
            component={PostHomework}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'document' : 'document-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="FeedPost"
            component={FeedPost}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'newspaper' : 'newspaper-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="GradePost"
            component={GradePost}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'trophy' : 'trophy-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="User"
            component={UserProfileScreen}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="CreateChat"
            component={CreateChatroomScreen}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </>
    );
  };




  const BottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Homework"
          component={HomeworkScreen}
          options={{
            tabBarLabel: "Homework",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="create" size={24} color="black" />
              ) : (
                <Ionicons name="create-outline" size={24} color="black" />
              ),

          }}
        />
        <Tab.Screen
          name="Chat"
          component={GroupList}
          options={{
            tabBarLabel: "Chatroom",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color="black" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Grade"
          component={GradebookScreen}
          options={{
            tabBarLabel: "Gradebook",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="black" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  export default StackNavigator;

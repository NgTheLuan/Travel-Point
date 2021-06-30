import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Linking } from "react-native";
import { Icon, Image } from "react-native-elements";

import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import Logout from "./LogoutComponent";
import QR from "./QRComponent";
import ShoppingCart from "./ShoppingCart";

// redux
import { connect } from "react-redux";
import {
  fetchLeaders,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from "../redux/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
});

const mapStateToProps = (state) => ({
  login: state.login,
});

const TabNavigator = createBottomTabNavigator();
function TabNavigatorScreen() {
  return (
    <TabNavigator.Navigator
      initialRouteName="Login"
      tabBarOptions={{
        activeBackgroundColor: "#205AA7",
        inactiveBackgroundColor: "#fff",
        activeTintColor: "#fff",
        inactiveTintColor: "gray",
      }}
    >
      <TabNavigator.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}

const QRNavigator = createStackNavigator();
function QRNavigatorScreen() {
  return (
    <QRNavigator.Navigator
      initialRouteName="QR"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <QRNavigator.Screen
        name="QR"
        component={QR}
        options={({ navigation }) => ({
          headerTitle: "QR",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </QRNavigator.Navigator>
  );
}

const LoginNavigator = createStackNavigator();
function LoginNavigatorScreen() {
  return (
    <LoginNavigator.Navigator
      initialRouteName="LoginRegister"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <LoginNavigator.Screen
        name="LoginRegister"
        component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: "Login | Register",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LoginNavigator.Navigator>
  );
}

const LogoutNavigator = createStackNavigator();
function LogoutNavigatorScreen() {
  return (
    <LogoutNavigator.Navigator
      initialRouteName="LogOut"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <LogoutNavigator.Screen
        name="LogOut"
        component={Logout}
        options={({ navigation }) => ({
          headerTitle: "Are you sure?",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LogoutNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: "Home",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </HomeNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return (
    <AboutNavigator.Navigator
      initialRouteName="About"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <AboutNavigator.Screen
        name="About"
        component={About}
        options={({ navigation }) => ({
          headerTitle: "About",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </AboutNavigator.Navigator>
  );
}

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerTitle: "Menu",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: "Hotels Detail" }}
      />
    </MenuNavigator.Navigator>
  );
}

function ReservationNavigatorScreen() {
  const ReservationNavigator = createStackNavigator();
  return (
    <ReservationNavigator.Navigator
      initialRouteName="Reservation"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ReservationNavigator.Screen
        name="Reservation"
        component={Reservation}
        options={({ navigation }) => ({
          headerTitle: "Reserve Table",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ReservationNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#205AA7",
          height: 80,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 2 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "bold",
              paddingLeft: "10%",
            }}
          >
            TravelPoint
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Image
            // source={{ uri: baseUrl + "images/logo.png" }}
            source={require("../assets/logo.png")}
            style={{ margin: 10, width: 80, height: 60 }}
          />
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        icon={({ focused, color, size }) => (
          <Icon name="help" size={size} color={focused ? "#7cc" : "#ccc"} />
        )}
        onPress={() =>
          Linking.openURL("https://reactnavigation.org/docs/getting-started")
        }
      />
    </DrawerContentScrollView>
  );
}

class MainNavigatorScreen extends Component {
  render() {
    return (
      <MainNavigator.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <MainNavigator.Screen
          name="Home"
          component={HomeNavigatorScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <Icon name="home" size={size} color={focused ? "#7cc" : "#ccc"} />
            ),
          }}
        />
        <MainNavigator.Screen
          name="Menu"
          component={MenuNavigatorScreen}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <Icon name="menu" size={size} color={focused ? "#7cc" : "#ccc"} />
            ),
          }}
        />
        {this.props.login.isLoggedIn ? (
          <>
            <MainNavigator.Screen
              name="Favorites"
              component={FavoritesNavigatorScreen}
              options={{
                headerShown: false,
                title: "Shopping Carts",
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="heart"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#7cc" : "#ccc"}
                  />
                ),
              }}
            />
            <MainNavigator.Screen
              name="Reservation"
              component={ReservationNavigatorScreen}
              options={{
                headerShown: false,
                title: "Reserve Table",
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="cutlery"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#7cc" : "#ccc"}
                  />
                ),
              }}
            />
            <MainNavigator.Screen
              name="Loyalty Card"
              component={QRNavigatorScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="qrcode"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#7cc" : "#ccc"}
                  />
                ),
              }}
            />
            <MainNavigator.Screen
              name="Log Out"
              component={LogoutNavigatorScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="sign-out"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#7cc" : "#ccc"}
                  />
                ),
              }}
            />
          </>
        ) : (
          <MainNavigator.Screen
            name="Login"
            component={LoginNavigatorScreen}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name="sign-in"
                  type="font-awesome"
                  size={size}
                  color={focused ? "#000000" : "#ccc"}
                />
              ),
            }}
          />
        )}

        <MainNavigator.Screen
          name="About"
          component={AboutNavigatorScreen}
          options={{
            headerShown: false,
            title: "About Us",
            drawerIcon: ({ focused, size }) => (
              <Icon name="info" size={size} color={focused ? "#7cc" : "#ccc"} />
            ),
          }}
        />
      </MainNavigator.Navigator>
    );
  }
}

function FavoritesNavigatorScreen() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerStyle: { backgroundColor: "#205AA7" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <FavoritesNavigator.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerTitle: "Shopping Cart",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <FavoritesNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{
          headerTitle: "Dish Detail",
        }}
      />
    </FavoritesNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen login={this.props.login} />
        {this.props.login.isLoggedIn ? (
          <ShoppingCart component={FavoritesNavigatorScreen} />
        ) : (
          <></>
        )}
      </NavigationContainer>
    );
  }

  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

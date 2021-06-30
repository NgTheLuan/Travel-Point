import React, { Component } from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  Animated,
} from "react-native";
import { Avatar, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../shared/colors";
import Loading from "./LoadingComponent";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

import { baseUrl } from "../shared/baseUrl";
// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    login: state.login,
  };
};

const style = StyleSheet.create({
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 50,
  },

  categoryListText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },

  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  priceTag: {
    height: 50,
    width: 120,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  container: {
    borderWidth: 0, // Remove Border
    // Remove Shadow for iOS
    shadowColor: "rgba(0,0,0, 0.0)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    // Remove Shadow for Android
    marginTop: -10,
    elevation: 0,
  },
});

const categories = ["All", "Popular", "Top Rated", "Featured", "Luxury"];
const CategoryList = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  return (
    <View style={style.categoryListContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryIndex(index)}
        >
          <View>
            <Text
              style={{
                ...style.categoryListText,
                color:
                  selectedCategoryIndex == index ? COLORS.primary : COLORS.grey,
              }}
            >
              {item}
            </Text>

            {/* underline category */}
            {selectedCategoryIndex == index && (
              <View
                style={{
                  height: 3,
                  width: 30,
                  backgroundColor: COLORS.primary,
                  marginTop: 2,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Cards = ({ item, index, navigate }) => {
  return (
    <View style={{ ...style.card }}>
      <View style={style.priceTag}>
        <Text>{item.price}</Text>
      </View>
      <TouchableHighlight
        style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
        onPress={() => navigate("Dishdetail", { dishId: item.id })}
      >
        <Image source={{ uri: baseUrl + item.image }} style={style.cardImage} />
      </TouchableHighlight>
      <View style={style.cardDetails}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      const { navigate } = this.props.navigation;
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <View style={style.header}>
            <View style={{ paddingBottom: 15 }}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Find your hotel
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>in </Text>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: COLORS.primary,
                  }}
                >
                  Viet Nam
                </Text>
              </View>
            </View>
            {this.props.login.isLoggedIn ? (
              <>
                {this.props.login.user.image === false ? (
                  <Card containerStyle1={style.container}>
                    <Avatar
                      source={require("../assets/male.jpg")}
                      size="medium"
                    />
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      {this.props.login.userId}
                    </Text>
                  </Card>
                ) : (
                  <Card containerStyle={style.container}>
                    <Avatar
                      size="medium"
                      source={require("../assets/female.jpg")}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        paddingTop: 10,
                        textAlign: "center",
                      }}
                    >
                      {this.props.login.userId}
                    </Text>
                  </Card>
                )}
              </>
            ) : (
              <Icon name="person-outline" size={38} color={COLORS.grey} />
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.searchInputContainer}>
              <Icon name="search" size={30} style={{ marginLeft: 20 }} />
              <TextInput
                placeholder="Search"
                style={{ fontSize: 20, paddingLeft: 10 }}
              />
            </View>

            <CategoryList />

            <View>
              <FlatList
                horizontal
                data={this.props.dishes.dishes}
                contentContainerStyle={{ paddingVertical: 30, paddingLeft: 20 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <Cards item={item} index={index} navigate={navigate} />
                )}
              />
            </View>
          </ScrollView>

          {/* <FlatList
            data={this.props.dishes.dishes}
            renderItem={({ item, index }) => this.renderMenuItem(item, index)}
            keyExtractor={(item) => item.id.toString()}
          /> */}
        </SafeAreaView>
      );
    }
  }

  // renderMenuItem(item, index) {
  //   const { navigate } = this.props.navigation;
  //   return (
  //     <Card key={index}>
  //       <Card.Title style={{}}>
  //         {item.name} - {item.price}
  //       </Card.Title>
  //       <Card.Divider />
  //       <Card.Image source={{ uri: baseUrl + item.image }}></Card.Image>
  //       <Button
  //         buttonStyle={{
  //           borderRadius: 0,
  //           marginLeft: 0,
  //           marginRight: 0,
  //           marginBottom: 0,
  //         }}
  //         title="View Detail"
  //         onPress={() => navigate("Dishdetail", { dishId: item.id })}
  //       />
  //     </Card>
  //   );
  // }
}

export default connect(mapStateToProps)(Menu);

import React, { Component } from "react";
import { FlatList, Text, Alert, View } from "react-native";
import { ListItem, Avatar, Image } from "react-native-elements";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import Swipeout from "react-native-swipeout";
import * as Animatable from "react-native-animatable";

// redux
import { connect } from "react-redux";

import { deleteFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});

class Favorites extends Component {
  render() {
    // if (this.props.dishes.isLoading) {
    //   return (<Loading />);
    // } else if (this.props.dishes.errMess) {
    //   return (<Text>{this.props.dishes.errMess}</Text>);
    // } else {
    //   const dishes = this.props.dishes.dishes.filter((dish) => this.props.favorites.some((el) => el === dish.id));
    //   return (
    //     <FlatList data={dishes}
    //       renderItem={({ item, index }) => this.renderMenuItem(item, index)}
    //       keyExtractor={item => item.id.toString()} />
    //   );
    // }
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return <Text>{this.props.dishes.errMess}</Text>;
    } else if (this.props.favorites.length === 0) {
      return (
        <View style={{ justifyContent: "center", marginTop: 50 }}>
          <Image
            source={require("../assets/done.png")}
            style={{
              padding: 10,
              margin: 40,
              height: 300,
              width: 300,
              resizeMode: "stretch",
              alignItems: "center",
            }}
          />
        </View>
      );
    } else {
      const dishes = this.props.dishes.dishes.filter((p) =>
        this.props.favorites.some((el) => el === p.id)
      );
      return (
        <>
          <FlatList
            data={dishes}
            renderItem={({ item, index }) => this.renderMenuItem(item, index)}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    const rightButton = [
      {
        text: "Delete",
        type: "delete",
        onPress: () => {
          Alert.alert(
            "Delete Favorite?",
            "Are you sure you wish to delete the favorite dish " +
              item.name +
              "?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  /* nothing */
                },
              },
              { text: "OK", onPress: () => this.props.deleteFavorite(item.id) },
            ],
            { cancelable: false }
          );
        },
      },
    ];
    return (
      <Swipeout right={rightButton} autoClose={true}>
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem
            key={index}
            onPress={() => navigate("Dishdetail", { dishId: item.id })}
          >
            <Avatar source={{ uri: baseUrl + item.image }} />
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.name}
              </ListItem.Title>
              <ListItem.Title>{item.location}</ListItem.Title>
              {/* <ListItem.Subtitle>{item.description}</ListItem.Subtitle> */}
            </ListItem.Content>
          </ListItem>
        </Animatable.View>
      </Swipeout>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";
import { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    login: state.login,
  };
};

class ShoppingCart extends Component {
  render() {

    return (
        <View>
          <TouchableOpacity > 
            <View
              style={{
                position: "absolute",
                height: 50,
                width: 50,
                borderRadius: 30,
                backgroundColor: "#FF8000",
                right: 15,
                bottom: 15,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {this.props.favorites.length}
              </Text>
              <Icon name="ios-cart" size={30}></Icon>
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

export default connect(mapStateToProps)(ShoppingCart);

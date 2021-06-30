import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  LogBox,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { Card, Button, Icon, Rating, Input } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import COLORS from "../shared/colors";
import { baseUrl } from "../shared/baseUrl";
// redux

import { connect } from "react-redux";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <>
          <ImageBackground
            style={style.headerImage}
            source={{ uri: baseUrl + dish.image }}
          >
            {/* <View style={style.header}>
              <Icon
                name="arrow-back-ios"
                size={28}
                color={COLORS.white}
                onPress={navigation.goBack}
              />
            </View> */}
          </ImageBackground>

          <View>
            <View style={style.iconContainer}>
              <Icon name="place" color={COLORS.white} size={28} />
            </View>

            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {dish.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: COLORS.grey,
                  marginTop: 5,
                }}
              >
                {dish.location}
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Icon name="star" size={20} color={COLORS.orange} />
                    <Icon name="star" size={20} color={COLORS.grey} />
                  </View>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}
                  >
                    4.0
                  </Text>
                </View>
                {/* <Text style={{ fontSize: 13, color: COLORS.grey }}>
                  365reviews
                </Text> */}
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    lineHeight: 20,
                    color: COLORS.grey,
                    textAlign: "justify",
                  }}
                >
                  {dish.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Price per night
              </Text>
              <View style={style.priceTag}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: COLORS.grey,
                    marginLeft: 5,
                  }}
                >
                  ${dish.price}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: COLORS.grey,
                    marginLeft: 5,
                  }}
                >
                  +breakfast
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              <Button
                title="Book Now"
                onPress={() => {
                  this.props.login
                    ? this.props.favorite
                      ? alert("Already in your Card")
                      : this.props.onPressFavorite()
                    : alert("Please login before using this service");
                }}
              />
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
              <Button
                title="Comment"
                onPress={() => this.props.onPressComment()}
              />
            </View>
          </View>
        </>

        // <Card>
        //   <Image
        //     source={{ uri: baseUrl + dish.image }}
        //     style={{
        //       width: "100%",
        //       height: 100,
        //       flexGrow: 1,
        //       alignItems: "center",
        //       justifyContent: "center",
        //     }}
        //   >
        //     <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
        //   </Image>
        //   <Text style={{ margin: 10 }}>{dish.description}</Text>
        //   <View style={{ flexDirection: "row", justifyContent: "center" }}>
        //     <Icon
        //       raised
        //       reverse
        //       type="font-awesome"
        //       color="#f50"
        //       name={this.props.favorite ? "heart" : "heart-o"}
        //       onPress={() => {
        //         this.props.login
        //           ? this.props.favorite
        //             ? alert("Already in your Card")
        //             : this.props.onPressFavorite()
        //           : alert("Please login before using this service");
        //       }}
        //     />
        //     <Icon
        //       raised
        //       reverse
        //       name="pencil"
        //       type="font-awesome"
        //       color="#3A2885"
        //       onPress={() => this.props.onPressComment()}
        //     />
        //   </View>
        // </Card>
      );
    }
    return <View />;
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;

    return (
      <Card>
        <Card.Title>All Comments</Card.Title>
        <Card.Divider />
        <FlatList
          data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#3A2885"
            onPress={() => this.props.onPressComment()}
          />
        </View> */}
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          startingValue={item.rating}
          imageSize={16}
          readonly
          style={{ flexDirection: "row" }}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 3,
      author: "",
      comment: "",
    };
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }
  render() {
    const dishId = parseInt(this.props.route.params.dishId);

    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderDish
            dish={this.props.dishes.dishes[dishId]}
            favorite={this.props.favorites.some((el) => el === dishId)}
            login={this.props.login.isLoggedIn}
            onPressFavorite={() => this.markFavorite(dishId)}
            onPressComment={() => this.setState({ showModal: true })}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderComments
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === dishId
            )}
          />
        </Animatable.View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <View style={{ justifyContent: "center", margin: 20 }}>
            <Rating
              startingValue={this.state.rating}
              showRating={true}
              onFinishRating={(value) => this.setState({ rating: value })}
            />
            <View style={{ height: 20 }} />
            <Input
              value={this.state.author}
              placeholder="Author"
              leftIcon={{ name: "user-o", type: "font-awesome" }}
              onChangeText={(text) => this.setState({ author: text })}
            />
            <Input
              value={this.state.comment}
              placeholder="Comment"
              leftIcon={{ name: "comment-o", type: "font-awesome" }}
              onChangeText={(text) => this.setState({ comment: text })}
            />

            <Button
              title="SUBMIT"
              color="#3A2885"
              onPress={() => {
                this.submitComment(dishId);
                this.setState({ showModal: false });
              }}
            />
            <Text></Text>

            <View style={{ width: 10 }} />
            <Button
              title="CANCEL"
              color="#898989"
              onPress={() => {
                this.setState({ showModal: false });
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
  markFavorite(dishId) {
    if (this.props.login.isLoggedIn) {
      alert("Added to your card ");
      this.props.postFavorite(dishId);
    } else {
      alert("Please login before using this service");
    }
  }

  submitComment(dishId) {
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
  }
}

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

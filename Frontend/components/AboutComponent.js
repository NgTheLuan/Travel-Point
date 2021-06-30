import React, { Component } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem, Avatar } from "react-native-elements";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import * as Animatable from "react-native-animatable";
// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

function RenderHistory() {
  return (
    <Card>
      <Card.Title>Our History</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 15 }}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </Text>
      <Text style={{ margin: 15 }}>
        Many desktop publishing packages and web page editors now use Lorem
        Ipsum as their default model text, and a search for 'lorem ipsum' will
        uncover many web sites still in their infancy.
      </Text>
    </Card>
  );
}

class RenderLeadership extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList
            data={this.props.leaders}
            renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      );
    }
  }

  renderLeaderItem(item, index) {
    return (
      <ListItem key={index}>
        <Avatar rounded source={{ uri: baseUrl + item.image }} size="large" />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}

class About extends Component {
  render() {
    return (
      // <ScrollView>
      //   <RenderHistory />
      //   <RenderLeadership
      //     leaders={this.props.leaders.leaders}
      //     isLoading={this.props.leaders.isLoading}
      //     errMess={this.props.leaders.errMess}
      //   />
      // </ScrollView>

      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderHistory />
          <RenderLeadership
            leaders={this.props.leaders.leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);

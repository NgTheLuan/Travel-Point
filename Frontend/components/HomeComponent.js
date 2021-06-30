import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native-elements";

import * as Animatable from "react-native-animatable";

// redux
import { connect } from "react-redux";

const mapStateToProps = () => {
  return {};
};

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Image
            source={require("../assets/arttravelling.jpg")}
            style={{
              width: "100%",
              height: 680,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);

import React, { Component } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

class QRComponent extends Component {
    render() {
        return (
            <View style={{ alignItems: "center", marginTop: 150 }}>
                <QRCode
                    value="Success!"
                    size={300}
                    logoBackgroundColor="transparent"
                />
            </View>
        );
    }
}

export default QRComponent;
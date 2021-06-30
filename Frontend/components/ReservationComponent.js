import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Switch,
  Button,
  Modal,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import { bill } from "../redux/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
  confirmBill: (guests, smoking, date, userId) =>
    dispatch(bill(guests, smoking, date, userId)),
});

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false,
      showModal: false,
    };
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(value) => this.setState({ guests: value })}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/No-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              onValueChange={(value) => this.setState({ smoking: value })}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <Icon
              name="schedule"
              size={36}
              onPress={() => this.setState({ showDatePicker: true })}
            />
            <Text style={{ marginLeft: 10 }}>
              {format(this.state.date, "dd/MM/yyyy --- HH:mm")}
            </Text>
            <DateTimePickerModal
              mode="datetime"
              isVisible={this.state.showDatePicker}
              isDarkModeEnabled={false}
              onConfirm={(date) =>
                this.setState({ date: date, showDatePicker: false })
              }
              onCancel={() => this.setState({ showDatePicker: false })}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              title="Reserve"
              color="#8ED1FC"
              onPress={() => this.handleReservation()}
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }

  handleReservation() {
    // this.setState({ showModal: true });
    {
      this.props.login.isLoggedIn
        ? Alert.alert(
          "Your Reservation OK?",
          "Number of Guests:" +
          this.state.guests +
          "\nSmoking? " +
          this.state.smoking +
          "\nDate and time:" +
          this.state.date,
          [
            {
              text: "Cancel",
              onPress: () => {
                this.resetForm();
              },
            },
            {
              text: "OK",
              onPress: () => {
                this.presentLocalNotification(this.state.date);
                this.props.confirmBill(
                  this.state.guests,
                  this.state.smoking,
                  this.state.date,
                  this.props.login.user._id
                );
                this.resetForm();
              },
            },
          ],
          { cancelable: false }
        )
        : Alert.alert("Please login before using this service");
    }
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }
  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Your Reservation",
        body: "Reservation for " + date + " requested",
        sound: true,
        vibrate: true,
      },
      trigger: null,
    });
  }

  confirmBill(guests, smoking, date, userId) {
    this.props.confirmBill(guests, smoking, date, userId);
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false,
      showModal: false,
    });
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reservation);

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#000000",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
import React, { Component } from 'react';
import { ScrollView, View, Button, StyleSheet, Text, Switch } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux'
import { register } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
    signup: (name, password, email, image) => dispatch(register(name, password, email, image)),
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            image: false,
            remember: false
        }
    }
    handleRegister(name, password, email, image) {
        this.props.signup(name, password, email, image);
    }

    render() {
        return (
            <ScrollView>
                <View style={{ justifyContent: 'center', margin: 20 }}>
                    <Input
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name: name.toLowerCase() })} />
                    <Input
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email: email.toLowerCase() })} />
                    <Input
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password: password.toLowerCase() })} />
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Male/Female?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.image}
                            onValueChange={(value) => this.setState({ image: value })}
                        />
                    </View>
                    <CheckBox containerStyle={{ backgroundColor: null }}
                        title='Remember Me' center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })} />
                    <View style={{ marginTop: 20 }}>
                        <Button title='REGISTER' color='#205AA7' onPress={() => this.handleRegister(this.state.name, this.state.password, this.state.email, this.state.image)} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default connect(null, mapDispatchToProps)(Register);

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
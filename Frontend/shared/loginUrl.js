import Constants from "expo-constants";

const { manifest } = Constants;

export const loginUrl = `http://${manifest.debuggerHost.split(':').shift()}:5000/api/users/`;
import Constants from "expo-constants";

const { manifest } = Constants;

export const reserveUrl = `http://${manifest.debuggerHost.split(':').shift()}:5000/api/reserve/`;
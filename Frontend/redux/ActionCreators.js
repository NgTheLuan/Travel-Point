import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { Alert } from "react-native";
import { loginUrl } from "../shared/loginUrl";
import { reserveUrl } from "../shared/reserveUrl";

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + "leaders")
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};
const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});
const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

// dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());
  return fetch(baseUrl + "dishes")
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};
const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});
const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});
const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});
const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  var newcmt = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
    date: new Date().toISOString(),
  };
  fetch(baseUrl + "comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newcmt),
  })
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((cmt) => dispatch(addComment(cmt)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const addComment = (newcmt) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newcmt,
});

// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + "promotions")
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};
const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});
const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});
const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

// favorites
export const postFavorite = (dishId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(dishId));
  }, 1000);
};
const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId,
});

export const deleteFavorite = (dishId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId,
});

//login
export const login = (name, password) => {
  return (dispatch) => {
    // don't forget to use dispatch here!
    return fetch(
      loginUrl + "login",
      {
        method: "POST",
        headers: {
          // these could be different for your API call
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, password: password }),
      },
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Log in successfully.') { // response success checking logic could differ
          dispatch(setLoginState({ ...json, userId: name })); // our action is called here
          Alert.alert('Success')
        } else {
          Alert.alert('Login Failed', 'Username or Password is incorrect');
        }
      })
      .catch((err) => {
        Alert.alert('Login Failed', 'Some error occured, please retry');
        console.log(err);
      });
  };
};

export const setLoginState = (loginData) => {
  return {
    type: ActionTypes.SET_LOGIN_STATE,
    payload: loginData,
  };
};

export const setLogoutState = () => {
  return {
    type: ActionTypes.SET_LOGOUT_STATE,
    payload: {
      login: false,
    },
  };
};

//register
export const register = (name, password, email, image) => {
  return () => {
    // don't forget to use dispatch here!
    return fetch(
      loginUrl + "signup",
      {
        method: "POST",
        headers: {
          // these could be different for your API call
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          password: password,
          email: email,
          image: image,
        }),
      },
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Sign up successfully.') { // response success checking logic could differ
          Alert.alert('Success')
        } else {
          Alert.alert('Sign up Failed', 'Username or email existed.');
        }
      })
      .catch((err) => {
        Alert.alert('Sign up Failed', 'Some error occured, please retry');
        console.log(err);
      });
  };
};

//reserve
export const bill = (guests, smoking, date, userId) => {
  return () => {
    return fetch(
      reserveUrl + userId,
      {
        method: "POST",
        headers: {
          // these could be different for your API call
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "numberofguest": guests,
          "creator": userId,
          "smoking": smoking,
          "date": date,
        }),
      },
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Reserve successfully.') { // response success checking logic could differ
          Alert.alert('Reserve successfully.')
        } else {
          Alert.alert('Reserve Failed', 'Some error occured, please retry');
        }
      })
  };
};

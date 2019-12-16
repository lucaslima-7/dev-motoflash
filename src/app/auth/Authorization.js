import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "app/store/actions";
import history from "@history";
import firebaseService from "app/config/firebase/index";
import jwt_decode from 'jwt-decode';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.firebaseCheck();
  }

  firebaseCheck = () => {
    firebaseService.init();

    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        firebaseService.getUserToken().then(resp => {
          const decoded = jwt_decode(resp)
          console.log(decoded)
          const user = {
            id: decoded.user_id,
            role: decoded.admin ? "admin" : "user",
            displayName: decoded.name ? decoded.name : "User",
            email: decoded.email,
            phoneNumber: decoded.phone_number ? authUser.phone_number : "",
            profilePic: decoded.picture ? decoded.picture : "/assets/images/avatar/profile.jpg",
            accessToken: resp,
          }
          this.props.setUserData(user)
          localStorage.setItem('bk', JSON.stringify(user))
          if (decoded.admin) {
            this.props.showTopMessage("success", `Bem-vindo de volta ${decoded.name}`)
            history.push('/users')
          } else {
            this.props.showTopMessage("error", `Usuário não autorizado`)
            history.push('/')
          }
        })
      } else {
        localStorage.removeItem("bk")
        // TODO snackbar falando que o usuário foi deslogado
      }
    });
  };

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // logout: Actions.logoutUser,
      setUserData: Actions.setUserData,
      showTopMessage: Actions.showMessageDialog
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Authorization);
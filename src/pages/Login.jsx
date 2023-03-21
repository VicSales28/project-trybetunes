import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaHeadphones } from 'react-icons/fa';

import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    loading: false,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history: { push } } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name });

    this.setState({
      loading: false,
    }, () => push('/search'));
  };

  render() {
    const { name, loading } = this.state;
    const minLength = 3;

    return (
      <div className="login_containeir">

        <h1 className="login_title">
          <FaHeadphones size="2rem" />
          TrybeTunes
        </h1>

        <div
          className="login_form_containeir"
          data-testid="page-login"
        >

          {loading === true
            ? <Loading />
            : (
              <form>

                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={ this.handleChange }
                  value={ name }
                  data-testid="login-name-input"
                  placeholder="Usuário"
                />

                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ name.length < minLength }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>

              </form>
            )}
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-horizontal.svg';

import { Container, Content, Profile, SignOut, LinkItem } from './styles';

function Header({ match }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleClick() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <LinkItem to="/dashboard">
            <picture>
              <img src={logo} alt="GymPoint" />
            </picture>
          </LinkItem>

          <ul>
            <li>
              <LinkItem
                to="/dashboard"
                active={match.path === '/dashboard' ? 1 : 0}
              >
                Alunos
              </LinkItem>
            </li>
            <li>
              <LinkItem to="/plans" active={match.path === '/plans' ? 1 : 0}>
                Planos
              </LinkItem>
            </li>
            <li>
              <LinkItem
                to="/registrations"
                active={match.path === '/registrations' ? 1 : 0}
              >
                Matrículas
              </LinkItem>
            </li>
            <li>
              <LinkItem
                to="/help_orders"
                active={match.path === '/help_orders' ? 1 : 0}
              >
                Pedidos de Auxílio
              </LinkItem>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <SignOut onClick={handleClick}>sair do sistema</SignOut>
            </div>

            <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={profile.name}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

Header.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);

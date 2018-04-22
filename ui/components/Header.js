import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";
import Head from "./Head";

const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 20px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
`;

const FlexEnd = styled.div`
  margin-left: auto;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  display: inline-block;
  cursor: pointer;
`;

const MenuLink = styled.a`
  margin: 0 15px;
  color: #7f7f7f;
  font-weight: 500;
  font-size: 18px;
  transition: color 50ms ease-in-out;
  text-decoration: none;

  &:hover {
    color: #404040;
  }
`;

const Search = styled.input`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 rgba(126, 126, 126, 0.075);
  height: 50px;
  padding: 0 15px;
  font-size: 18px;
  font-weight: 300;
  border: 0;
  margin-right: 20px;
  transition: box-shadow 100ms ease-in-out;
  width: 285px;

  ::placeholder {
    color: #878787;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    box-shadow: 0 2px 4px 0 rgba(126, 126, 126, 0.2);
  }
`;

const Header = ({ loading, currentUser }) => {
  let loginOrProfile;

  if (loading) {
    loginOrProfile = <p>Loading</p>;
  } else if (currentUser) {
    loginOrProfile = (
      <span>
        <a href="/logout">Log out</a>
        <Link
          as={`/@${currentUser.username}`}
          href={`/profile?username=${currentUser.username}`}
        >
          <Avatar src={currentUser.avatar_url} />
        </Link>
      </span>
    );
  } else {
    loginOrProfile = <a href="/login/github">Login</a>;
  }

  return (
    <Container>
      <Head />
      <Link href="/">
        <Logo src="/static/pairhub-logo.png" />
      </Link>
      <Search type="text" placeholder="Search posts" />
      <Link href="/about">
        <MenuLink>About</MenuLink>
      </Link>
      <MenuLink href="https://gitter.im/pairhub/Lobby" target="_blank">
        Chat
      </MenuLink>
      <MenuLink href="https://github.com/pairhub/pairhub" target="_blank">
        Source
      </MenuLink>
      <FlexEnd>{loginOrProfile}</FlexEnd>
    </Container>
  );
};

const CURRENT_USER_QUERY = gql`
  {
    currentUser {
      username
      avatar_url
    }
  }
`;

export default graphql(CURRENT_USER_QUERY, {
  options: {
    fetchPolicy: "cache-first"
  },
  props: ({ data: { loading, currentUser } }) => ({
    loading,
    currentUser
  })
})(Header);

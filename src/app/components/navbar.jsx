import React from 'react';
import { Link } from 'react-router'


export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <Link href="#">Publish Us</Link>
        <Link href="#/createdoc">Create Doc</Link>
        <Link href="#/login">Login</Link>
        <Link href="#/signup">Signup</Link>
      </div>
    );
  }
}
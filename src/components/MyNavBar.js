/**
 * Created by Yun on 2015-12-02.
 */

import React from 'react';
import './MyNavBar.less';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
} from 'react-bootstrap';

import versions from '../pages/docs/versions.json';

const linksInternal = [
  // {section: 'offdocs', href: 'https://facebook.github.io/react-native/docs/getting-started.html', text: '官方文档(英文)'},
  // {section: 'releases', href: 'https://github.com/facebook/react-native/releases', text: '版本'},
  { section: 'docs', href: '/docs/', text: '文档' },
  { section: 'cases', href: '/cases.html', text: '案例' },
  { section: 'blog', href: '/blog.html', text: '博客' },
  { section: 'videos', href: '/videos.html', text: '视频' },
  { section: 'bbs', href: 'http://bbs.reactnative.cn/', text: '讨论', hot: true, newTab: false },
  { section: 'shfx', hot: true, href: 'http://bbs.reactnative.cn/topic/509', text: '3.19上海分享会', newTab: true },
  // { section: 'pushy', hot: true, href: '', text: '热更新内测', newTab: true, isHidden: () => {
  //   const regex = /baidu.com/;
  //   if (__SERVER__) {
  //     return !regex.test(global.referer);
  //   }
  //   return !(regex.test(document.cookie) || regex.test(document.referrer));
  // } },
  { section: 'about', href: '/about.html', text: '关于', hash: '#content' },
];
const linksExternal = [
  { section: 'github', href: 'https://github.com/facebook/react-native', text: 'GitHub' },
  // {section: 'react', href: 'http://facebook.github.io/react-native', text: 'in English'},
];


class MyNavBar extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  createLink(v) {
    if (v.isHidden && v.isHidden()) {
      return null;
    }

    const external = /^\w+:/.test(v.href);

    const newTab = v.newTab !== null ? v.newTab : external;

    const noop = () => {};

    return (external || newTab) ? (
      <NavItem
        key={v.section}
        onClick={v.onClick || noop}
        href={v.href}
        target={newTab ? '_blank' : '_self'}
      >
        {v.text}
        {v.hot && <div className="hotSign"><img src={require('../images/hot.png')} /></div>}
      </NavItem>
    ) : (
      <LinkContainer to={v.href} onClick={v.onClick || noop} key={v.section} hash={v.hash}>
        <NavItem>
        {v.text}
        {v.hot && <div className="hotSign"><img src={require('../images/hot.png')} /></div>}
        </NavItem>
      </LinkContainer>
    );
  }
  goToDoc = (version) =>
    () => this.context.router.push(`/docs/${version}`);
  render() {
    return (
      <div>
        <Navbar className="nav-main">
          <Navbar.Header>
            <Navbar.Brand>
              <Link
                className="nav-home"
                to={{ pathname: '/' }}
              >
                <img src={require('../images/header_logo.png')} />
                React Native
              </Link>
            </Navbar.Brand>
            <NavDropdown
              className="nav-version"
              title={ this.props.params.version || versions.current } id="nav_version"
            >
              {
                versions.list.map((v, i) =>
                  <MenuItem key={i} onSelect={this.goToDoc(v.version)}>
                    {v.text}
                  </MenuItem>
                )
              }
            </NavDropdown>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse eventKey={0}>
            <Nav>
              {
                linksInternal.map(v => this.createLink(v))
              }
            </Nav>
            <Nav pullRight>
              {
                linksExternal.map(v => this.createLink(v))
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="navbar-placeholder"></div>
      </div>
    );
  }
}
export default connect(state => ({
  referer: state.referer,
}))(MyNavBar);

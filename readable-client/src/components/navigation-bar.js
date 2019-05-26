import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

class NavigationBar extends Component {
	render() {
		const { categories } = this.props;

		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/">
							<h1>Udacity Readable Project S2!</h1>
						</LinkContainer>
					</Navbar.Brand>
				<Navbar>
					<Nav>
						<h2>Menu</h2>
						<LinkContainer to="/">
							<NavItem>Posts</NavItem>
						</LinkContainer>
						{Object.values(categories).map(category => (
							<LinkContainer to={category.path} key={category.path}>
								<NavItem>{category.name}</NavItem>
							</LinkContainer>
						))}
						<NavItem href="https://github.com/ricatosin/reactnd-project-readable">
							About me - Ricardo Tosin
						</NavItem>
					</Nav>
				</Navbar>
				</Navbar.Header>
			</Navbar>
		);
	}
}

function mapStateToProps({ categories }) {
	return { categories };
}

export default connect(mapStateToProps)(NavigationBar);
import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'
import onClickOutside from 'react-onclickoutside'
import { Link } from '@/libs/routes'
import menuMap from '@/maps/menu'
import css from './Navbar.sass'
import Burger from './Burger'
import Icon from '@/components/elements/Icon'
import NavLink from './NavLink'

import { graphql } from 'react-apollo'
import { GET_CURRENT_USER } from '@/graphql/auth.gql'

@graphql(GET_CURRENT_USER)
@onClickOutside
class Navbar extends React.Component {
	state = {
		isMenuActive: false
	}

	componentDidMount() {
		window.addEventListener('resize', this.closeMenu)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.closeMenu)
	}

	toggleMenu = () => {
		this.setState({ isMenuActive: !this.state.isMenuActive })
	}

	closeMenu = () => {
		this.state.isMenuActive && this.setState({ isMenuActive: false })
	}

	handleClickOutside() {
		this.setState({ isMenuActive: false })
	}

	onLinkClick = isActive => e => {
		this.closeMenu()
		isActive && e.preventDefault()
	}

	renderMenuStart() {
		const { asPath, data: { user } } = this.props
		const isProd = process.env.NODE_ENV === 'production'

		if (!user && isProd) { return null }

		const isActive = /^\/admin/.test(asPath)

		return (
			<div className="navbar-start">
				<NavLink
					to="/admin"
					icon={['fas', 'wrench']}
					text="Админ"
					isActive={isActive}
					onClick={this.onLinkClick}
				/>
			</div>
		)
	}

	renderMenuEnd() {
		const { asPath } = this.props

		return (
			<div className="navbar-end">
				{Object.entries(menuMap).map(([to, props]) => {
					const isActive = to === asPath
					return <NavLink key={to} to={to} { ...props} isActive={isActive} onClick={this.onLinkClick} />
				})}
			</div>
		)
	}

	render() {
		const { isMenuActive } = this.state
		const { isShown, isHome } = this.props		

		const navbarCls = cls(
			'navbar',
			css.navbar,
			{ [css.isShown]: isShown },
			{ [css.isHome]: isHome }
		)

		return (
			<nav id="navbar" className={navbarCls}>
				<div className="container">
					<div className="navbar-brand">
						<Link prefetch route="/">
							<a className="navbar-item">
								<span className={cls('title', 'is-size-4', css.brand)}>Let's AVON</span>
							</a>
						</Link>
						<Burger isActive={isMenuActive} onClick={this.toggleMenu} />
					</div>
					<div className={cls('navbar-menu', css.menu, { 'is-active': isMenuActive })} onClick={this.closeMenu}>
						{this.renderMenuStart()}
						{this.renderMenuEnd()}
					</div>
				</div>
			</nav>
		)
	}
}

Navbar.propTypes = {
	
}

export default Navbar
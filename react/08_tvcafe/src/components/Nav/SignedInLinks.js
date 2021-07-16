import React from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// utils
import { logoutUser } from '../../utils/localStorageConfig'

const SignedInLinks = () => {
	const history = useHistory()

	const logoutHandler = () => {
		logoutUser()
		history.push('/signin')
	}
	return (
		<StyledLinks>
			<li>
				<NavLink to='/about'>About</NavLink>
			</li>
			<li>
				<NavLink to='/dashboard'>Dashboard</NavLink>
			</li>
			<li>
				<Link to='/signin' onClick={logoutHandler}>
					Log Out
				</Link>
			</li>
		</StyledLinks>
	)
}

export const StyledLinks = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-between;

	li {
		margin-left: 2em;
	}

	a {
		text-transform: uppercase;
		font-weight: 300;
	}
`

export default SignedInLinks

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// utils
import { useUser } from '../../contexts/UserContext'
import { formatDate } from '../../utils/formatDate'
import { getToken } from '../../utils/localStorageConfig'

const ProfileDetails = () => {
	const [user, setUser] = useState(null)
	const { getUser } = useUser()

	useEffect(() => {
		const getData = async () => {
			const { data } = await getUser(getToken())
			setUser(data.user)
		}

		getData()
	}, [getUser])

	return (
		<>
			{user && (
				<div className='container'>
					<h3 className='text-center text-primary fw-bold'>Detailed Profile Info</h3>

					{/* detailed info */}
					<div>
						<p className='fs-5'>
							<span className='fw-bold'>User ID:</span> {user._id}
						</p>
						<p className='fs-5'>
							<span className='fw-bold'>Email:</span> {user.email}
						</p>
						<p className='fs-5'>
							<span className='fw-bold'>Role:</span> {user.role}
						</p>
						<p className='fs-5'>
							<span className='fw-bold'>Created date:</span> {formatDate(user.created_date)}
						</p>
					</div>

					{/* controllers */}
					<div>
						<Link className='btn btn-outline-primary edit me-3' to='/profile/changepassword'>
							Edit Password
						</Link>
						<Link className='btn btn-outline-danger' to='#' data-bs-toggle='modal' data-bs-target='#exampleModal'>
							Delete Profile
						</Link>
					</div>

					{/* popup modal */}
					<div
						className='modal fade'
						id='exampleModal'
						tabindex='-1'
						ariaLabelledby='exampleModalLabel'
						ariaHidden='true'>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title' id='exampleModalLabel'>
										Profile deletion
									</h5>
									<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
								</div>
								<div className='modal-body'>Do you really want to delete your profile?</div>
								<div className='modal-footer'>
									<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
										Close
									</button>
									<button type='button' className='btn btn-danger delete'>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>

					<p class='text-danger text-center profile_warning'></p>
				</div>
			)}
		</>
	)
}

export default ProfileDetails

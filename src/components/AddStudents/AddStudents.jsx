import React, { useRef } from 'react';
import ModalOverlay from '../UI/ModalOverlay';
import styles from './AddStudents.module.css';

const AddStudents = () => {
	// let addStudentForm =

	const studentNameRef = useRef();
	const StudentMobileRef = useRef();
	const studentAddressRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const studentData = {
			name: studentNameRef.current.value,
			phone: StudentMobileRef.current.value,
			address: studentAddressRef.current.value,
		};

		console.log(studentData);
	};

	return (
		<>
			<ModalOverlay>
				<div>
					<form onSubmit={submitHandler}>
						<div>
							<label htmlFor="name">Student Name :</label>
							<input
								placeholder="Student Name"
								type="text"
								id="name"
								useRef={studentNameRef}
								// value={mytitle}
								// onChange={handleTitleInput}
								required
								spellCheck="false"
								autoFocus
							/>
						</div>
						<div>
							<label htmlFor="phone">Modile :</label>
							<input
								placeholder=""
								type="tel"
								id="phone"
								useRef={StudentMobileRef}
								// value={mytitle}
								// onChange={handleTitleInput}
								required
								spellCheck="false"
							/>
						</div>
						<div>
							<label htmlFor="address">Address :</label>
							<input
								placeholder="Your Address here..."
								type="text"
								id="address"
								useRef={studentAddressRef}
								// value={mytitle}
								// onChange={handleTitleInput}
								required
								spellCheck="false"
							/>
						</div>
						<div>
							<button
							// onClick={closeForm}
							>
								Close
							</button>
							<button type="submit">
								Add
								{/* {!formCtx.editingData ? "Add" : "Update"}  */}
							</button>
						</div>
					</form>
				</div>
			</ModalOverlay>
		</>
	);
};

export default AddStudents;

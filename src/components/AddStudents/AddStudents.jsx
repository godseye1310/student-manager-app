import React, { useRef } from 'react';
import ModalOverlay from '../UI/ModalOverlay';
import styles from './AddStudents.module.css';
import useStudents from '../../store/student-context';

const AddStudents = () => {
	// let addStudentForm =
	const { isDisplay, setISDisplay } = useStudents();
	const { addStudentHandler } = useStudents();
	const studentNameRef = useRef();
	const studentMobileRef = useRef();
	const studentAddressRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const studentData = {
			name: studentNameRef.current.value,
			phone: studentMobileRef.current.value,
			address: studentAddressRef.current.value,
		};

		// console.log(studentData);
		addStudentHandler(studentData);

		studentNameRef.current.value = '';
		studentMobileRef.current.value = '';
		studentAddressRef.current.value = '';
	};

	const closeForm = () => {
		setISDisplay(false);
		studentNameRef.current.value = '';
		studentMobileRef.current.value = '';
		studentAddressRef.current.value = '';
	};

	let addStudentForm = (
		<ModalOverlay onClose={closeForm}>
			<div className={styles.bg}>
				<form onSubmit={submitHandler}>
					<div>
						<label htmlFor="name">Student Name :</label>
						<input
							placeholder="Student Name"
							type="text"
							id="name"
							ref={studentNameRef}
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
							placeholder="Phone Number"
							type="tel"
							id="phone"
							ref={studentMobileRef}
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
							ref={studentAddressRef}
							// value={mytitle}
							// onChange={handleTitleInput}
							required
							spellCheck="false"
						/>
					</div>
					<div>
						<button onClick={closeForm}>Close</button>
						<button type="submit">
							Add
							{/* {!formCtx.editingData ? "Add" : "Update"}  */}
						</button>
					</div>
				</form>
			</div>
		</ModalOverlay>
	);

	return <>{isDisplay && addStudentForm}</>;
};

export default AddStudents;

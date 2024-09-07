import React from 'react';
import ModalOverlay from '../UI/ModalOverlay';
import styles from './AddStudents.module.css';
import useStudents from '../../store/student-context';

const AddStudents = () => {
	const { isDisplay, setISDisplay } = useStudents();

	const { studentNameRef, studentMobileRef, studentAddressRef } = useStudents();
	const { addStudentHandler, editStudentHandler, editStudent, setEditStudent } = useStudents();

	const submitHandler = (event) => {
		event.preventDefault();

		const studentData = {
			name: studentNameRef.current.value,
			phone: studentMobileRef.current.value,
			address: studentAddressRef.current.value,
		};

		if (!editStudent) {
			// console.log(studentData);
			addStudentHandler(studentData);
		} else {
			console.log(editStudent);
			editStudentHandler(studentData, editStudent._id);
		}
		closeForm();
	};

	const closeForm = () => {
		setISDisplay(false);
		setEditStudent(null);
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
							required
							spellCheck="false"
						/>
					</div>
					<div>
						<button onClick={closeForm}>Close</button>
						<button type="submit">{!editStudent ? 'Add' : 'Update'}</button>
					</div>
				</form>
			</div>
		</ModalOverlay>
	);

	return <>{isDisplay && addStudentForm}</>;
};

export default AddStudents;

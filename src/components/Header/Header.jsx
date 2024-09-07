import React from 'react';
import useStudents from '../../store/student-context';

const Header = () => {
	const { setISDisplay, students } = useStudents();

	const showForm = () => {
		setISDisplay(true);
	};

	return (
		<div>
			<h1>Student Manager</h1>

			<p>
				All Student : <span>{students.length}</span>
			</p>

			<button onClick={showForm} type="button">
				Add Students
			</button>
		</div>
	);
};

export default Header;

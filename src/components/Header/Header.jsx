import React from 'react';
import useStudents from '../../store/student-context';

const Header = () => {
	const { setISDisplay, students } = useStudents();

	const showForm = () => {
		setISDisplay(true);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
			<h1>Student Manager</h1>

			<p>
				All Student : <span>{students.length}</span>
			</p>

			<button onClick={showForm} type="button">
				Add New Students
			</button>
		</div>
	);
};

export default Header;

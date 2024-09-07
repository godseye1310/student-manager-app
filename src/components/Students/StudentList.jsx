import React from 'react';
import useStudents from '../../store/student-context';
import StudentData from './StudentData';

const StudentList = () => {
	const { students } = useStudents();
	console.log(students);

	return (
		<div>
			<h1>Students Data</h1>
			<ul style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
				{students.map((student) => {
					return (
						<StudentData
							key={student._id}
							id={student._id}
							name={student.name}
							phone={student.phone}
							address={student.address}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default StudentList;

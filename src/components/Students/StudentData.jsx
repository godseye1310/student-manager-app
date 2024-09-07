import React from 'react';
import useStudents from '../../store/student-context';

const StudentData = (props) => {
	const { deleteStudentHandler } = useStudents();

	const handleDelete = () => {
		console.log(props.id);
		deleteStudentHandler(props.id);
	};
	return (
		<li>
			<div style={{ display: 'flex' }}>
				<p>
					<span>{props.name} - </span>
					<span>{props.phone} - </span> <span> {props.address} | </span> --
				</p>
				<p style={{ paddingLeft: '10px', display: 'flex', gap: '5px' }}>
					<button onClick={handleDelete}>
						<span>Remove</span>
					</button>
					<button onClick={props.onEdit}>
						<span>Edit</span>
					</button>
				</p>
			</div>
		</li>
	);
};

export default StudentData;

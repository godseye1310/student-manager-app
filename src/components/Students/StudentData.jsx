import React from 'react';
import useStudents from '../../store/student-context';

const StudentData = (props) => {
	const { setISDisplay, deleteStudentHandler, setEdit, setEditStudent } = useStudents();

	const handleDelete = () => {
		console.log(props.id);
		deleteStudentHandler(props.id);
	};

	const hanndleEdit = () => {
		const editData = {
			name: props.name,
			phone: props.phone,
			address: props.address,
			_id: props.id,
		};

		setISDisplay(true);
		// console.log(editData);
		setEdit(true);
		setEditStudent(editData);
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
					<button onClick={hanndleEdit}>
						<span>Edit</span>
					</button>
				</p>
			</div>
		</li>
	);
};

export default StudentData;

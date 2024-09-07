import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const StudentContext = React.createContext();

const API_URL = 'https://crudcrud.com/api/1180e0b6b3a745e5a44bccd4b3a5decb/StudentList';

export const StudentProvider = ({ children }) => {
	const [isDisplay, setISDisplay] = useState(false);

	const [students, setStudents] = useState([]);

	const addStudentHandler = async (studentData) => {
		// console.log(studentData);
		try {
			const response = await axios.post(API_URL, studentData);
			// console.log(response.data);
			setStudents((prevStudent) => [...prevStudent, response.data]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(API_URL);
				console.log(response.status, response.statusText, 'Fetch on Refresh Success');
				setStudents(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const deleteStudentHandler = async (id) => {
		console.log(id);
		try {
			const response = await axios.delete(`${API_URL}/${id}`);
			console.log(response.status, response.statusText, 'List DELETE Successfully');

			setStudents((prevStudent) => prevStudent.filter((student) => student._id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const editStudentHandler = (edit) => {
		console.log(edit);
	};

	const studentCtx = {
		students,
		addStudentHandler,
		deleteStudentHandler,

		editStudentHandler,

		isDisplay,
		setISDisplay,
	};

	return <StudentContext.Provider value={studentCtx}>{children}</StudentContext.Provider>;
};

const useStudents = () => useContext(StudentContext);
export default useStudents;

import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';

const StudentContext = React.createContext();

const API_URL = 'https://crudcrud.com/api/1ad0638c5bb04eac8d0214fde46e6e3f/StudentList';

export const StudentProvider = ({ children }) => {
	const [isDisplay, setISDisplay] = useState(false);

	const studentNameRef = useRef();
	const studentMobileRef = useRef();
	const studentAddressRef = useRef();

	const [students, setStudents] = useState([]);

	const addStudentHandler = async (studentData) => {
		// console.log(studentData);
		try {
			const response = await axios.post(API_URL, studentData);
			console.log(response.status, response.statusText, 'Student Add Success');
			// console.log(response.data);
			setStudents((prevStudents) => [...prevStudents, response.data]);
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
		try {
			const response = await axios.delete(`${API_URL}/${id}`);
			console.log(response.status, response.statusText, 'Student DELETE Success');

			setStudents((prevStudent) => prevStudent.filter((student) => student._id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const editStudentHandler = async (editedStudent, id) => {
		console.log(editedStudent);
		try {
			const response = await axios.put(`${API_URL}/${id}`, editedStudent);
			console.log(response.status, response.statusText, 'Student Updated PUT Success');
			setStudents((prevStudents) =>
				prevStudents.map((prevstudent) =>
					prevstudent._id === id ? { ...editedStudent, _id: id } : prevstudent
				)
			);
		} catch (error) {
			console.log('error');
		}
	};

	const [editStudent, setEditStudent] = useState(null);
	const handleEditData = async (editData) => {
		console.log(editData); //contains the expected data and its logging in the console
		setEditStudent(editData);
		// if (editData) {
		// 	//facing error from here
		// 	studentNameRef.current.value = editData.name;
		// 	studentMobileRef.current.value = editData.phone;
		// 	studentAddressRef.current.value = editData.address;
		// }
	};
	useEffect(() => {
		if (editStudent && isDisplay) {
			console.log('form rendered');

			studentNameRef.current.value = editStudent.name;
			studentMobileRef.current.value = editStudent.phone;
			studentAddressRef.current.value = editStudent.address;
		}
	}, [editStudent, isDisplay]);

	const studentCtx = {
		studentNameRef,
		studentMobileRef,
		studentAddressRef,

		students,
		addStudentHandler,
		deleteStudentHandler,

		editStudentHandler,
		editStudent,
		setEditStudent,
		handleEditData,

		isDisplay,
		setISDisplay,
	};

	return <StudentContext.Provider value={studentCtx}>{children}</StudentContext.Provider>;
};

const useStudents = () => useContext(StudentContext);
export default useStudents;

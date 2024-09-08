import React, { useContext, useEffect, useRef, useState } from 'react';

const StudentContext = React.createContext();

const API_URL = 'https://student-manager-5dba1-default-rtdb.asia-southeast1.firebasedatabase.app/';

export const StudentProvider = ({ children }) => {
	const [isDisplay, setISDisplay] = useState(false);

	const studentNameRef = useRef();
	const studentMobileRef = useRef();
	const studentAddressRef = useRef();

	const [students, setStudents] = useState([]);

	const addStudentHandler = async (studentData) => {
		// console.log(studentData);
		try {
			// const response = await post(API_URL, studentData);

			setStudents((prevStudents) => [...prevStudents, studentData]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const response = await get(API_URL);
				// setStudents(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const deleteStudentHandler = async (id) => {
		try {
			// const response = await delete(`${API_URL}/${id}`);

			setStudents((prevStudent) => prevStudent.filter((student) => student.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const editStudentHandler = async (editedStudent, id) => {
		console.log(editedStudent);
		try {
			// const response = await put(`${API_URL}/${id}`, editedStudent);

			setStudents((prevStudents) =>
				prevStudents.map((prevstudent) =>
					prevstudent._id === id ? { ...editedStudent, id: id } : prevstudent
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

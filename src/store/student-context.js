import React, { useContext, useEffect, useRef, useState } from 'react';

const StudentContext = React.createContext();

const API_URL =
	'https://student-manager-5dba1-default-rtdb.asia-southeast1.firebasedatabase.app/StudentsData';

export const StudentProvider = ({ children }) => {
	const [isDisplay, setISDisplay] = useState(false);

	const studentNameRef = useRef();
	const studentMobileRef = useRef();
	const studentAddressRef = useRef();

	const [students, setStudents] = useState([]);

	const addStudentHandler = async (studentData) => {
		// console.log(studentData);
		try {
			const response = await fetch(`${API_URL}.json`, {
				method: 'POST',
				body: JSON.stringify(studentData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			// console.log(data);
			setStudents((prevStudents) => [...prevStudents, { ...studentData, id: data.name }]);
		} catch (error) {
			console.log(error);
		}
	};
	// console.log(students);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${API_URL}.json`);
				const data = await response.json();
				// console.log(data);

				setStudents(() =>
					Object.keys(data).map((key) => {
						return { ...data[key], id: key };
					})
				);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const deleteStudentHandler = async (id) => {
		try {
			const response = await fetch(`${API_URL}/${id}.json`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				setStudents((prevStudent) => prevStudent.filter((student) => student.id !== id));
			}
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
					prevstudent.id === id ? { ...editedStudent, id: id } : prevstudent
				)
			);
		} catch (error) {
			console.log('error');
		}
	};

	console.log(students);

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
	// had to set ref.values for editData in useEffect instead of  handleEditData() directly because of react batching, async tasks.
	// the form hadn't rendered as refs ran b4 isDisplay could become true
	// since form wasnt rendered the ref values weren't set resulting in runtime errors
	useEffect(() => {
		if (editStudent && isDisplay) {
			// console.log('form rendered');
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

import React, { useContext } from 'react';

const StudentContext = React.createContext();

export const StudentProvider = ({ children }) => {
	const studentCtx = {};

	return <StudentContext.Provider value={studentCtx}>{children}</StudentContext.Provider>;
};

const useStudents = () => useContext(StudentContext);
export default useStudents;

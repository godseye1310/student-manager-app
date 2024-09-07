import AddStudents from './components/AddStudents/AddStudents';
import Header from './components/Header/Header';
import StudentList from './components/Students/StudentList';
import { StudentProvider } from './store/student-context';

function App() {
	return (
		<StudentProvider>
			<div className="App">
				<h1>Hello</h1>
				<Header />
				<AddStudents />
				<StudentList />
			</div>
		</StudentProvider>
	);
}

export default App;

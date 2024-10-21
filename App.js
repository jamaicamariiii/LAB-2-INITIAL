// App.js
import React, { useState, useEffect } from "react";
import AddStudentData from "./Components/AddStudentData";
import StudentDataList from "./Components/StudentDataList";
import CsvUploader from "./Components/CsvUploader";
import IQDistribution from "./Components/IQDistribution";
import StudyHabitComposition from "./Components/StudyHabitComposition";
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';  // Relative path to firebase.js
import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState("addStudent");
  const [studentData, setStudentData] = useState([]);  // Store student data here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const studentCollection = collection(db, "studentData");
      const studentSnapshot = await getDocs(studentCollection);
      const dataList = studentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudentData(dataList);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="sidebarlist">
            <li onClick={() => setSelectedOption("addStudent")}>Add Student Information</li>
            <li onClick={() => setSelectedOption("displayTable")}>Display Table</li>
            <li onClick={() => setSelectedOption("iqDistribution")}>Show Distribution Visualization</li>
            <li onClick={() => setSelectedOption("studyHabitVisualization")}>Show Composition Visualization Table</li>
          </ul>
        </div>

        {/* Main content */}
        <div className="content">
          <header className="App-header">
            <h1 className="app-title">STUDENT DATA MANAGEMENT</h1>
          </header>

          {selectedOption === "addStudent" && (
            <div className="two-column-section">
              <div className="form-column">
                <AddStudentData />
              </div>
              <div className="form-column">
                <CsvUploader setStudentData={setStudentData} />  {/* Pass setStudentData */}
              </div>
            </div>
          )}

          {selectedOption === "displayTable" && (
            <div className="single-column-section">
              <StudentDataList />
            </div>
          )}

          {selectedOption === "iqDistribution" && (
            <div className="visualization-section">
              <IQDistribution data={studentData} />  {/* Pass studentData */}
            </div>
          )}

          {selectedOption === "studyHabitVisualization" && (
            <div className="visualization-section">
              <StudyHabitComposition data={studentData} />  {/* Pass studentData */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

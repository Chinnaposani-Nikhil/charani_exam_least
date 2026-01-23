"use client";

import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import Header from "@/components/Header";
import { View, X, NotepadText, UserCheck, MessagesSquare, Download, ListOrdered, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";

function HrPortal_Exam() {
  const [studentData, setStudentData] = useState([]);
  const [studentIdSearch, setstudentIdSearch] = useState("");
  const [selectSearch, setSelectSearch] = useState("");
  const [collegeNameSearch, setCollegeNameSearch] = useState("");
  const [correctAnswersSearch, setCorrectAnswersSearch] = useState("");
  const [response, setResponse] = useState(null);
  const router = useRouter();

  // College Multi-select States
  const [collegeList, setCollegeList] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [tempColleges, setTempColleges] = useState([]);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentId, setStudentId] = useState(null);

  // Form State for Popup
  const [feedback, setFeedback] = useState("");
  const [topic, setTopic] = useState("");
  const [score, setScore] = useState("");
  const [selectorName, setSelectorName] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  // 1. Auth Check
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("AdminLogin"));
    if (!admin) {
      router.push("/admin");
    }
  }, [router]);

  // 2. Fetch Data
  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/jam-result");
      const data = await res.json();
      if (data.success) {
        const flattened = Object.entries(data.data || {}).flatMap(
          ([studentId, collegeObj]) =>
            Object.entries(collegeObj).map(([resultId, value]) => ({
              id: resultId,
              studentId,
              ...value,
            }))
        );
        setStudentData(flattened);
      }
    } catch (error) {
      setResponse(
        <div className="text-red-800 font-bold mt-6 text-center">Error fetching users</div>
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch College List
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/add-colleges");
        const data = await res.json();
        if (data.success) {
          setCollegeList(data.data); // each item: { collegeName, status }
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };
    fetchColleges();
  }, []);

  // 3. Modal Logic
  const handleOpenModal = (student) => {
    setSelectedStudent(student); // store clicked row
    setStudentId(student.studentId); // optional
    setFeedback(student.feedback || "");
    setTopic(student.topic || "");
    setSelectorName(student.selectorName || "");
    setIsSelected(student.Aptitude_select || false);
    setIsModalOpen(true); // open modal
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...selectedStudent,
        feedback,
        topic,
        score,
        selectorName,
        jam_selected: isSelected,
      };

      const res = await fetch("/api/tr1-Exam-Result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-[60]">
            Shortlisted for Technical Exam.
          </div>
        );
        setIsModalOpen(false);
        fetchStudents();
        setTimeout(() => setResponse(null), 3000);
      }
    } catch (error) {
      alert("Error updating result");
    }
  };

  // 4. Excel Download
  const handleDownloadExcel = () => {
    if (filteredData.length === 0) {
      alert("No data available to download");
      return;
    }

    const excelData = filteredData.map((item, index) => ({
      "S.No": index + 1,
      "Student Name": item.studentName,
      "Email": item.studentEmail,
      "Student ID": item.studentId,
      "College": item.collegeName,
      "Score": item.score,
      "Correct Answers": item.correctAnswers,
      "Selected": item.Aptitude_select ? "Yes" : "No",
      "Invigilator": item.selectorName || "N/A",
      "Topic": item.topic || "N/A",
      "Feedback": item.feedback || "N/A",
      "Date": item.submittedAt || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "JAM Results");
    XLSX.writeFile(
      workbook,
      `Jam_Results_${new Date().toLocaleDateString()}.xlsx`
    );
  };

  // 5. Filtering
  const filteredData = useMemo(() => {
    return studentData.filter((student) => {
      const matchStudentId = studentIdSearch
        ? student.studentId?.toLowerCase().includes(studentIdSearch.toLowerCase())
        : true;

      // Filter by multi-selected colleges
      const matchCollegeName = selectedColleges.length > 0
        ? selectedColleges.includes(student.collegeName)
        : true;

      const matchCorrectAnswers = correctAnswersSearch
        ? Number(student.correctAnswers) === Number(correctAnswersSearch)
        : true;

      const matchSelect =
        selectSearch === ""
          ? true
          : selectSearch === "yes"
          ? student.Aptitude_select === true
          : student.Aptitude_select === false;

      return matchStudentId && matchCollegeName && matchCorrectAnswers && matchSelect;
    });
  }, [
    studentData,
    studentIdSearch,
    selectedColleges,
    correctAnswersSearch,
    selectSearch,
  ]);

  // 6. Table Columns
  const columns = [
    { name: "S.No", cell: (row, index) => index + 1, width: "80px" },
    { name: "Name", selector: (row) => row.studentName, sortable: true },
    { name: "Email", selector: (row) => row.studentEmail, sortable: true, width: "220px" },
    { name: "Phone Number", selector: (row) => row.phone, sortable: true, width: "220px" },
    { name: "Student ID", selector: (row) => row.studentId, sortable: true },
    { name: "College", selector: (row) => row.collegeName, sortable: true, width: "250px" },
    { name: "Aptitude Select", selector: (row) => row.Aptitude_select ? "Yes" : "No", sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleOpenModal(row)}
          className="bg-blue-900 text-white px-3 py-1 rounded text-sm hover:bg-blue-800 transition"
        >
          <View size={16} />
        </button>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Selected for Jam</h1>

      {/* Filters Row */}
      <div className="flex gap-4 mb-6 flex-wrap items-end">
        
        {/* Updated College Dropdown Filter */}
        <div className="relative">
          <label className="block text-sm font-bold mb-1">College Name</label>
          <button
            onClick={() => setShowCollegeDropdown(!showCollegeDropdown)}
            className="border px-3 py-2 rounded w-64 bg-white flex justify-between items-center outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="truncate">
              {selectedColleges.length > 0 ? selectedColleges.join(", ") : "Select Colleges..."}
            </span>
            <ChevronDown size={18} className="text-gray-500" />
          </button>

          {showCollegeDropdown && (
            <div className="absolute z-10 bg-white border rounded shadow-md p-3 w-64 mt-1 max-h-60 overflow-auto">
              {collegeList.map((collegeObj) => {
                const name = collegeObj.collegeName; 
                return (
                  <label key={name} className="flex items-center gap-2 mb-2 hover:bg-gray-50 cursor-pointer p-1 rounded">
                    <input
                      type="checkbox"
                      checked={tempColleges.includes(name)}
                      onChange={(e) =>
                        setTempColleges((prev) =>
                          e.target.checked
                            ? [...prev, name]
                            : prev.filter((c) => c !== name)
                        )
                      }
                      className="accent-blue-600"
                    />
                    <span className="text-sm">{name}</span>
                  </label>
                );
              })}

              <button
                onClick={() => {
                  setSelectedColleges(tempColleges);
                  setShowCollegeDropdown(false);
                }}
                className="mt-2 w-full bg-blue-600 text-white py-1.5 rounded text-sm font-bold hover:bg-blue-700 transition"
              >
                Select
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Student ID</label>
          <input
            type="text"
            placeholder="Search ID..."
            value={studentIdSearch}
            onChange={(e) => setstudentIdSearch(e.target.value)}
            className="border px-3 py-2 rounded w-64 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Shortlisted</label>
          <select
            value={selectSearch}
            onChange={(e) => setSelectSearch(e.target.value)}
            className="border px-3 py-2 rounded w-64 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button
          onClick={handleDownloadExcel}
          className="flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-[9px] rounded font-bold hover:bg-green-800 transition shadow-sm"
        >
          <Download size={18} />
          Download Excel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

      {/* Popup Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto flex flex-col">
            
            <div className="flex justify-between items-center p-5 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Review Result - {selectedStudent.studentName}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-red-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="font-bold flex items-center gap-2 mb-2 text-gray-700">
                    <NotepadText size={18} /> Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border-2 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none border-gray-200"
                  />
                </div>
                
                <div>
                  <label className="font-bold flex items-center gap-2 mb-2 text-gray-700">
                    <MessagesSquare size={18} /> Feedback
                  </label>
                  <textarea
                    rows={6}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="border-2 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none border-gray-200"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => setIsSelected(e.target.checked)}
                    className="w-6 h-6 accent-blue-900"
                  />
                  <label className="font-bold text-gray-700 select-none">Shortlist for Next Round?</label>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="font-bold flex items-center gap-2 mb-2 text-gray-700">
                    <UserCheck size={18} /> Invigilator Name
                  </label>
                  <select
                    value={selectorName}
                    onChange={(e) => setSelectorName(e.target.value)}
                    className="border-2 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none border-gray-200"
                  >
                    <option value="">Select Invigilator</option>
                    <option value="raja-sekhar">Raja Sekhar</option>
                    <option value="faruk">Faruk</option>
                    <option value="sathis">Sathis</option>
                    <option value="vanitha">Vanitha</option>
                    <option value="malika">Malika</option>
                    <option value="bindu">Bindu</option>
                    <option value="madhavi">Madhavi</option>
                    <option value="nagendra">Nagendra</option>
                    <option value="mohan-krishna">Mohan Krishna</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold flex items-center gap-2 mb-2 text-gray-700">
                    <ListOrdered size={18} /> Score
                  </label>
                  <select
                   value={score}
                    onChange={(e) => setScore(e.target.value)}
                   name="score" id="score" className="border-2 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none border-gray-200">
                    <option value="">Select Score</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-5 border-t bg-gray-50 flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-200 rounded-lg">
                Discard
              </button>
              <button onClick={handleSubmit} className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg">
                Submit & Save
              </button>
            </div>
          </div>
        </div>
      )}

      {response}
    </div>
  );
}

export default HrPortal_Exam;
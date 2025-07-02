import React, { useState } from 'react';
import { Search, Filter, Mail, MessageSquare, MoreVertical, Download, Eye, TrendingUp, Users, BookOpen, Clock } from 'lucide-react';

const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const students = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=150',
      enrolledCourses: ['Complete Web Development Bootcamp', 'Advanced JavaScript'],
      totalProgress: 75,
      lastActive: '2 hours ago',
      joinDate: '2024-01-15',
      status: 'Active',
      completedCourses: 1,
      certificates: 1,
      totalHours: 45
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      enrolledCourses: ['Complete Web Development Bootcamp'],
      totalProgress: 45,
      lastActive: '1 day ago',
      joinDate: '2024-02-20',
      status: 'Active',
      completedCourses: 0,
      certificates: 0,
      totalHours: 28
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      avatar: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=150',
      enrolledCourses: ['Advanced JavaScript', 'React for Beginners'],
      totalProgress: 90,
      lastActive: '3 days ago',
      joinDate: '2024-01-08',
      status: 'Inactive',
      completedCourses: 1,
      certificates: 1,
      totalHours: 67
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@email.com',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      enrolledCourses: ['Complete Web Development Bootcamp', 'Advanced JavaScript', 'React for Beginners'],
      totalProgress: 60,
      lastActive: '5 hours ago',
      joinDate: '2024-01-22',
      status: 'Active',
      completedCourses: 0,
      certificates: 0,
      totalHours: 89
    }
  ];

  const courses = ['Complete Web Development Bootcamp', 'Advanced JavaScript', 'React for Beginners'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || student.enrolledCourses.includes(courseFilter);
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleDropdownToggle = (studentId) => {
    setShowDropdown(showDropdown === studentId ? null : studentId);
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const avgProgress = Math.round(students.reduce((sum, s) => sum + s.totalProgress, 0) / students.length);
  const totalCertificates = students.reduce((sum, s) => sum + s.certificates, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students</h1>
          <p className="text-gray-600">Track student progress and engagement</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">{activeStudents}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates Issued</p>
                <p className="text-2xl font-bold text-gray-900">{totalCertificates}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrolled Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {student.enrolledCourses.length} course{student.enrolledCourses.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.completedCourses} completed
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${student.totalProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.totalProgress}%</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {student.totalHours} hours studied
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownToggle(student.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {showDropdown === student.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                              <Download className="w-4 h-4 mr-2" />
                              Export Data
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {filteredStudents.length} of {totalStudents} students
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherStudents;
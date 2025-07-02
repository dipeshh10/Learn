import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, Users, Star, MoreVertical } from 'lucide-react';

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const courses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      category: 'Web Development',
      status: 'Published',
      students: 1250,
      rating: 4.8,
      reviews: 342,
      created: '2024-01-15',
      updated: '2024-03-10',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Beginner',
      duration: '54 hours'
    },
    {
      id: '2',
      title: 'Data Science with Python',
      instructor: 'Prof. Michael Chen',
      category: 'Data Science',
      status: 'Published',
      students: 890,
      rating: 4.9,
      reviews: 178,
      created: '2024-02-20',
      updated: '2024-03-15',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermediate',
      duration: '42 hours'
    },
    {
      id: '3',
      title: 'Advanced JavaScript Concepts',
      instructor: 'John Smith',
      category: 'Programming',
      status: 'Under Review',
      students: 0,
      rating: 0,
      reviews: 0,
      created: '2024-03-01',
      updated: '2024-03-20',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Advanced',
      duration: '32 hours'
    },
    {
      id: '4',
      title: 'UI/UX Design Masterclass',
      instructor: 'Sarah Johnson',
      category: 'Design',
      status: 'Published',
      students: 756,
      rating: 4.7,
      reviews: 123,
      created: '2024-01-08',
      updated: '2024-03-12',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Beginner',
      duration: '36 hours'
    },
    {
      id: '5',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Davis',
      category: 'Data Science',
      status: 'Rejected',
      students: 0,
      rating: 0,
      reviews: 0,
      created: '2024-02-28',
      updated: '2024-03-18',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermediate',
      duration: '48 hours'
    }
  ];

  const categories = ['Web Development', 'Data Science', 'Design', 'Programming', 'Marketing', 'Business'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Published':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Under Review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleDropdownToggle = (courseId) => {
    setShowDropdown(showDropdown === courseId ? null : courseId);
  };

  const handleStatusChange = (courseId, newStatus) => {
    console.log(`Changing course ${courseId} status to ${newStatus}`);
    setShowDropdown(null);
  };

  const stats = [
    { title: 'Total Courses', value: courses.length, color: 'blue' },
    { title: 'Published', value: courses.filter(c => c.status === 'Published').length, color: 'green' },
    { title: 'Under Review', value: courses.filter(c => c.status === 'Under Review').length, color: 'yellow' },
    { title: 'Rejected', value: courses.filter(c => c.status === 'Rejected').length, color: 'red' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-600">Review and manage all courses on the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  {getStatusIcon(stat.title === 'Published' ? 'Published' : 
                                stat.title === 'Under Review' ? 'Under Review' :
                                stat.title === 'Rejected' ? 'Rejected' : 'Draft')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="under review">Under Review</option>
                <option value="rejected">Rejected</option>
                <option value="draft">Draft</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {course.level} • {course.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.rating > 0 ? (
                        <div className="flex items-center text-sm text-gray-900">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {course.rating} ({course.reviews})
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No ratings</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownToggle(course.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {showDropdown === course.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                              <Eye className="w-4 h-4 mr-2" />
                              View Course
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </button>
                            {course.status === 'Under Review' && (
                              <>
                                <button 
                                  onClick={() => handleStatusChange(course.id, 'Published')}
                                  className="flex items-center w-full px-4 py-2 text-green-700 hover:bg-green-50 transition-colors"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </button>
                                <button 
                                  onClick={() => handleStatusChange(course.id, 'Rejected')}
                                  className="flex items-center w-full px-4 py-2 text-red-700 hover:bg-red-50 transition-colors"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </button>
                              </>
                            )}
                            <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
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

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCourses.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {filteredCourses.length} of {courses.length} courses
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

export default AdminCourses;
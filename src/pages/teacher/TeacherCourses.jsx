import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Eye, Trash2, Users, Star, BarChart3, MoreVertical } from 'lucide-react';

const TeacherCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const courses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn full-stack web development from scratch with HTML, CSS, JavaScript, React, and Node.js',
      status: 'Published',
      students: 1250,
      rating: 4.8,
      reviews: 342,
      created: '2024-01-15',
      updated: '2024-03-10',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      level: 'Beginner',
      duration: '54 hours'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      description: 'Master advanced JavaScript concepts including closures, prototypes, async programming, and more',
      status: 'Published',
      students: 890,
      rating: 4.9,
      reviews: 178,
      created: '2024-02-20',
      updated: '2024-03-15',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Programming',
      level: 'Advanced',
      duration: '32 hours'
    },
    {
      id: '3',
      title: 'React for Beginners',
      description: 'Learn React.js from the ground up and build modern web applications',
      status: 'Draft',
      students: 0,
      rating: 0,
      reviews: 0,
      created: '2024-03-01',
      updated: '2024-03-20',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      level: 'Beginner',
      duration: '28 hours'
    },
    {
      id: '4',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
      status: 'Under Review',
      students: 0,
      rating: 0,
      reviews: 0,
      created: '2024-03-10',
      updated: '2024-03-22',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Backend Development',
      level: 'Intermediate',
      duration: '45 hours'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDropdownToggle = (courseId) => {
    setShowDropdown(showDropdown === courseId ? null : courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
              <p className="text-gray-600">Manage and track your course content</p>
            </div>
            <Link to="/teacher/courses/create" className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create New Course
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'Published').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(courses.filter(c => c.rating > 0).reduce((sum, course) => sum + course.rating, 0) / 
                    courses.filter(c => c.rating > 0).length || 0).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
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
                  placeholder="Search courses..."
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
                <option value="draft">Draft</option>
                <option value="under review">Under Review</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(course.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    {showDropdown === course.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <Link
                          to={`/teacher/courses/${course.id}/edit`}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setShowDropdown(null)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Course
                        </Link>
                        <Link
                          to={`/course/${course.id}`}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setShowDropdown(null)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Link>
                        <Link
                          to={`/teacher/courses/${course.id}/analytics`}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setShowDropdown(null)}
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analytics
                        </Link>
                        <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                  <span className="text-sm text-gray-500">{course.level}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </div>
                    {course.rating > 0 && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {course.rating}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Updated {new Date(course.updated).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/teacher/courses/${course.id}/edit`}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/course/${course.id}`}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new course</p>
            <Link to="/teacher/courses/create" className="btn-primary">
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;
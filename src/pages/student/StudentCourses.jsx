import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Users, Clock, Play, BookOpen, Trophy, Calendar } from 'lucide-react';

const StudentCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const enrolledCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      instructor: 'Dr. Angela Yu',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'React State Management',
      rating: 4.8,
      enrolledDate: '2024-01-15',
      status: 'in-progress',
      category: 'Web Development',
      duration: '54 hours'
    },
    {
      id: '2',
      title: 'Data Science with Python',
      progress: 32,
      totalLessons: 38,
      completedLessons: 12,
      instructor: 'Prof. Michael Chen',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'Pandas Data Manipulation',
      rating: 4.9,
      enrolledDate: '2024-02-01',
      status: 'in-progress',
      category: 'Data Science',
      duration: '42 hours'
    },
    {
      id: '3',
      title: 'UI/UX Design Masterclass',
      progress: 100,
      totalLessons: 32,
      completedLessons: 32,
      instructor: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: null,
      rating: 4.7,
      enrolledDate: '2023-12-10',
      status: 'completed',
      category: 'Design',
      duration: '36 hours'
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      progress: 15,
      totalLessons: 28,
      completedLessons: 4,
      instructor: 'Mark Thompson',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'SEO Fundamentals',
      rating: 4.6,
      enrolledDate: '2024-02-20',
      status: 'in-progress',
      category: 'Marketing',
      duration: '28 hours'
    }
  ];

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status, progress) => {
    if (status === 'completed') {
      return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>;
    } else if (progress > 0) {
      return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</span>;
    } else {
      return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Not Started</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Courses</h1>
          <p className="text-gray-600">Track your learning progress and continue where you left off</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(c => c.status === 'in-progress').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search your courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                    </div>
                    {getStatusBadge(course.status, course.progress)}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress: {course.progress}%</span>
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  {course.nextLesson && (
                    <p className="text-sm text-blue-600 mb-4">
                      Next: {course.nextLesson}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Enrolled: {new Date(course.enrolledDate).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/student/learn/${course.id}`}
                      className="btn-primary text-sm px-4 py-2 flex items-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {course.status === 'completed' ? 'Review' : 'Continue'}
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
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'You haven\'t enrolled in any courses yet'}
            </p>
            <Link to="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
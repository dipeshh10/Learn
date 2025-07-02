import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, TrendingUp, DollarSign, Plus, Eye, Edit, BarChart3, Calendar, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const courseStats = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      students: 1250,
      rating: 4.8,
      revenue: 0, // Free course
      status: 'Published',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      students: 890,
      rating: 4.9,
      revenue: 0, // Free course
      status: 'Published',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'React for Beginners',
      students: 0,
      rating: 0,
      revenue: 0,
      status: 'Draft',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentActivity = [
    { action: 'New student enrolled', course: 'Web Development Bootcamp', student: 'Sarah Johnson', time: '2 hours ago' },
    { action: 'Course completed', course: 'Advanced JavaScript', student: 'Mike Chen', time: '4 hours ago' },
    { action: 'New review received', course: 'Web Development Bootcamp', rating: 5, time: '1 day ago' },
    { action: 'Question posted', course: 'Advanced JavaScript', student: 'Emma Davis', time: '2 days ago' }
  ];

  const upcomingTasks = [
    { task: 'Review assignment submissions', course: 'Web Development Bootcamp', due: 'Today', priority: 'high' },
    { task: 'Update course materials', course: 'Advanced JavaScript', due: 'Tomorrow', priority: 'medium' },
    { task: 'Respond to student questions', course: 'React for Beginners', due: 'This week', priority: 'low' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">2,140</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm font-medium">+12% from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-blue-600 text-sm font-medium">2 published, 1 draft</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.85</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm font-medium">Excellent feedback</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-gray-600 text-sm font-medium">New enrollments</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                <Link to="/teacher/courses/create" className="btn-primary flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Course
                </Link>
              </div>
              
              <div className="space-y-4">
                {courseStats.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            course.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students} students
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {course.rating > 0 ? `${course.rating} rating` : 'No ratings yet'}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Free Course
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                          <Link
                            to={`/teacher/courses/${course.id}/edit`}
                            className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Link>
                          <Link
                            to={`/course/${course.id}`}
                            className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Link>
                          <Link
                            to={`/teacher/courses/${course.id}/analytics`}
                            className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                          >
                            <BarChart3 className="w-3 h-3 mr-1" />
                            Analytics
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span>
                        {activity.student && (
                          <> by <span className="text-blue-600">{activity.student}</span></>
                        )}
                        {activity.rating && (
                          <> - <span className="text-yellow-600">{activity.rating} stars</span></>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">{activity.course}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Tasks</h2>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    task.priority === 'high' ? 'border-red-500 bg-red-50' :
                    task.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-green-500 bg-green-50'
                  }`}>
                    <p className="font-medium text-gray-900 text-sm">{task.task}</p>
                    <p className="text-sm text-gray-600">{task.course}</p>
                    <p className={`text-xs mt-1 ${
                      task.priority === 'high' ? 'text-red-600' :
                      task.priority === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      Due: {task.due}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/teacher/courses/create"
                  className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Create New Course</span>
                </Link>
                <Link
                  to="/teacher/courses"
                  className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Manage Courses</span>
                </Link>
                <Link
                  to="/teacher/students"
                  className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">View Students</span>
                </Link>
                <button className="flex items-center w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageSquare className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Messages</span>
                </button>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">This Month</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Course completions</span>
                  <span className="text-sm font-medium text-green-600">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New enrollments</span>
                  <span className="text-sm font-medium text-blue-600">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Questions answered</span>
                  <span className="text-sm font-medium text-purple-600">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. response time</span>
                  <span className="text-sm font-medium text-orange-600">2.4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
import React from 'react';
import { Users, BookOpen, TrendingUp, DollarSign, BarChart3, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Courses',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Course Completions',
      value: '8,921',
      change: '+23%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Platform Revenue',
      value: '$0',
      change: 'Free Platform',
      changeType: 'neutral',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'Sarah Johnson', time: '2 minutes ago', type: 'user' },
    { action: 'Course published', course: 'Advanced React Patterns', instructor: 'John Doe', time: '15 minutes ago', type: 'course' },
    { action: 'Course completed', user: 'Mike Chen', course: 'Web Development Bootcamp', time: '1 hour ago', type: 'completion' },
    { action: 'New instructor application', user: 'Emma Davis', time: '2 hours ago', type: 'instructor' },
    { action: 'Course under review', course: 'Machine Learning Basics', instructor: 'Dr. Smith', time: '3 hours ago', type: 'review' }
  ];

  const pendingActions = [
    { id: 1, title: 'Review instructor applications', count: 5, priority: 'high' },
    { id: 2, title: 'Approve pending courses', count: 12, priority: 'medium' },
    { id: 3, title: 'Resolve user reports', count: 3, priority: 'high' },
    { id: 4, title: 'Update platform policies', count: 1, priority: 'low' }
  ];

  const topCourses = [
    { title: 'Complete Web Development Bootcamp', students: 1250, rating: 4.8, instructor: 'Dr. Angela Yu' },
    { title: 'Data Science with Python', students: 890, rating: 4.9, instructor: 'Prof. Michael Chen' },
    { title: 'UI/UX Design Masterclass', students: 756, rating: 4.7, instructor: 'Sarah Johnson' },
    { title: 'Digital Marketing Strategy', students: 634, rating: 4.6, instructor: 'Mark Thompson' }
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      yellow: 'text-yellow-600'
    };
    return colors[color] || 'text-gray-600';
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Here's what's happening on your platform.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${getChangeColor(stat.changeType)}`}>
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${getStatColor(stat.color)}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
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
                        {activity.user && (
                          <> by <span className="text-blue-600">{activity.user}</span></>
                        )}
                        {activity.course && (
                          <>: <span className="text-purple-600">{activity.course}</span></>
                        )}
                        {activity.instructor && (
                          <> by <span className="text-green-600">{activity.instructor}</span></>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Courses */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Courses</h2>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{course.students}</p>
                        <p>Students</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{course.rating}</p>
                        <p>Rating</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Actions</h2>
              <div className="space-y-4">
                {pendingActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{action.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{action.count} items</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active instructors</span>
                  <span className="text-sm font-medium text-gray-900">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses this month</span>
                  <span className="text-sm font-medium text-green-600">+23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">User satisfaction</span>
                  <span className="text-sm font-medium text-blue-600">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Platform uptime</span>
                  <span className="text-sm font-medium text-green-600">99.9%</span>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">System Health</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Database</span>
                  </div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">API Services</span>
                  </div>
                  <span className="text-sm text-green-600">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm text-gray-700">CDN</span>
                  </div>
                  <span className="text-sm text-yellow-600">Degraded</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Storage</span>
                  </div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Calendar, Download, Filter } from 'lucide-react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  const metrics = [
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
      title: 'Avg. Session Time',
      value: '45m',
      change: '+5%',
      changeType: 'positive',
      icon: Calendar,
      color: 'orange'
    }
  ];

  const chartData = {
    users: [
      { month: 'Jan', value: 8500 },
      { month: 'Feb', value: 9200 },
      { month: 'Mar', value: 10100 },
      { month: 'Apr', value: 11300 },
      { month: 'May', value: 12000 },
      { month: 'Jun', value: 12543 }
    ],
    courses: [
      { month: 'Jan', value: 120 },
      { month: 'Feb', value: 135 },
      { month: 'Mar', value: 142 },
      { month: 'Apr', value: 148 },
      { month: 'May', value: 152 },
      { month: 'Jun', value: 156 }
    ],
    completions: [
      { month: 'Jan', value: 5200 },
      { month: 'Feb', value: 6100 },
      { month: 'Mar', value: 6800 },
      { month: 'Apr', value: 7500 },
      { month: 'May', value: 8200 },
      { month: 'Jun', value: 8921 }
    ]
  };

  const topCourses = [
    { title: 'Complete Web Development Bootcamp', enrollments: 1250, completions: 892, rating: 4.8 },
    { title: 'Data Science with Python', enrollments: 890, completions: 623, rating: 4.9 },
    { title: 'UI/UX Design Masterclass', enrollments: 756, completions: 534, rating: 4.7 },
    { title: 'Digital Marketing Strategy', enrollments: 634, completions: 445, rating: 4.6 },
    { title: 'Advanced JavaScript', enrollments: 523, completions: 367, rating: 4.8 }
  ];

  const userGrowth = [
    { period: 'This Week', new: 234, active: 8945, retention: '89%' },
    { period: 'This Month', new: 1023, active: 11234, retention: '85%' },
    { period: 'This Quarter', new: 3456, active: 12543, retention: '82%' },
    { period: 'This Year', new: 9876, active: 12543, retention: '78%' }
  ];

  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.value));
  };

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getStatColor = (color) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colors[color] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track platform performance and user engagement</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${getChangeColor(metric.changeType)}`}>
                    {metric.change} from last period
                  </p>
                </div>
                <metric.icon className={`h-8 w-8 ${getStatColor(metric.color)}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Growth Trends</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedMetric('users')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedMetric === 'users' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Users
                  </button>
                  <button
                    onClick={() => setSelectedMetric('courses')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedMetric === 'courses' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => setSelectedMetric('completions')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedMetric === 'completions' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Completions
                  </button>
                </div>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="h-64 flex items-end space-x-4">
                {chartData[selectedMetric].map((item, index) => {
                  const maxValue = getMaxValue(chartData[selectedMetric]);
                  const height = (item.value / maxValue) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex justify-center mb-2">
                        <div
                          className="w-8 bg-blue-600 rounded-t transition-all duration-500 hover:bg-blue-700"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 text-center">
                        <div className="font-medium">{item.month}</div>
                        <div className="text-gray-500">{item.value.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Courses */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Courses</h2>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>{course.enrollments} enrolled</span>
                        <span>{course.completions} completed</span>
                        <span>★ {course.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {Math.round((course.completions / course.enrollments) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">completion rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Growth */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">User Growth</h2>
              <div className="space-y-4">
                {userGrowth.map((period, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{period.period}</span>
                      <span className="text-sm text-green-600">{period.retention}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">New Users</div>
                        <div className="font-medium text-gray-900">{period.new.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Active Users</div>
                        <div className="font-medium text-gray-900">{period.active.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Health</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Uptime</span>
                  <span className="text-sm font-medium text-green-600">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Load Time</span>
                  <span className="text-sm font-medium text-blue-600">1.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Error Rate</span>
                  <span className="text-sm font-medium text-green-600">0.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm font-medium text-orange-600">67%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Course published</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New user registration spike</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">System maintenance completed</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
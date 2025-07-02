import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Trophy, TrendingUp, Play, Award, Calendar, User, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  const enrolledCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      instructor: 'Dr. Angela Yu',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'React State Management'
    },
    {
      id: '2',
      title: 'Data Science with Python',
      progress: 32,
      totalLessons: 38,
      completedLessons: 12,
      instructor: 'Prof. Michael Chen',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'Pandas Data Manipulation'
    },
    {
      id: '3',
      title: 'UI/UX Design Masterclass',
      progress: 85,
      totalLessons: 32,
      completedLessons: 27,
      instructor: 'Sarah Johnson',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'Usability Testing'
    }
  ];

  const achievements = [
    { icon: Trophy, title: 'First Course Completed', description: 'Completed your first course', earned: true },
    { icon: Award, title: 'Quick Learner', description: 'Completed 5 lessons in one day', earned: true },
    { icon: TrendingUp, title: 'Consistent Learner', description: '7-day learning streak', earned: false },
    { icon: BookOpen, title: 'Course Collector', description: 'Enrolled in 5+ courses', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed lesson', course: 'Web Development Bootcamp', lesson: 'JavaScript Arrays', time: '2 hours ago' },
    { action: 'Started course', course: 'Data Science with Python', lesson: '', time: '1 day ago' },
    { action: 'Earned certificate', course: 'UI/UX Design Masterclass', lesson: '', time: '3 days ago' },
    { action: 'Completed quiz', course: 'Web Development Bootcamp', lesson: 'CSS Flexbox Quiz', time: '5 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="bg-gradient-primary rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern-dots-student-dashboard"></div>
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-xl text-blue-100 mb-8">Continue your learning journey and track your progress</p>
              <Link to="/courses" className="btn-primary bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="w-5 h-5 mr-2" />
                Explore New Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { title: 'Enrolled Courses', value: '3', icon: BookOpen, color: 'blue', change: '+1 this month' },
            { title: 'Hours Learned', value: '47', icon: Clock, color: 'green', change: '+12 this week' },
            { title: 'Certificates', value: '1', icon: Trophy, color: 'yellow', change: 'Latest: UI/UX' },
            { title: 'Learning Streak', value: '5 days', icon: TrendingUp, color: 'purple', change: 'Keep it up!' }
          ].map((stat, index) => (
            <div key={index} className="stat-card group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-purple-100 text-purple-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-7 w-7" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="card p-8 mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
                <Link to="/student/courses" className="text-blue-600 hover:text-blue-700 font-semibold">
                  View All Courses →
                </Link>
              </div>
              
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center space-x-6">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-3">by {course.instructor}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1 mr-6">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                              <span>Progress: {course.progress}%</span>
                              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <Link
                            to={`/student/learn/${course.id}`}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Link>
                        </div>
                        
                        {course.nextLesson && (
                          <p className="text-sm text-blue-600 font-medium">
                            Next: {course.nextLesson}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Activity</h2>
              <div className="space-y-6">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">
                        {activity.action}
                        {activity.lesson && (
                          <span className="text-blue-600 ml-1">: {activity.lesson}</span>
                        )}
                      </p>
                      <p className="text-gray-600 text-sm">{activity.course}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="card p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                    achievement.earned 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <achievement.icon className={`h-6 w-6 ${
                      achievement.earned ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <p className={`font-semibold ${
                        achievement.earned ? 'text-green-900' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="card p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">This Week's Goals</h2>
              <div className="space-y-6">
                {[
                  { goal: 'Complete 5 lessons', current: 3, target: 5, color: 'green' },
                  { goal: 'Study 10 hours', current: 7, target: 10, color: 'blue' },
                  { goal: 'Complete 1 quiz', current: 0, target: 1, color: 'orange' }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.goal}</span>
                      <span className={`text-sm font-semibold ${
                        item.color === 'green' ? 'text-green-600' :
                        item.color === 'blue' ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>
                        {item.current}/{item.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          item.color === 'green' ? 'bg-green-600' :
                          item.color === 'blue' ? 'bg-blue-600' :
                          'bg-orange-600'
                        }`}
                        style={{ width: `${(item.current / item.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { icon: BookOpen, label: 'Browse Courses', href: '/courses', color: 'blue' },
                  { icon: Award, label: 'View Certificates', href: '/student/certificates', color: 'green' },
                  { icon: User, label: 'Get Support', href: '/student/support', color: 'purple' }
                ].map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="flex items-center w-full p-4 text-left rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <action.icon className={`h-5 w-5 mr-4 ${
                      action.color === 'blue' ? 'text-blue-600' :
                      action.color === 'green' ? 'text-green-600' :
                      'text-purple-600'
                    } group-hover:scale-110 transition-transform duration-200`} />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
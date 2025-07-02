import React, { useState } from 'react';
import { Search, Filter, Mail, Ban, Shield, MoreVertical, Users, UserCheck, UserX, Calendar } from 'lucide-react';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'Student',
      status: 'Active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=150',
      coursesEnrolled: 3,
      coursesCompleted: 1,
      totalHours: 45
    },
    {
      id: '2',
      name: 'Dr. Angela Yu',
      email: 'angela.yu@email.com',
      role: 'Teacher',
      status: 'Active',
      joinDate: '2023-12-01',
      lastActive: '1 day ago',
      avatar: 'https://images.pexels.com/photos/3771788/pexels-photo-3771788.jpeg?auto=compress&cs=tinysrgb&w=150',
      coursesCreated: 2,
      totalStudents: 2140,
      avgRating: 4.8
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      role: 'Student',
      status: 'Active',
      joinDate: '2024-02-20',
      lastActive: '3 hours ago',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      coursesEnrolled: 1,
      coursesCompleted: 0,
      totalHours: 28
    },
    {
      id: '4',
      name: 'Prof. Michael Chen',
      email: 'prof.chen@email.com',
      role: 'Teacher',
      status: 'Active',
      joinDate: '2024-01-10',
      lastActive: '5 hours ago',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      coursesCreated: 1,
      totalStudents: 890,
      avgRating: 4.9
    },
    {
      id: '5',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      role: 'Student',
      status: 'Suspended',
      joinDate: '2024-01-08',
      lastActive: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=150',
      coursesEnrolled: 2,
      coursesCompleted: 1,
      totalHours: 67
    },
    {
      id: '6',
      name: 'John Smith',
      email: 'john.smith@email.com',
      role: 'Teacher',
      status: 'Pending',
      joinDate: '2024-03-01',
      lastActive: '1 week ago',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      coursesCreated: 0,
      totalStudents: 0,
      avgRating: 0
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Teacher':
        return 'bg-blue-100 text-blue-800';
      case 'Student':
        return 'bg-purple-100 text-purple-800';
      case 'Admin':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDropdownToggle = (userId) => {
    setShowDropdown(showDropdown === userId ? null : userId);
  };

  const handleUserAction = (userId, action) => {
    console.log(`Performing ${action} on user ${userId}`);
    setShowDropdown(null);
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: users.filter(u => u.status === 'Active').length,
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Teachers',
      value: users.filter(u => u.role === 'Teacher').length,
      icon: Shield,
      color: 'purple'
    },
    {
      title: 'Suspended',
      value: users.filter(u => u.status === 'Suspended').length,
      icon: UserX,
      color: 'red'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage all users on the platform</p>
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
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-red-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-red-600'
                  }`} />
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="teacher">Teachers</option>
                <option value="admin">Admins</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Joined: {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Last active: {user.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 'Student' ? (
                        <div className="text-sm">
                          <div className="text-gray-900">{user.coursesEnrolled} enrolled</div>
                          <div className="text-gray-500">{user.coursesCompleted} completed</div>
                        </div>
                      ) : user.role === 'Teacher' ? (
                        <div className="text-sm">
                          <div className="text-gray-900">{user.coursesCreated} courses</div>
                          <div className="text-gray-500">{user.totalStudents} students</div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownToggle(user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {showDropdown === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                            <button 
                              onClick={() => handleUserAction(user.id, 'view')}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Users className="w-4 h-4 mr-2" />
                              View Profile
                            </button>
                            <button 
                              onClick={() => handleUserAction(user.id, 'email')}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </button>
                            {user.status === 'Active' ? (
                              <button 
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend User
                              </button>
                            ) : user.status === 'Suspended' ? (
                              <button 
                                onClick={() => handleUserAction(user.id, 'activate')}
                                className="flex items-center w-full px-4 py-2 text-green-600 hover:bg-green-50 transition-colors"
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activate User
                              </button>
                            ) : null}
                            {user.status === 'Pending' && user.role === 'Teacher' && (
                              <button 
                                onClick={() => handleUserAction(user.id, 'approve')}
                                className="flex items-center w-full px-4 py-2 text-green-600 hover:bg-green-50 transition-colors"
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Approve Teacher
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {filteredUsers.length} of {users.length} users
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

export default AdminUsers;
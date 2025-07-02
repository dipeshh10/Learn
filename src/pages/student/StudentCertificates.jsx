import React, { useState } from 'react';
import { Download, Share2, Award, Calendar, ExternalLink, Search, Filter } from 'lucide-react';

const StudentCertificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const certificates = [
    {
      id: '1',
      courseTitle: 'UI/UX Design Masterclass',
      instructor: 'Sarah Johnson',
      completionDate: '2024-01-15',
      certificateId: 'CERT-UXUI-2024-001',
      grade: 'A+',
      credentialUrl: 'https://certificates.learnfree.com/cert-1',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'issued',
      skills: ['User Experience Design', 'Prototyping', 'User Research', 'Visual Design']
    },
    {
      id: '2',
      courseTitle: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      completionDate: '2024-02-28',
      certificateId: 'CERT-WEB-2024-002',
      grade: 'A',
      credentialUrl: 'https://certificates.learnfree.com/cert-2',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'processing',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
    },
    {
      id: '3',
      courseTitle: 'Digital Marketing Strategy',
      instructor: 'Mark Thompson',
      completionDate: '2023-12-10',
      certificateId: 'CERT-DM-2023-003',
      grade: 'B+',
      credentialUrl: 'https://certificates.learnfree.com/cert-3',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'issued',
      skills: ['SEO', 'Content Marketing', 'Social Media', 'Analytics']
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || cert.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'issued':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Issued</span>;
      case 'processing':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Processing</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Pending</span>;
    }
  };

  const getGradeBadge = (grade) => {
    const gradeColors = {
      'A+': 'bg-green-500',
      'A': 'bg-green-400',
      'B+': 'bg-blue-500',
      'B': 'bg-blue-400',
      'C+': 'bg-yellow-500',
      'C': 'bg-yellow-400'
    };
    
    return (
      <span className={`${gradeColors[grade] || 'bg-gray-400'} text-white text-xs font-bold px-2 py-1 rounded`}>
        {grade}
      </span>
    );
  };

  const handleDownload = (certificate) => {
    // Mock download functionality
    console.log('Downloading certificate:', certificate.certificateId);
  };

  const handleShare = (certificate) => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: `${certificate.courseTitle} Certificate`,
        text: `I've completed ${certificate.courseTitle} and earned a certificate!`,
        url: certificate.credentialUrl
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(certificate.credentialUrl);
      alert('Certificate URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Certificates</h1>
          <p className="text-gray-600">Download and share your course completion certificates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Issued</p>
                <p className="text-2xl font-bold text-gray-900">
                  {certificates.filter(c => c.status === 'issued').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-gray-900">
                  {certificates.filter(c => c.status === 'processing').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
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
                  placeholder="Search certificates..."
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
                <option value="all">All Certificates</option>
                <option value="issued">Issued</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={certificate.image}
                  alt={certificate.courseTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(certificate.status)}
                </div>
                <div className="absolute bottom-4 left-4">
                  {getGradeBadge(certificate.grade)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{certificate.courseTitle}</h3>
                <p className="text-gray-600 mb-4">Instructor: {certificate.instructor}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Completed: {new Date(certificate.completionDate).toLocaleDateString()}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills Earned:</p>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-500 mb-4">
                    Certificate ID: {certificate.certificateId}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {certificate.status === 'issued' && (
                        <>
                          <button
                            onClick={() => handleDownload(certificate)}
                            className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </button>
                          <button
                            onClick={() => handleShare(certificate)}
                            className="flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </button>
                        </>
                      )}
                    </div>
                    
                    {certificate.status === 'issued' && (
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Complete courses to earn certificates'}
            </p>
          </div>
        )}

        {/* Certificate Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">About Certificates</h3>
          <div className="text-blue-800 space-y-2">
            <p>• Certificates are issued automatically upon 100% course completion</p>
            <p>• All certificates include a unique verification ID</p>
            <p>• Certificates can be shared on LinkedIn and other professional networks</p>
            <p>• Processing typically takes 24-48 hours after course completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCertificates;
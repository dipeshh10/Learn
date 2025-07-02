import React, { useState } from 'react';
import { 
  MessageCircle, 
  HelpCircle, 
  Book, 
  Mail, 
  Phone, 
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  FileText,
  Video,
  Headphones
} from 'lucide-react';

const StudentSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your email.',
      category: 'account'
    },
    {
      id: 2,
      question: 'Can I download course videos for offline viewing?',
      answer: 'Currently, our courses are designed for online streaming only. However, you can download supplementary materials like PDFs and code files from the resources section.',
      category: 'courses'
    },
    {
      id: 3,
      question: 'How do I get my certificate after completing a course?',
      answer: 'Certificates are automatically generated once you complete 100% of a course. You can find and download them from the "My Certificates" section in your student dashboard.',
      category: 'certificates'
    },
    {
      id: 4,
      question: 'What should I do if a video won\'t load?',
      answer: 'Try refreshing the page first. If the issue persists, check your internet connection, clear your browser cache, or try a different browser. Contact support if the problem continues.',
      category: 'technical'
    },
    {
      id: 5,
      question: 'Can I access courses on mobile devices?',
      answer: 'Yes! Our platform is fully responsive and works on all devices including smartphones and tablets. You can access your courses anytime, anywhere.',
      category: 'technical'
    },
    {
      id: 6,
      question: 'How long do I have access to a course?',
      answer: 'Once enrolled, you have lifetime access to all course materials. You can revisit lessons, download resources, and review content whenever you need.',
      category: 'courses'
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'green'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      availability: 'Mon-Fri, 9AM-6PM EST',
      action: 'Call Now',
      color: 'purple'
    },
    {
      icon: Video,
      title: 'Video Call',
      description: 'Schedule a screen-sharing session',
      availability: 'By appointment',
      action: 'Schedule',
      color: 'orange'
    }
  ];

  const recentTickets = [
    {
      id: 'T-001',
      subject: 'Video playback issue in Chrome',
      status: 'resolved',
      priority: 'medium',
      created: '2024-02-15',
      updated: '2024-02-16'
    },
    {
      id: 'T-002',
      subject: 'Certificate not generating',
      status: 'in-progress',
      priority: 'high',
      created: '2024-02-20',
      updated: '2024-02-21'
    },
    {
      id: 'T-003',
      subject: 'Course enrollment question',
      status: 'pending',
      priority: 'low',
      created: '2024-02-22',
      updated: '2024-02-22'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticketForm);
    // Reset form
    setTicketForm({
      subject: '',
      category: 'technical',
      priority: 'medium',
      description: ''
    });
    alert('Support ticket submitted successfully!');
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'resolved': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${statusColors[status]}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-orange-100 text-orange-800',
      'low': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${priorityColors[priority]}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-gray-600">Get help with your learning journey</p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {supportChannels.map((channel, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                <channel.icon className={`h-6 w-6 text-${channel.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{channel.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
              <p className="text-xs text-gray-500 mb-4">{channel.availability}</p>
              <button className={`w-full btn-primary text-sm`}>
                {channel.action}
              </button>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'faq', label: 'FAQ', icon: HelpCircle },
                { id: 'ticket', label: 'Submit Ticket', icon: MessageCircle },
                { id: 'tickets', label: 'My Tickets', icon: FileText },
                { id: 'resources', label: 'Resources', icon: Book }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search frequently asked questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Ticket Tab */}
            {activeTab === 'ticket' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Submit a Support Ticket</h3>
                <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="technical">Technical Issue</option>
                        <option value="account">Account & Billing</option>
                        <option value="course">Course Content</option>
                        <option value="certificate">Certificates</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                      rows="6"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please provide detailed information about your issue..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </button>
                </form>
              </div>
            )}

            {/* My Tickets Tab */}
            {activeTab === 'tickets' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">My Support Tickets</h3>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900">#{ticket.id}</span>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Updated: {new Date(ticket.updated).toLocaleDateString()}
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{ticket.subject}</h4>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(ticket.created).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Help Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <Book className="h-8 w-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">User Guide</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Complete guide on how to use the platform effectively
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Read Guide →
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <Video className="h-8 w-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Video Tutorials</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Step-by-step video tutorials for common tasks
                    </p>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Watch Videos →
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <Headphones className="h-8 w-8 text-purple-600 mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Webinars</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Live sessions covering platform features and tips
                    </p>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Join Webinar →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Need Immediate Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-800">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>support@learnfree.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>24/7 Live Chat Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSupport;
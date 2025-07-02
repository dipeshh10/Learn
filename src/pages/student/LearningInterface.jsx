import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  CheckCircle, 
  Circle,
  FileText,
  MessageCircle,
  Download,
  BookOpen,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const LearningInterface = () => {
  const { courseId, lessonId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  // Mock course data
  const course = {
    id: courseId || '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    totalLessons: 45,
    completedLessons: 29,
    progress: 65,
    sections: [
      {
        id: 1,
        title: 'HTML Fundamentals',
        lessons: [
          { id: '1-1', title: 'Introduction to HTML', duration: '15:30', completed: true },
          { id: '1-2', title: 'HTML Structure', duration: '12:45', completed: true },
          { id: '1-3', title: 'HTML Elements', duration: '18:20', completed: true }
        ]
      },
      {
        id: 2,
        title: 'CSS Styling',
        lessons: [
          { id: '2-1', title: 'CSS Basics', duration: '20:15', completed: true },
          { id: '2-2', title: 'CSS Selectors', duration: '16:30', completed: true },
          { id: '2-3', title: 'CSS Flexbox', duration: '25:10', completed: false, current: true }
        ]
      },
      {
        id: 3,
        title: 'JavaScript Programming',
        lessons: [
          { id: '3-1', title: 'JavaScript Basics', duration: '22:45', completed: false },
          { id: '3-2', title: 'Variables and Data Types', duration: '18:30', completed: false },
          { id: '3-3', title: 'Functions', duration: '24:15', completed: false }
        ]
      }
    ]
  };

  const currentLesson = {
    id: lessonId || '2-3',
    title: 'CSS Flexbox',
    description: 'Learn how to create flexible layouts using CSS Flexbox. Master the properties and techniques for responsive design.',
    duration: '25:10',
    videoUrl: 'https://example.com/video.mp4',
    resources: [
      { name: 'CSS Flexbox Cheat Sheet', type: 'pdf', url: '#' },
      { name: 'Practice Exercises', type: 'zip', url: '#' },
      { name: 'Code Examples', type: 'html', url: '#' }
    ]
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const markAsComplete = () => {
    // Logic to mark lesson as complete
    console.log('Lesson marked as complete');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Course Structure */}
        <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <Link to="/student/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 block">
              ← Back to My Courses
            </Link>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h2>
            <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Course Progress</span>
                <span>{course.completedLessons}/{course.totalLessons} lessons</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="p-4">
            {course.sections.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/student/learn/${courseId}/${lesson.id}`}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        lesson.current 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="mr-3">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          lesson.current ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="bg-black relative">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-75" />
                <p className="text-lg">Video Player Placeholder</p>
                <p className="text-sm opacity-75">{currentLesson.title}</p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4 text-white">
                <button onClick={togglePlayPause} className="hover:text-blue-400 transition-colors">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                <button className="hover:text-blue-400 transition-colors">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button className="hover:text-blue-400 transition-colors">
                  <SkipForward className="h-5 w-5" />
                </button>
                <div className="flex-1 mx-4">
                  <div className="bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                <button className="hover:text-blue-400 transition-colors">
                  <Volume2 className="h-5 w-5" />
                </button>
                <button className="hover:text-blue-400 transition-colors">
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h1>
                <p className="text-gray-600">{currentLesson.description}</p>
              </div>
              <button
                onClick={markAsComplete}
                className="btn-primary flex items-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Mark as Complete
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: BookOpen },
                  { id: 'resources', label: 'Resources', icon: FileText },
                  { id: 'discussion', label: 'Discussion', icon: MessageCircle },
                  { id: 'notes', label: 'My Notes', icon: FileText }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
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

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Overview</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                      In this lesson, you'll learn about CSS Flexbox, a powerful layout method that allows you to 
                      design flexible and responsive layouts with ease. We'll cover all the essential properties 
                      and demonstrate practical examples.
                    </p>
                    <h4 className="font-semibold text-gray-900 mb-2">What you'll learn:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Understanding the Flexbox model</li>
                      <li>Flex container and flex item properties</li>
                      <li>Alignment and justification</li>
                      <li>Responsive design with Flexbox</li>
                      <li>Common Flexbox patterns and solutions</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Downloadable Resources</h3>
                  <div className="space-y-3">
                    {currentLesson.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{resource.name}</p>
                            <p className="text-sm text-gray-500">{resource.type.toUpperCase()}</p>
                          </div>
                        </div>
                        <button className="flex items-center text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion & Q&A</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50"
                          alt="Student"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">Sarah M.</span>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-gray-600">
                            Great explanation of flexbox! Could you provide more examples of when to use 
                            flex-direction: column vs row?
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <textarea
                        placeholder="Ask a question or share your thoughts..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                      ></textarea>
                      <div className="flex justify-end mt-3">
                        <button className="btn-primary">Post Question</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">My Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes about this lesson..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button className="btn-primary">Save Notes</button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous Lesson
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Next Lesson
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningInterface;
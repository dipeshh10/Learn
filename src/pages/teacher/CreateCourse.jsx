import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Upload, Eye, Save, X } from 'lucide-react';

const createCourse = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    duration: '',
    requirements: [''],
    whatYouLearn: [''],
    image: '',
    curriculum: [
      {
        id: 1,
        title: '',
        lessons: [
          { id: 1, title: '', duration: '', type: 'video' }
        ]
      }
    ]
  });

  const categories = [
    'Web Development',
    'Data Science',
    'Design',
    'Marketing',
    'Business',
    'Photography',
    'Programming',
    'Mobile Development'
  ];

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setCourseData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: '',
      lessons: [
        { id: Date.now(), title: '', duration: '', type: 'video' }
      ]
    };
    setCourseData(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, newSection]
    }));
  };

  const addLesson = (sectionIndex) => {
    const newLesson = {
      id: Date.now(),
      title: '',
      duration: '',
      type: 'video'
    };
    setCourseData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map((section, index) =>
        index === sectionIndex
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      )
    }));
  };

  const updateSection = (sectionIndex, field, value) => {
    setCourseData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map((section, index) =>
        index === sectionIndex ? { ...section, [field]: value } : section
      )
    }));
  };

  const updateLesson = (sectionIndex, lessonIndex, field, value) => {
    setCourseData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              lessons: section.lessons.map((lesson, lIndex) =>
                lIndex === lessonIndex ? { ...lesson, [field]: value } : lesson
              )
            }
          : section
      )
    }));
  };

  const removeSection = (sectionIndex) => {
    setCourseData(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, index) => index !== sectionIndex)
    }));
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    setCourseData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              lessons: section.lessons.filter((_, lIndex) => lIndex !== lessonIndex)
            }
          : section
      )
    }));
  };

  const handleSubmit = (status = 'draft') => {
    // Here you would typically send the data to your backend
    console.log('Course data:', { ...courseData, status });
    alert(`Course ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
    navigate('/teacher/courses');
  };

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Course title, description, and category' },
    { id: 2, title: 'Course Content', description: 'What students will learn and requirements' },
    { id: 3, title: 'Curriculum', description: 'Course structure and lessons' },
    { id: 4, title: 'Preview & Publish', description: 'Review and publish your course' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={courseData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter course title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                value={courseData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what your course is about"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={courseData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level *
                </label>
                <select
                  value={courseData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Image URL
              </label>
              <input
                type="url"
                value={courseData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What will students learn? *
              </label>
              {courseData.whatYouLearn.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('whatYouLearn', index, e.target.value)}
                    placeholder="Enter a learning outcome"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {courseData.whatYouLearn.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('whatYouLearn', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('whatYouLearn')}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add learning outcome
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Requirements
              </label>
              {courseData.requirements.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    placeholder="Enter a requirement"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {courseData.requirements.length > 1 && (
                    <button
                      onClick={() => removeArrayItem('requirements', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayItem('requirements')}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add requirement
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Course Curriculum</h3>
              <button
                onClick={addSection}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </button>
            </div>

            {courseData.curriculum.map((section, sectionIndex) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                    placeholder="Section title"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-4"
                  />
                  <button
                    onClick={() => removeSection(sectionIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 ml-4">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'title', e.target.value)}
                        placeholder="Lesson title"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={lesson.duration}
                        onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'duration', e.target.value)}
                        placeholder="Duration"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select
                        value={lesson.type}
                        onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'type', e.target.value)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                        <option value="quiz">Quiz</option>
                      </select>
                      <button
                        onClick={() => removeLesson(sectionIndex, lessonIndex)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addLesson(sectionIndex)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Preview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Title:</span> {courseData.title || 'Not set'}</p>
                    <p><span className="font-medium">Category:</span> {courseData.category || 'Not set'}</p>
                    <p><span className="font-medium">Level:</span> {courseData.level}</p>
                    <p><span className="font-medium">Sections:</span> {courseData.curriculum.length}</p>
                    <p><span className="font-medium">Total Lessons:</span> {courseData.curriculum.reduce((total, section) => total + section.lessons.length, 0)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Learning Outcomes</h4>
                  <ul className="text-sm space-y-1">
                    {courseData.whatYouLearn.filter(item => item.trim()).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600">{courseData.description || 'No description provided'}</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => handleSubmit('draft')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleSubmit('published')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Publish Course
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/teacher/courses')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">Share your knowledge with students worldwide</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit('draft')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => handleSubmit('published')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Publish Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default createCourse;
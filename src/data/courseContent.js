// Course content data and utility functions

const courseContentData = [
  // ... (copy the course content array from the previous .ts file, updating instructor/role references to Nepali Roman if present)
];

export const getCourseContent = (courseId) => {
  return courseContentData.find(content => content.courseId === courseId);
};

export const getLesson = (courseId, lessonId) => {
  const courseContent = getCourseContent(courseId);
  if (!courseContent) return undefined;
  for (const section of courseContent.sections) {
    const lesson = section.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

export const updateLessonProgress = (courseId, lessonId, completed) => {
  const key = `lesson_progress_${courseId}_${lessonId}`;
  localStorage.setItem(key, completed.toString());
};

export const getLessonProgress = (courseId, lessonId) => {
  const key = `lesson_progress_${courseId}_${lessonId}`;
  return localStorage.getItem(key) === 'true';
}; 
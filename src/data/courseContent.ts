export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  content?: string;
  videoUrl?: string;
  videoId?: string; // YouTube video ID
  description: string;
  resources?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
  quiz?: {
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseContent {
  courseId: string;
  sections: CourseSection[];
}

// Web Development Course Content
export const webDevelopmentCourse: CourseContent = {
  courseId: '1',
  sections: [
    {
      id: 'html-fundamentals',
      title: 'HTML Fundamentals',
      description: 'Learn the building blocks of web development with HTML',
      lessons: [
        {
          id: 'html-intro',
          title: 'Introduction to HTML',
          duration: '15:30',
          type: 'video',
          description: 'Understanding what HTML is and its role in web development',
          videoId: 'UB1O30fR-EE', // HTML Crash Course
          content: `
            <h2>What is HTML?</h2>
            <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup tags.</p>
            
            <h3>Key Concepts:</h3>
            <ul>
              <li><strong>Elements:</strong> Building blocks of HTML pages</li>
              <li><strong>Tags:</strong> Keywords surrounded by angle brackets</li>
              <li><strong>Attributes:</strong> Additional information about elements</li>
              <li><strong>Semantic markup:</strong> Using meaningful tags for content</li>
            </ul>
            
            <h3>Your First HTML Document:</h3>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first HTML document.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

            <h3>Why Learn HTML?</h3>
            <p>HTML is the foundation of all web development. Every website you visit is built with HTML, making it an essential skill for:</p>
            <ul>
              <li>Web developers and designers</li>
              <li>Digital marketers</li>
              <li>Content creators</li>
              <li>Anyone working with websites</li>
            </ul>
          `,
          resources: [
            { name: 'HTML Cheat Sheet', type: 'pdf', url: '/resources/html-cheat-sheet.pdf' },
            { name: 'Practice Files', type: 'zip', url: '/resources/html-practice.zip' },
            { name: 'HTML Validator', type: 'link', url: 'https://validator.w3.org/' }
          ]
        },
        {
          id: 'html-structure',
          title: 'HTML Document Structure',
          duration: '12:45',
          type: 'video',
          description: 'Understanding the anatomy of an HTML document',
          videoId: 'salY_Sm6mv4', // HTML Document Structure
          content: `
            <h2>HTML Document Structure</h2>
            <p>Every HTML document follows a specific structure that browsers can understand and render properly.</p>
            
            <h3>Essential Elements:</h3>
            <ul>
              <li><strong>&lt;!DOCTYPE html&gt;</strong> - Declares the document type and version</li>
              <li><strong>&lt;html&gt;</strong> - Root element that wraps all content</li>
              <li><strong>&lt;head&gt;</strong> - Contains metadata about the document</li>
              <li><strong>&lt;body&gt;</strong> - Contains the visible content of the page</li>
            </ul>
            
            <h3>Head Section Elements:</h3>
            <ul>
              <li><strong>&lt;title&gt;</strong> - Page title shown in browser tab</li>
              <li><strong>&lt;meta&gt;</strong> - Metadata like charset, viewport, description</li>
              <li><strong>&lt;link&gt;</strong> - External resources like CSS files</li>
              <li><strong>&lt;script&gt;</strong> - JavaScript code or external scripts</li>
              <li><strong>&lt;style&gt;</strong> - Internal CSS styles</li>
            </ul>

            <h3>Complete Example:</h3>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta name="description" content="Learn HTML basics"&gt;
    &lt;title&gt;HTML Structure Example&lt;/title&gt;
    &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
    &lt;/header&gt;
    &lt;main&gt;
        &lt;p&gt;This is the main content area.&lt;/p&gt;
    &lt;/main&gt;
    &lt;footer&gt;
        &lt;p&gt;&copy; 2024 My Website&lt;/p&gt;
    &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
          `,
          resources: [
            { name: 'HTML Structure Template', type: 'html', url: '/resources/html-template.html' },
            { name: 'Meta Tags Guide', type: 'pdf', url: '/resources/meta-tags-guide.pdf' }
          ]
        },
        {
          id: 'html-elements',
          title: 'Common HTML Elements',
          duration: '18:20',
          type: 'video',
          description: 'Learn about the most commonly used HTML elements',
          videoId: 'MDLn5-zSQQI', // HTML Elements Tutorial
          content: `
            <h2>Common HTML Elements</h2>
            <p>HTML provides many elements for structuring content. Here are the most commonly used ones:</p>
            
            <h3>Text Elements:</h3>
            <ul>
              <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Headings (h1 is largest, h6 is smallest)</li>
              <li><strong>&lt;p&gt;</strong> - Paragraphs of text</li>
              <li><strong>&lt;span&gt;</strong> - Inline text container</li>
              <li><strong>&lt;div&gt;</strong> - Block-level container</li>
              <li><strong>&lt;strong&gt;</strong> - Important text (bold)</li>
              <li><strong>&lt;em&gt;</strong> - Emphasized text (italic)</li>
            </ul>
            
            <h3>List Elements:</h3>
            <ul>
              <li><strong>&lt;ul&gt;</strong> - Unordered (bulleted) list</li>
              <li><strong>&lt;ol&gt;</strong> - Ordered (numbered) list</li>
              <li><strong>&lt;li&gt;</strong> - List item</li>
              <li><strong>&lt;dl&gt;</strong> - Description list</li>
              <li><strong>&lt;dt&gt;</strong> - Description term</li>
              <li><strong>&lt;dd&gt;</strong> - Description definition</li>
            </ul>
            
            <h3>Link and Media Elements:</h3>
            <ul>
              <li><strong>&lt;a&gt;</strong> - Links to other pages or sections</li>
              <li><strong>&lt;img&gt;</strong> - Images</li>
              <li><strong>&lt;video&gt;</strong> - Video content</li>
              <li><strong>&lt;audio&gt;</strong> - Audio content</li>
              <li><strong>&lt;iframe&gt;</strong> - Embedded content</li>
            </ul>

            <h3>Semantic Elements:</h3>
            <ul>
              <li><strong>&lt;header&gt;</strong> - Page or section header</li>
              <li><strong>&lt;nav&gt;</strong> - Navigation links</li>
              <li><strong>&lt;main&gt;</strong> - Main content area</li>
              <li><strong>&lt;section&gt;</strong> - Thematic grouping of content</li>
              <li><strong>&lt;article&gt;</strong> - Standalone piece of content</li>
              <li><strong>&lt;aside&gt;</strong> - Sidebar content</li>
              <li><strong>&lt;footer&gt;</strong> - Page or section footer</li>
            </ul>
            
            <h3>Practical Example:</h3>
            <pre><code>&lt;article&gt;
    &lt;header&gt;
        &lt;h1&gt;Welcome to My Blog&lt;/h1&gt;
        &lt;p&gt;Published on &lt;time&gt;2024-01-15&lt;/time&gt;&lt;/p&gt;
    &lt;/header&gt;
    
    &lt;section&gt;
        &lt;h2&gt;Introduction&lt;/h2&gt;
        &lt;p&gt;This is a paragraph with &lt;strong&gt;bold text&lt;/strong&gt; and &lt;em&gt;italic text&lt;/em&gt;.&lt;/p&gt;
        
        &lt;h3&gt;My Favorite Technologies:&lt;/h3&gt;
        &lt;ul&gt;
            &lt;li&gt;HTML5&lt;/li&gt;
            &lt;li&gt;CSS3&lt;/li&gt;
            &lt;li&gt;JavaScript&lt;/li&gt;
        &lt;/ul&gt;
        
        &lt;p&gt;Learn more at &lt;a href="https://developer.mozilla.org"&gt;MDN Web Docs&lt;/a&gt;&lt;/p&gt;
        &lt;img src="web-development.jpg" alt="Web development illustration"&gt;
    &lt;/section&gt;
&lt;/article&gt;</code></pre>
          `,
          quiz: {
            questions: [
              {
                id: 'q1',
                question: 'Which HTML element is used for the largest heading?',
                options: ['<h1>', '<h6>', '<header>', '<title>'],
                correctAnswer: 0,
                explanation: '<h1> is the largest heading element in HTML, with <h6> being the smallest.'
              },
              {
                id: 'q2',
                question: 'What is the correct HTML element for inserting a line break?',
                options: ['<break>', '<br>', '<lb>', '<newline>'],
                correctAnswer: 1,
                explanation: '<br> is the correct HTML element for inserting a line break.'
              },
              {
                id: 'q3',
                question: 'Which element is used for creating an unordered list?',
                options: ['<ol>', '<ul>', '<list>', '<li>'],
                correctAnswer: 1,
                explanation: '<ul> creates an unordered (bulleted) list, while <ol> creates an ordered (numbered) list.'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'css-styling',
      title: 'CSS Styling',
      description: 'Master the art of styling web pages with CSS',
      lessons: [
        {
          id: 'css-basics',
          title: 'CSS Basics',
          duration: '20:15',
          type: 'video',
          description: 'Introduction to Cascading Style Sheets',
          videoId: 'yfoY53QXEnI', // CSS Crash Course
          content: `
            <h2>Introduction to CSS</h2>
            <p>CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the visual presentation of HTML elements, including colors, fonts, spacing, and positioning.</p>
            
            <h3>CSS Syntax:</h3>
            <pre><code>selector {
    property: value;
    property: value;
}</code></pre>
            
            <h3>Ways to Add CSS:</h3>
            <ol>
              <li><strong>Inline CSS:</strong> Using the style attribute directly on HTML elements</li>
              <li><strong>Internal CSS:</strong> Using &lt;style&gt; tag in the document head</li>
              <li><strong>External CSS:</strong> Linking to a separate .css file (recommended)</li>
            </ol>
            
            <h3>Examples:</h3>
            <h4>Inline CSS:</h4>
            <pre><code>&lt;p style="color: blue; font-size: 18px;"&gt;This is blue text&lt;/p&gt;</code></pre>
            
            <h4>Internal CSS:</h4>
            <pre><code>&lt;head&gt;
    &lt;style&gt;
        p {
            color: blue;
            font-size: 18px;
        }
    &lt;/style&gt;
&lt;/head&gt;</code></pre>
            
            <h4>External CSS:</h4>
            <pre><code>/* styles.css file */
h1 {
    color: #333;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 20px;
}

p {
    color: #666;
    line-height: 1.6;
    margin: 15px 0;
    font-family: Arial, sans-serif;
}

.highlight {
    background-color: yellow;
    padding: 5px;
}</code></pre>

            <h3>CSS Properties Categories:</h3>
            <ul>
              <li><strong>Text:</strong> color, font-size, font-family, text-align</li>
              <li><strong>Background:</strong> background-color, background-image</li>
              <li><strong>Layout:</strong> width, height, margin, padding</li>
              <li><strong>Border:</strong> border, border-radius, border-color</li>
              <li><strong>Position:</strong> position, top, left, z-index</li>
            </ul>
          `,
          resources: [
            { name: 'CSS Reference Guide', type: 'pdf', url: '/resources/css-reference.pdf' },
            { name: 'Color Palette Generator', type: 'link', url: 'https://coolors.co' },
            { name: 'CSS Validator', type: 'link', url: 'https://jigsaw.w3.org/css-validator/' }
          ]
        },
        {
          id: 'css-selectors',
          title: 'CSS Selectors',
          duration: '16:30',
          type: 'video',
          description: 'Learn how to target HTML elements with CSS selectors',
          videoId: 'l1mER1bV0N0', // CSS Selectors Tutorial
          content: `
            <h2>CSS Selectors</h2>
            <p>Selectors are patterns used to select the HTML elements you want to style. Understanding selectors is crucial for effective CSS.</p>
            
            <h3>Basic Selectors:</h3>
            <ul>
              <li><strong>Element Selector:</strong> <code>p { color: red; }</code> - Selects all &lt;p&gt; elements</li>
              <li><strong>Class Selector:</strong> <code>.my-class { color: blue; }</code> - Selects elements with class="my-class"</li>
              <li><strong>ID Selector:</strong> <code>#my-id { color: green; }</code> - Selects element with id="my-id"</li>
              <li><strong>Universal Selector:</strong> <code>* { margin: 0; }</code> - Selects all elements</li>
            </ul>
            
            <h3>Combinator Selectors:</h3>
            <ul>
              <li><strong>Descendant:</strong> <code>div p { color: red; }</code> - Selects all &lt;p&gt; inside &lt;div&gt;</li>
              <li><strong>Child:</strong> <code>div > p { color: blue; }</code> - Selects direct &lt;p&gt; children of &lt;div&gt;</li>
              <li><strong>Adjacent Sibling:</strong> <code>h1 + p { color: green; }</code> - Selects &lt;p&gt; immediately after &lt;h1&gt;</li>
              <li><strong>General Sibling:</strong> <code>h1 ~ p { color: orange; }</code> - Selects all &lt;p&gt; siblings after &lt;h1&gt;</li>
            </ul>
            
            <h3>Pseudo-classes:</h3>
            <ul>
              <li><strong>:hover</strong> - When user hovers over element</li>
              <li><strong>:focus</strong> - When element has focus (like input fields)</li>
              <li><strong>:active</strong> - When element is being clicked</li>
              <li><strong>:first-child</strong> - First child element</li>
              <li><strong>:last-child</strong> - Last child element</li>
              <li><strong>:nth-child(n)</strong> - Nth child element</li>
            </ul>

            <h3>Attribute Selectors:</h3>
            <ul>
              <li><strong>[attribute]</strong> - Elements with the attribute</li>
              <li><strong>[attribute="value"]</strong> - Elements with specific attribute value</li>
              <li><strong>[attribute^="value"]</strong> - Attribute starts with value</li>
              <li><strong>[attribute$="value"]</strong> - Attribute ends with value</li>
              <li><strong>[attribute*="value"]</strong> - Attribute contains value</li>
            </ul>

            <h3>Practical Examples:</h3>
            <pre><code>/* Style all links */
a {
    color: #007bff;
    text-decoration: none;
}

/* Style links on hover */
a:hover {
    color: #0056b3;
    text-decoration: underline;
}

/* Style navigation links specifically */
nav a {
    padding: 10px 15px;
    border-radius: 5px;
}

/* Style the first paragraph in articles */
article p:first-child {
    font-size: 1.2em;
    font-weight: bold;
}

/* Style external links */
a[href^="http"] {
    color: #28a745;
}

/* Style required form fields */
input[required] {
    border: 2px solid #dc3545;
}</code></pre>
          `
        },
        {
          id: 'css-flexbox',
          title: 'CSS Flexbox',
          duration: '25:10',
          type: 'video',
          description: 'Master flexible layouts with CSS Flexbox',
          videoId: 'JJSoEo8JSnc', // Flexbox Tutorial
          content: `
            <h2>CSS Flexbox</h2>
            <p>Flexbox is a powerful layout method that allows you to design flexible and responsive layouts with ease. It's perfect for distributing space and aligning items in a container.</p>
            
            <h3>Flex Container Properties:</h3>
            <ul>
              <li><strong>display: flex;</strong> - Creates a flex container</li>
              <li><strong>flex-direction:</strong> row | column | row-reverse | column-reverse</li>
              <li><strong>justify-content:</strong> flex-start | center | flex-end | space-between | space-around | space-evenly</li>
              <li><strong>align-items:</strong> flex-start | center | flex-end | stretch | baseline</li>
              <li><strong>flex-wrap:</strong> nowrap | wrap | wrap-reverse</li>
              <li><strong>gap:</strong> Sets space between flex items</li>
            </ul>
            
            <h3>Flex Item Properties:</h3>
            <ul>
              <li><strong>flex-grow:</strong> How much the item should grow (default: 0)</li>
              <li><strong>flex-shrink:</strong> How much the item should shrink (default: 1)</li>
              <li><strong>flex-basis:</strong> Initial size before free space is distributed</li>
              <li><strong>flex:</strong> Shorthand for grow, shrink, and basis</li>
              <li><strong>align-self:</strong> Override align-items for individual item</li>
            </ul>
            
            <h3>Common Flexbox Patterns:</h3>
            
            <h4>1. Center Content:</h4>
            <pre><code>.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}</code></pre>

            <h4>2. Navigation Bar:</h4>
            <pre><code>.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}</code></pre>

            <h4>3. Card Layout:</h4>
            <pre><code>.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.card {
    flex: 1 1 300px; /* grow, shrink, basis */
    max-width: 400px;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}</code></pre>

            <h4>4. Sidebar Layout:</h4>
            <pre><code>.layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    flex: 0 0 250px; /* don't grow or shrink, fixed width */
    background: #f5f5f5;
}

.main-content {
    flex: 1; /* take remaining space */
    padding: 2rem;
}</code></pre>

            <h3>Responsive Flexbox:</h3>
            <pre><code>/* Mobile-first approach */
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        flex-direction: row;
        align-items: center;
    }
}</code></pre>
          `,
          quiz: {
            questions: [
              {
                id: 'q1',
                question: 'Which property is used to create a flex container?',
                options: ['flex: container', 'display: flex', 'flex-container: true', 'container: flex'],
                correctAnswer: 1,
                explanation: 'display: flex is the property that creates a flex container.'
              },
              {
                id: 'q2',
                question: 'Which property controls the alignment of items along the main axis?',
                options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
                correctAnswer: 1,
                explanation: 'justify-content controls alignment along the main axis, while align-items controls alignment along the cross axis.'
              },
              {
                id: 'q3',
                question: 'What does flex: 1 mean for a flex item?',
                options: ['Fixed width of 1px', 'Grow to fill available space', 'Shrink by factor of 1', 'First item in order'],
                correctAnswer: 1,
                explanation: 'flex: 1 means the item will grow to fill available space equally with other flex: 1 items.'
              }
            ]
          }
        }
      ]
    }
  ]
};

// Data Science Course Content
export const dataScienceCourse: CourseContent = {
  courseId: '2',
  sections: [
    {
      id: 'python-fundamentals',
      title: 'Python for Data Science',
      description: 'Learn Python programming specifically for data science applications',
      lessons: [
        {
          id: 'python-intro',
          title: 'Python for Data Science',
          duration: '22:30',
          type: 'video',
          description: 'Introduction to Python programming for data science',
          videoId: 'LHBE6Q9XlzI', // Python for Data Science
          content: `
            <h2>Python for Data Science</h2>
            <p>Python is the most popular programming language for data science due to its simplicity, powerful libraries, and active community.</p>
            
            <h3>Why Python for Data Science?</h3>
            <ul>
              <li><strong>Easy to Learn:</strong> Simple, readable syntax</li>
              <li><strong>Rich Ecosystem:</strong> Extensive libraries for data analysis</li>
              <li><strong>Community Support:</strong> Large, active community</li>
              <li><strong>Versatility:</strong> Can handle various data science tasks</li>
            </ul>

            <h3>Essential Python Libraries:</h3>
            <ul>
              <li><strong>NumPy:</strong> Numerical computing and arrays</li>
              <li><strong>Pandas:</strong> Data manipulation and analysis</li>
              <li><strong>Matplotlib:</strong> Data visualization</li>
              <li><strong>Seaborn:</strong> Statistical data visualization</li>
              <li><strong>Scikit-learn:</strong> Machine learning</li>
              <li><strong>Jupyter:</strong> Interactive development environment</li>
            </ul>

            <h3>Python Basics for Data Science:</h3>
            <pre><code># Variables and data types
name = "Data Scientist"
age = 30
salary = 95000.50
is_employed = True

# Lists for data collections
temperatures = [23.5, 25.1, 22.8, 26.3, 24.7]
cities = ["New York", "London", "Tokyo", "Sydney"]

# Dictionaries for structured data
person = {
    "name": "Alice",
    "age": 28,
    "skills": ["Python", "SQL", "Machine Learning"]
}

# Functions for reusable code
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

avg_temp = calculate_average(temperatures)
print(f"Average temperature: {avg_temp:.1f}°C")</code></pre>

            <h3>Working with Data:</h3>
            <pre><code>import pandas as pd
import numpy as np

# Creating a DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'Salary': [50000, 60000, 70000, 55000],
    'Department': ['IT', 'Finance', 'IT', 'Marketing']
}

df = pd.DataFrame(data)
print(df)

# Basic data analysis
print(f"Average salary: ${df['Salary'].mean():,.2f}")
print(f"Oldest employee: {df['Age'].max()} years")
print(f"IT department count: {df[df['Department'] == 'IT'].shape[0]}")</code></pre>
          `,
          resources: [
            { name: 'Python Cheat Sheet', type: 'pdf', url: '/resources/python-cheat-sheet.pdf' },
            { name: 'Jupyter Notebook Setup', type: 'pdf', url: '/resources/jupyter-setup.pdf' },
            { name: 'Python.org', type: 'link', url: 'https://python.org' }
          ]
        }
      ]
    }
  ]
};

// UI/UX Design Course Content
export const uiuxDesignCourse: CourseContent = {
  courseId: '3',
  sections: [
    {
      id: 'design-principles',
      title: 'Design Principles',
      description: 'Learn fundamental design principles for creating effective user interfaces',
      lessons: [
        {
          id: 'design-fundamentals',
          title: 'Design Principles',
          duration: '18:45',
          type: 'video',
          description: 'Understanding core design principles for UI/UX',
          videoId: 'a5KYlHNKQB8', // Design Principles
          content: `
            <h2>Fundamental Design Principles</h2>
            <p>Good design is not just about making things look pretty. It's about creating intuitive, functional, and accessible experiences for users.</p>
            
            <h3>The 6 Core Design Principles:</h3>
            
            <h4>1. Contrast</h4>
            <p>Contrast helps create visual hierarchy and makes important elements stand out.</p>
            <ul>
              <li>Use contrasting colors for text and background</li>
              <li>Vary font sizes and weights</li>
              <li>Create contrast through spacing and positioning</li>
            </ul>

            <h4>2. Repetition</h4>
            <p>Repetition creates consistency and unity throughout your design.</p>
            <ul>
              <li>Consistent color schemes</li>
              <li>Repeated font families and sizes</li>
              <li>Consistent button styles and spacing</li>
            </ul>

            <h4>3. Alignment</h4>
            <p>Proper alignment creates order and organization.</p>
            <ul>
              <li>Align elements to create clean lines</li>
              <li>Use grids to maintain consistent alignment</li>
              <li>Avoid random placement of elements</li>
            </ul>

            <h4>4. Proximity</h4>
            <p>Related elements should be grouped together.</p>
            <ul>
              <li>Group related information</li>
              <li>Use white space to separate different sections</li>
              <li>Create logical information hierarchies</li>
            </ul>

            <h4>5. Balance</h4>
            <p>Balance creates stability and structure in your design.</p>
            <ul>
              <li><strong>Symmetrical:</strong> Elements mirrored on both sides</li>
              <li><strong>Asymmetrical:</strong> Different elements balanced by visual weight</li>
              <li><strong>Radial:</strong> Elements arranged around a central point</li>
            </ul>

            <h4>6. Emphasis</h4>
            <p>Emphasis draws attention to the most important elements.</p>
            <ul>
              <li>Use color to highlight important actions</li>
              <li>Increase size for important headings</li>
              <li>Use white space to create focus</li>
            </ul>

            <h3>Applying Principles in UI Design:</h3>
            <ul>
              <li><strong>Navigation:</strong> Use contrast and emphasis for active states</li>
              <li><strong>Forms:</strong> Group related fields using proximity</li>
              <li><strong>Content:</strong> Create hierarchy with typography and spacing</li>
              <li><strong>Buttons:</strong> Use repetition for consistent interaction patterns</li>
            </ul>

            <h3>Color Theory Basics:</h3>
            <ul>
              <li><strong>Primary Colors:</strong> Red, Blue, Yellow</li>
              <li><strong>Secondary Colors:</strong> Green, Orange, Purple</li>
              <li><strong>Color Harmony:</strong> Complementary, analogous, triadic</li>
              <li><strong>Color Psychology:</strong> How colors affect emotions and behavior</li>
            </ul>
          `,
          resources: [
            { name: 'Design Principles Guide', type: 'pdf', url: '/resources/design-principles.pdf' },
            { name: 'Color Theory Handbook', type: 'pdf', url: '/resources/color-theory.pdf' },
            { name: 'Adobe Color', type: 'link', url: 'https://color.adobe.com' }
          ]
        }
      ]
    }
  ]
};

// Export all course content
export const getAllCourseContent = (): CourseContent[] => {
  return [webDevelopmentCourse, dataScienceCourse, uiuxDesignCourse];
};

export const getCourseContent = (courseId: string): CourseContent | undefined => {
  return getAllCourseContent().find(course => course.courseId === courseId);
};

export const getLesson = (courseId: string, lessonId: string): Lesson | undefined => {
  const course = getCourseContent(courseId);
  if (!course) return undefined;
  
  for (const section of course.sections) {
    const lesson = section.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

// Progress tracking
export const updateLessonProgress = (courseId: string, lessonId: string, completed: boolean) => {
  // In a real app, this would update the backend
  const progressKey = `lesson_${courseId}_${lessonId}`;
  localStorage.setItem(progressKey, completed.toString());
};

export const getLessonProgress = (courseId: string, lessonId: string): boolean => {
  const progressKey = `lesson_${courseId}_${lessonId}`;
  return localStorage.getItem(progressKey) === 'true';
};

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create uploads directories for different content types
const questionDir = path.join(uploadDir, 'questions');
const submissionDir = path.join(uploadDir, 'submissions');
const sampleDir = path.join(uploadDir, 'sample');

// Ensure all required directories exist
[questionDir, submissionDir, sampleDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vignanExams', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'faculty', 'student'], required: true },
  name: String,
  regNumber: String,
  email: String,
  class: String,
  group: String,
  facultyId: String,
  department: String,
  teachingAssignments: [{
    class: String,
    subject: String
  }]
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  department: String,
  batch: String,
  section: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: String
});

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ['T1', 'T2', 'T3'], required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  deadline: { type: Date, required: true },
  description: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadDate: { type: Date, default: Date.now },
  file: {
    filename: String,
    path: String,
    originalName: String,
    mimetype: String,
    size: Number
  }
});

const submissionSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  files: [{
    filename: String,
    path: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: Date
  }],
  submissionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'reviewed', 'rejected'], default: 'pending' },
  feedback: String,
  grade: Number,
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewDate: Date
});

// Create models
const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Class = mongoose.model('Class', classSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Question = mongoose.model('Question', questionSchema);
const Submission = mongoose.model('Submission', submissionSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { fileType } = req.body;
    const uploadPath = fileType === 'question' ? questionDir : submissionDir;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// API Routes

// User authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (password === user.password) {
      // In a real app, never return passwords
      const userData = {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        regNumber: user.regNumber,
        class: user.class,
        group: user.group,
        facultyId: user.facultyId,
        department: user.department,
        teachingAssignments: user.teachingAssignments
      };
      
      return res.json({ success: true, user: userData });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Question upload endpoint
app.post('/api/questions/upload', upload.single('file'), async (req, res) => {
  try {
    const { type, title, subject, className, deadline, description, facultyId } = req.body;
    const file = req.file;

    const faculty = await User.findOne({ facultyId });
    
    const question = new Question({
      type,
      title,
      subject,
      class: className,
      deadline,
      description,
      uploadedBy: faculty ? faculty._id : null,
      file: {
        filename: file.filename,
        path: file.path,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      }
    });
    
    await question.save();
    res.json({ success: true, question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submission upload endpoint
app.post('/api/submissions/upload', upload.array('files', 5), async (req, res) => {
  try {
    const { assessmentId, groupId } = req.body;
    const files = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      uploadDate: new Date()
    }));
    
    const submission = new Submission({
      assessment: assessmentId,
      group: groupId,
      files,
      submissionDate: new Date(),
      status: 'pending'
    });
    
    await submission.save();
    res.json({ success: true, submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get questions by class
app.get('/api/questions/class/:className', async (req, res) => {
  try {
    const questions = await Question.find({ class: req.params.className })
      .sort({ uploadDate: -1 })
      .populate('uploadedBy', 'name');
    
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get questions by faculty
app.get('/api/questions/faculty/:facultyId', async (req, res) => {
  try {
    const faculty = await User.findOne({ facultyId: req.params.facultyId });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    const questions = await Question.find({ uploadedBy: faculty._id })
      .sort({ uploadDate: -1 });
    
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get submissions for faculty based on classes they teach
app.get('/api/submissions/faculty/:facultyId', async (req, res) => {
  try {
    const faculty = await User.findOne({ facultyId: req.params.facultyId });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    // Get all classes the faculty teaches
    const teachingClasses = faculty.teachingAssignments.map(ta => ta.class);
    
    // Find all questions for those classes
    const questions = await Question.find({ class: { $in: teachingClasses } });
    const questionIds = questions.map(q => q._id);
    
    // Find all submissions for those questions
    const submissions = await Submission.find({ assessment: { $in: questionIds } })
      .populate('group')
      .populate('assessment')
      .sort({ submissionDate: -1 });
    
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review to a submission
app.post('/api/submissions/:submissionId/review', async (req, res) => {
  try {
    const { grade, feedback, status, facultyId } = req.body;
    
    const faculty = await User.findOne({ facultyId });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    const submission = await Submission.findById(req.params.submissionId);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = status;
    submission.reviewedBy = faculty._id;
    submission.reviewDate = new Date();
    
    await submission.save();
    
    res.json({ success: true, submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all classes
app.get('/api/classes', async (req, res) => {
  try {
    const classes = await Class.find().sort({ name: 1 });
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all subjects
app.get('/api/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a class
app.post('/api/classes', async (req, res) => {
  try {
    const { name, department, batch, section } = req.body;
    
    const newClass = new Class({
      name,
      department,
      batch,
      section
    });
    
    await newClass.save();
    res.json({ success: true, class: newClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a subject
app.post('/api/subjects', async (req, res) => {
  try {
    const { code, name, department } = req.body;
    
    const newSubject = new Subject({
      code,
      name,
      department
    });
    
    await newSubject.save();
    res.json({ success: true, subject: newSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign faculty to classes and subjects
app.post('/api/faculty/assign', async (req, res) => {
  try {
    const { facultyId, assignments } = req.body;
    
    const faculty = await User.findOne({ facultyId });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    faculty.teachingAssignments = assignments;
    await faculty.save();
    
    res.json({ success: true, faculty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed initial data
async function seedInitialData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding initial data...');
      
      // Create admin user
      await User.create({
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        email: 'admin@vignan.ac.in'
      });
      
      // Create faculty user
      const faculty = await User.create({
        username: 'faculty',
        password: 'faculty123',
        role: 'faculty',
        name: 'Dr. Smith',
        email: 'smith@vignan.ac.in',
        facultyId: 'FAC2023001',
        department: 'Computer Science',
        teachingAssignments: [
          { class: 'CSE-A', subject: 'Web Technologies' },
          { class: 'CSE-B', subject: 'Database Systems' }
        ]
      });
      
      // Create student users
      const student1 = await User.create({
        username: '21BCE7777',
        password: 'student123',
        role: 'student',
        name: 'John Doe',
        regNumber: '21BCE7777',
        class: 'CSE-A',
        email: 'john.doe@vignan.ac.in'
      });
      
      const student2 = await User.create({
        username: '21BCE7778',
        password: 'student123',
        role: 'student',
        name: 'Jane Smith',
        regNumber: '21BCE7778',
        class: 'CSE-A',
        email: 'jane.smith@vignan.ac.in'
      });
      
      // Create classes
      const cseA = await Class.create({
        name: 'CSE-A',
        department: 'Computer Science',
        batch: '2021-2025',
        section: 'A',
        students: [student1._id, student2._id]
      });
      
      const cseB = await Class.create({
        name: 'CSE-B',
        department: 'Computer Science',
        batch: '2021-2025',
        section: 'B'
      });
      
      // Create subjects
      const webTech = await Subject.create({
        code: 'CSE301',
        name: 'Web Technologies',
        department: 'Computer Science'
      });
      
      const dbSystems = await Subject.create({
        code: 'CSE302',
        name: 'Database Systems',
        department: 'Computer Science'
      });
      
      // Create sample group
      const group = await Group.create({
        name: 'Group A-3',
        class: 'CSE-A',
        members: [student1._id, student2._id]
      });
      
      // Create sample assessments
      const t1 = await Question.create({
        type: 'T1',
        title: 'Implement a responsive web application using React',
        subject: 'Web Technologies',
        class: 'CSE-A',
        deadline: new Date('2025-05-15'),
        description: 'Create a responsive React application with at least 3 pages and proper routing.',
        uploadedBy: faculty._id,
        file: {
          filename: 'T1_WebTech_CSE-A.pdf',
          path: 'uploads/sample/SampleT1Questions.pdf',
          originalName: 'T1_WebTech_CSE-A.pdf',
          mimetype: 'application/pdf',
          size: 250000
        }
      });
      
      const t2 = await Question.create({
        type: 'T2',
        title: 'Add user authentication and database integration to your web app',
        subject: 'Web Technologies',
        class: 'CSE-A',
        deadline: new Date('2025-05-25'),
        description: 'Extend your T1 application by adding authentication and database functionality.',
        uploadedBy: faculty._id,
        file: {
          filename: 'T2_WebTech_CSE-A.pdf',
          path: 'uploads/sample/T2Extension.pdf',
          originalName: 'T2_WebTech_CSE-A.pdf',
          mimetype: 'application/pdf',
          size: 280000
        }
      });
      
      const t3 = await Question.create({
        type: 'T3',
        title: 'Create a presentation and IEEE paper on your web application',
        subject: 'Web Technologies',
        class: 'CSE-A',
        deadline: new Date('2025-06-05'),
        description: 'Present your application and document it according to IEEE format.',
        uploadedBy: faculty._id,
        file: {
          filename: 'SamplePresentation.pptx',
          path: 'uploads/sample/SamplePresentation.pptx',
          originalName: 'SamplePresentation.pptx',
          mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          size: 350000
        }
      });
      
      console.log('Initial data seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedInitialData();
});

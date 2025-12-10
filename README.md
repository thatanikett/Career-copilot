# Career Copilot

**AI-Powered Career Assistant with Secure Face Recognition Authentication**

Career Copilot is a full-stack web application that leverages AWS services and artificial intelligence to help users build professional resumes, practice interviews, and verify documents. The application features biometric face recognition authentication for secure user access.

## 🌟 Features

### 1. **Resume Builder**

- Create professional, AI-enhanced resumes
- Input personal information, work experience, skills, and achievements
- Generate PDF resumes powered by AI
- Download and manage your resume documents

### 2. **Interview Practice**

- Generate company-specific interview questions
- Get tailored questions for your target role
- Practice with AI-generated questions and answers
- Improve interview preparation

### 3. **Document Verification**

- Upload and verify professional documents
- Extract text and information from PDFs and images using AI OCR
- Validate document authenticity
- Secure document storage

### 4. **Secure Face Recognition Authentication**

- Biometric login using Amazon Rekognition
- Face-based user registration
- Secure facial comparison for authentication
- DynamoDB-backed user management

## 🏗️ Architecture

### Frontend

- **Framework:** React 19
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS with custom gradients
- **Build Tool:** Vite
- **UI Components:** Custom styled components with animations

### Backend

- **Framework:** Flask with CORS support
- **Authentication:** AWS Rekognition Face Recognition
- **Database:** AWS DynamoDB
- **Storage:** AWS S3
- **AI/ML:** AWS Bedrock for text generation
- **Document Processing:** AWS Textract for OCR
- **PDF Generation:** ReportLab

### AWS Services Integration

- **Amazon Rekognition:** Face detection and comparison
- **Amazon S3:** File storage and management
- **Amazon DynamoDB:** User data persistence
- **Amazon Textract:** Document text extraction
- **Amazon Bedrock:** AI-powered text generation
- **AWS IAM:** Secure credential management

## 📋 Prerequisites

### Frontend Requirements

- Node.js (v18 or higher)
- npm or yarn

### Backend Requirements

- Python 3.8+
- AWS Account with appropriate permissions
- AWS credentials configured locally

### Environment Variables (Backend)

```
AWS_REGION=ap-south-1
BUCKET_NAME=career.copilot.storage
DDB_TABLE=Users
```

## 🚀 Installation & Setup

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or as specified by Vite)

4. Build for production:

```bash
npm run build
```

### Backend Setup

1. From the project root directory, create a Python virtual environment:

```bash
python3 -m venv venv
```

2. Activate the virtual environment:

```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies from requirements.txt:

```bash
pip install -r requirements.txt
```

4. Configure AWS credentials:

```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, region, and output format
```

5. Run the Flask backend server:

```bash
cd backend
python app.py
```

**Note:** Make sure the virtual environment is activated before running the backend server. You should see `(venv)` in your terminal prompt when it's active.

The backend will run on `http://localhost:5000`

## 🔐 Authentication Flow

### User Registration

1. User provides a unique User ID
2. Captures a face image
3. Image is stored in S3
4. User metadata stored in DynamoDB
5. Registration complete

### User Login

1. User enters User ID
2. Captures a selfie
3. Selfie is compared against registered face using Amazon Rekognition
4. Facial match determines authentication success
5. Session created upon successful match

## 📁 Project Structure

```
career-copilot/
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component with all pages
│   │   ├── index.css         # Global styles
│   │   ├── main.jsx          # Entry point
│   │   └── assets/           # Static assets
│   ├── public/               # Public assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── eslint.config.js      # ESLint rules
│
├── backend/
│   ├── app.py                # Flask application with routes
│   ├── bedrock_client.py     # AWS Bedrock integration
│   ├── rekognition.py        # AWS Rekognition face recognition
│   ├── resume_pdf.py         # PDF generation logic
│   ├── s3_utils.py           # AWS S3 utilities
│   ├── textract_utils.py     # AWS Textract OCR integration
│   └── __pycache__/          # Python cache
│
└── README.md                 # This file
```

## 🔄 API Endpoints

### Authentication

- `POST /register` - Register a new user with face image
- `POST /login` - Authenticate user with face recognition

### Resume Management

- `POST /resume` - Create/generate a resume
- `POST /presign` - Get presigned URL for S3 download

### Interview Preparation

- `POST /generate_interview` - Generate interview questions using AI

### Document Processing

- `POST /verify` - Verify and extract text from documents

## 🎨 UI/UX Highlights

- **Gradient Backgrounds:** Subtle off-white to slate gradient for visual appeal
- **Dark Theme Navigation:** Professional dark navbar with gradient
- **Tab Interface:** Organized dashboard with easy navigation
- **Animations:** Smooth fade-in and scale animations for titles
- **Responsive Design:** Mobile-friendly with Tailwind CSS
- **Accessible Colors:** Maintained WCAG contrast standards

## 🛠️ Technologies Used

### Frontend

- React 19
- React Router DOM 7
- Tailwind CSS 4
- Vite 7
- JavaScript (ES6+)

### Backend

- Flask
- Python 3
- Boto3 (AWS SDK)
- ReportLab
- Pillow

### AWS Services

- Amazon Rekognition
- Amazon S3
- Amazon DynamoDB
- Amazon Textract
- Amazon Bedrock

## 📝 Usage Guide

### Creating a Resume

1. Log in to the dashboard
2. Click on "Resume Builder" tab
3. Fill in your personal information
4. Add skills, work experience, projects, and achievements
5. Submit to generate AI-enhanced resume
6. Download the PDF from the presigned S3 link

### Practicing Interviews

1. Navigate to "Interview Practice" tab
2. Enter target company and role
3. Generate interview questions
4. Review AI-generated answers
5. Practice with the questions

### Verifying Documents

1. Go to "Document Verification" tab
2. Upload document (PDF or image)
3. System extracts and verifies information
4. Review extracted content

## 🔐 Security Features

- **Biometric Authentication:** Face recognition instead of passwords
- **AWS IAM:** Secure credential management
- **CORS Protection:** API security measures
- **S3 Presigned URLs:** Temporary, secure download links
- **Data Encryption:** AWS services with encryption at rest and in transit
- **Session Management:** Secure session storage in browser

## 🚨 Error Handling

The application includes comprehensive error handling:

- User not found errors
- Invalid face detection
- AWS service failures
- Network errors
- Validation errors

Error messages are displayed to users in a user-friendly format.

## 📊 Future Enhancements

- [ ] Video interview practice with recording
- [ ] Multi-language support
- [ ] LinkedIn profile import
- [ ] Real-time collaboration features
- [ ] Advanced analytics and performance tracking
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Social sharing features

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-200 text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

/* Navbar Component */
function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-black shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">CC</span>
            </div>
            <span className="font-bold text-2xl text-white">
              Career Copilot
            </span>
          </Link>
          <div className="flex space-x-8 items-center">
            <Link
              className="text-gray-300 hover:text-white transition-colors font-medium"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-gray-300 hover:text-white transition-colors font-medium"
              to="/register"
            >
              Register
            </Link>
            <Link
              className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors shadow-md hover:shadow-lg font-medium"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Hero Home Page */
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .hero-title {
          font-family: 'Merriweather', serif;
        }
        .body-text {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-title {
          animation: fadeInScale 1s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="hero-title animate-title text-7xl md:text-8xl font-bold mb-6 text-gray-900 leading-tight">
            Career Copilot
          </h1>

          <p className="hero-title text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            AI-Powered Career Assistant with Secure Face Recognition
            Authentication
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="body-text px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="body-text px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-all shadow-lg font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="body-text font-bold text-xl mb-3 text-gray-900">
              Resume Builder
            </h3>
            <p className="body-text text-gray-600 leading-relaxed">
              Create professional resumes powered by artificial intelligence
              technology
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="body-text font-bold text-xl mb-3 text-gray-900">
              Interview Practice
            </h3>
            <p className="body-text text-gray-600 leading-relaxed">
              Prepare with AI-generated questions tailored to your target role
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-400 rounded-lg flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="body-text font-bold text-xl mb-3 text-gray-900">
              Document Verification
            </h3>
            <p className="body-text text-gray-600 leading-relaxed">
              Verify and extract information from documents using AI OCR
            </p>
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="body-text text-gray-500 text-sm">
            Secured with Amazon Rekognition Face Authentication
          </p>
        </div>
      </div>
    </div>
  );
}

/* Register Page */
function Register() {
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    if (!userId) return setMsg({ type: "error", text: "Enter user ID" });
    if (!file) return setMsg({ type: "error", text: "Upload an image" });

    setLoading(true);
    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({
          type: "success",
          text: `Successfully registered: ${data.userId}`,
        });
      } else {
        setMsg({ type: "error", text: data.error || JSON.stringify(data) });
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Register with face recognition</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-gray-900"
              placeholder="Choose a unique user ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Face Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-all cursor-pointer bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {file ? (
                  <div className="text-green-700 font-medium">{file.name}</div>
                ) : (
                  <div>
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div className="text-gray-600">
                      Click to upload face image
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      JPG, PNG (Max 5MB)
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          <button
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register with Amazon Rekognition"}
          </button>

          <Link
            to="/login"
            className="block text-center text-gray-600 hover:text-gray-900 transition-all"
          >
            Already have an account?{" "}
            <span className="text-gray-900 font-semibold">Sign in</span>
          </Link>
        </form>

        {msg && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              msg.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {msg.text}
          </div>
        )}
      </div>
    </div>
  );
}

/* Login Page */
function Login() {
  const [userId, setUserId] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [msg, setMsg] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const stopStream = useCallback(() => {
    try {
      const s = videoRef.current?.srcObject;
      if (s) {
        s.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    } catch (_err) {
      // ignore
    } finally {
      setStreaming(false);
    }
  }, []);

  useEffect(() => {
    return () => stopStream();
  }, [stopStream]);

  async function startStream() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
        setStreaming(true);
        setMsg(null);
      }
    } catch (_err) {
      setMsg({
        type: "error",
        text: "Camera access denied. Please allow camera permission.",
      });
    }
  }

  async function captureAndLogin() {
    if (!userId) return setMsg({ type: "error", text: "Enter user ID" });
    if (!streaming)
      return setMsg({ type: "error", text: "Start camera first" });

    const canvas = canvasRef.current;
    const v = videoRef.current;
    if (!canvas || !v)
      return setMsg({ type: "error", text: "Camera not ready" });

    canvas.width = v.videoWidth || 640;
    canvas.height = v.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((res) =>
      canvas.toBlob(res, "image/jpeg", 0.9)
    );
    if (!blob) return setMsg({ type: "error", text: "Capture failed" });

    setAuthenticating(true);
    setMsg({ type: "info", text: "Authenticating with Amazon Rekognition..." });

    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("selfie", blob, "selfie.jpg");

    try {
      const resp = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: fd,
      });
      const data = await resp.json();

      if (resp.ok && data.match) {
        setMsg({
          type: "success",
          text: `Face verified! Similarity: ${data.similarity.toFixed(2)}%`,
        });
        sessionStorage.setItem("cc_user", userId);
        stopStream();

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setMsg({
          type: "error",
          text: "Face doesn't match. Please try again.",
        });
      }
    } catch (_err) {
      setMsg({ type: "error", text: "Authentication failed: " + _err.message });
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Face Authentication
          </h2>
          <p className="text-gray-600">
            Login securely with Amazon Rekognition
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-gray-900"
              placeholder="Enter your user ID"
            />
          </div>

          <div
            className="relative bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-inner"
            style={{ minHeight: "400px" }}
          >
            <video
              ref={videoRef}
              className="w-full"
              style={{
                maxHeight: 400,
                backgroundColor: "#e5e7eb",
                display: streaming ? "block" : "none",
              }}
              playsInline
            />
            {!streaming && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="text-gray-600 text-lg font-medium">
                    Camera not active
                  </div>
                  <div className="text-gray-500 text-sm mt-2">
                    Click "Start Camera" below
                  </div>
                </div>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div className="flex gap-4">
            {!streaming ? (
              <button
                onClick={startStream}
                className="flex-1 px-6 py-4 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                Start Camera
              </button>
            ) : (
              <button
                onClick={stopStream}
                className="flex-1 px-6 py-4 bg-gray-600 text-white hover:bg-gray-700 rounded-lg transition-all duration-300 shadow-lg font-semibold text-lg"
              >
                Stop Camera
              </button>
            )}
            <button
              onClick={captureAndLogin}
              className="flex-1 px-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              disabled={authenticating || !streaming}
            >
              {authenticating ? "Verifying..." : "Capture & Login"}
            </button>
          </div>

          <Link
            to="/register"
            className="block text-center text-gray-600 hover:text-gray-900 transition-all"
          >
            Don't have an account?{" "}
            <span className="text-gray-900 font-semibold">Register now</span>
          </Link>
        </div>

        {msg && (
          <div
            className={`mt-6 p-4 rounded-lg font-medium ${
              msg.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : msg.type === "info"
                ? "bg-blue-50 border border-blue-200 text-blue-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {msg.text}
          </div>
        )}
      </div>
    </div>
  );
}

/* Dashboard with Tabs */
function Dashboard() {
  const userId = sessionStorage.getItem("cc_user");
  const [activeTab, setActiveTab] = useState("resume");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) navigate("/login");
  }, [userId, navigate]);

  const tabs = [
    { id: "resume", label: "Resume Builder" },
    { id: "interview", label: "Interview Practice" },
    { id: "verify", label: "Document Verification" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-2">
              Welcome back,{" "}
              <span className="text-gray-900 font-semibold">{userId}</span>
            </p>
          </div>
          <button
            className="px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 shadow-md font-semibold"
            onClick={() => {
              sessionStorage.removeItem("cc_user");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Main Dashboard Card with darker background */}
        <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-300 overflow-hidden">
          <div className="flex border-b border-gray-300 overflow-x-auto bg-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-md border-b-4 border-gray-900"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content area with white background */}
          <div className="p-8 bg-white">
            {activeTab === "resume" && <ResumeBuilder />}
            {activeTab === "interview" && <InterviewPractice />}
            {activeTab === "verify" && <DocumentVerify />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Resume Builder - With Better Layering */
function ResumeBuilder() {
  const userId = sessionStorage.getItem("cc_user") || "";
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [summary, setSummary] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [msg, setMsg] = useState(null);
  const [resumeResult, setResumeResult] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  function addSkill() {
    const s = skillInput.trim();
    if (!s) return;
    setSkills((prev) => [...prev, s]);
    setSkillInput("");
  }

  function removeSkill(idx) {
    setSkills((prev) => prev.filter((_, i) => i !== idx));
  }

  function addExperience() {
    setExperiences((prev) => [
      ...prev,
      { company: "", role: "", from: "", to: "", desc: "" },
    ]);
  }

  function updateExperience(idx, field, value) {
    setExperiences((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e))
    );
  }

  function removeExperience(idx) {
    setExperiences((prev) => prev.filter((_, i) => i !== idx));
  }

  function addProject() {
    setProjects((prev) => [...prev, { title: "", link: "", desc: "" }]);
  }

  function updateProject(idx, field, value) {
    setProjects((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    );
  }

  function removeProject(idx) {
    setProjects((prev) => prev.filter((_, i) => i !== idx));
  }

  function addAchievement() {
    setAchievements((prev) => [...prev, ""]);
  }

  function updateAchievement(idx, value) {
    setAchievements((prev) => prev.map((a, i) => (i === idx ? value : a)));
  }

  function removeAchievement(idx) {
    setAchievements((prev) => prev.filter((_, i) => i !== idx));
  }

  async function submitResume() {
    setMsg(null);
    setResumeResult(null);
    setDownloadUrl(null);

    if (!userId) {
      setMsg({ type: "error", text: "You must be logged in" });
      return;
    }

    setLoading(true);
    const payload = {
      user_id: userId,
      name,
      role,
      summary,
      skills,
      experiences,
      projects,
      achievements,
    };

    try {
      const resp = await fetch("http://localhost:5000/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await resp.json();

      if (!resp.ok) {
        setMsg({ type: "error", text: j.error || JSON.stringify(j) });
        setLoading(false);
        return;
      }

      setResumeResult(j);
      setMsg({ type: "success", text: "Resume created successfully!" });

      try {
        const presignResp = await fetch("http://localhost:5000/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ s3_key: j.s3_key, user_id: userId }),
        });
        const presignJson = await presignResp.json();

        if (!presignResp.ok) {
          setMsg({
            type: "warning",
            text: "Resume created but download link failed",
          });
        } else {
          setDownloadUrl(presignJson.url);
        }
      } catch (e) {
        setMsg({
          type: "warning",
          text: "Resume created but download link failed",
        });
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-gray-900";
  const buttonClass =
    "px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all font-medium shadow-md";
  const removeButtonClass =
    "px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded transition-all text-sm font-medium";

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Build Your Resume
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClass}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className={inputClass}
          placeholder="Brief summary about yourself..."
        />
      </div>

      <div className="border-t border-gray-300 pt-6">
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Skills
        </label>
        <div className="flex gap-2 mb-3">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className={inputClass}
            placeholder="e.g., React, Python"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill())
            }
          />
          <button type="button" onClick={addSkill} className={buttonClass}>
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <div
              key={i}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 border border-gray-400 shadow-sm"
            >
              {s}
              <button
                onClick={() => removeSkill(i)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-6">
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Work Experience
        </label>
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-3 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(i, "company", e.target.value)}
                className={inputClass}
              />
              <input
                placeholder="Role"
                value={exp.role}
                onChange={(e) => updateExperience(i, "role", e.target.value)}
                className={inputClass}
              />
              <input
                placeholder="From (e.g., Jan 2020)"
                value={exp.from}
                onChange={(e) => updateExperience(i, "from", e.target.value)}
                className={inputClass}
              />
              <input
                placeholder="To (e.g., Present)"
                value={exp.to}
                onChange={(e) => updateExperience(i, "to", e.target.value)}
                className={inputClass}
              />
            </div>
            <textarea
              placeholder="Description of your role..."
              value={exp.desc}
              onChange={(e) => updateExperience(i, "desc", e.target.value)}
              rows={2}
              className={inputClass + " mb-2"}
            />
            <button
              onClick={() => removeExperience(i)}
              className={removeButtonClass}
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addExperience} className={buttonClass}>
          Add Experience
        </button>
      </div>

      <div className="border-t border-gray-300 pt-6">
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Projects
        </label>
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-3 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                placeholder="Project Title"
                value={p.title}
                onChange={(e) => updateProject(i, "title", e.target.value)}
                className={inputClass}
              />
              <input
                placeholder="Link (optional)"
                value={p.link}
                onChange={(e) => updateProject(i, "link", e.target.value)}
                className={inputClass}
              />
            </div>
            <textarea
              placeholder="Project description..."
              value={p.desc}
              onChange={(e) => updateProject(i, "desc", e.target.value)}
              rows={2}
              className={inputClass + " mb-2"}
            />
            <button
              onClick={() => removeProject(i)}
              className={removeButtonClass}
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addProject} className={buttonClass}>
          Add Project
        </button>
      </div>

      <div className="border-t border-gray-300 pt-6">
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Achievements
        </label>
        {achievements.map((a, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={a}
              onChange={(e) => updateAchievement(i, e.target.value)}
              className={inputClass}
              placeholder="Achievement or award"
            />
            <button
              onClick={() => removeAchievement(i)}
              className={removeButtonClass}
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addAchievement} className={buttonClass}>
          Add Achievement
        </button>
      </div>

      <div className="border-t border-gray-300 pt-6 flex gap-4">
        <button
          onClick={submitResume}
          disabled={loading}
          className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Creating..." : "Generate Resume PDF"}
        </button>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            Download Resume
          </a>
        )}
      </div>

      {msg && (
        <div
          className={`p-4 rounded-lg ${
            msg.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : msg.type === "warning"
              ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      {resumeResult && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600">
            S3 Key: {resumeResult.s3_key}
          </div>
        </div>
      )}
    </div>
  );
}

/* Interview Practice - With Better Layering */
function InterviewPractice() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function generate() {
    setLoading(true);
    setErr(null);
    setOutput(null);

    try {
      const resp = await fetch("http://localhost:5000/generate_interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role }),
      });
      const j = await resp.json();

      if (!resp.ok) {
        setErr(j.error || JSON.stringify(j));
      } else {
        setOutput(j);
      }
    } catch (e) {
      setErr(e && e.message ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  function parseQuestions() {
    if (!output?.response?.results?.[0]?.outputText) return [];
    const outputText = output.response.results[0].outputText;
    const questions = [];
    const questionRegex =
      /"Question":\s*"([^"]*)"\s*,\s*"Answer":\s*"([^"]*)"/g;
    let match;

    while ((match = questionRegex.exec(outputText)) !== null) {
      questions.push({ Question: match[1], Answer: match[2] });
    }
    return questions;
  }

  const questions = parseQuestions();
  const inputClass =
    "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-gray-900";

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Interview Question Generator
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Google"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer"
            className={inputClass}
          />
        </div>
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Interview Questions"}
      </button>

      {err && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
          Error: {err}
        </div>
      )}

      {questions.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900 border-b-2 border-gray-400 pb-2">
            Interview Questions for {company} - {role}
          </h4>
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 border border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-all shadow-sm"
            >
              <div className="font-bold text-gray-900 text-lg mb-3">
                Q{index + 1}: {item.Question}
              </div>
              <div className="text-gray-700 pl-4 border-l-4 border-gray-800 bg-gray-50 py-2 rounded">
                <strong className="text-gray-600">Sample Answer:</strong>{" "}
                {item.Answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {output && questions.length === 0 && (
        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
          No complete questions found. Try again.
        </div>
      )}
    </div>
  );
}

/* Document Verify - With Better Layering */
function DocumentVerify() {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(sessionStorage.getItem("cc_user") || "");
  const [out, setOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function submit() {
    setOut(null);
    setErr(null);

    if (!userId) return setErr("Missing user ID - please login first");
    if (!file) return setErr("Upload a file");

    setLoading(true);
    const fd = new FormData();
    fd.append("user_id", userId);
    fd.append("file", file);

    try {
      const resp = await fetch("http://localhost:5000/verify", {
        method: "POST",
        body: fd,
      });
      const j = await resp.json();

      if (!resp.ok) {
        setErr(j.error || JSON.stringify(j));
      } else {
        setOut(j);
      }
    } catch (e) {
      setErr(e && e.message ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-gray-900";

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Document Verification with AWS Textract
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          User ID
        </label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Document
        </label>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center hover:border-gray-500 transition-all cursor-pointer bg-gray-100">
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
            id="doc-upload"
          />
          <label htmlFor="doc-upload" className="cursor-pointer">
            {file ? (
              <div className="text-green-700 font-medium">{file.name}</div>
            ) : (
              <div>
                <svg
                  className="w-16 h-16 mx-auto mb-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <div className="text-gray-600 font-medium">
                  Click to upload PDF or image
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Supported: PDF, JPG, PNG
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Verify Document"}
      </button>

      {err && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
          Error: {err}
        </div>
      )}

      {out && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-md">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-gray-600 text-sm font-medium">Job ID</div>
              <div className="text-gray-900 font-mono text-sm bg-gray-50 px-2 py-1 rounded mt-1">
                {out.job_id}
              </div>
            </div>
            <div>
              <div className="text-gray-600 text-sm font-medium">Status</div>
              <div
                className={`font-bold ${
                  out.status === "SUCCEEDED"
                    ? "text-green-700"
                    : "text-yellow-700"
                } mt-1`}
              >
                {out.status}
              </div>
            </div>
          </div>
          <div>
            <div className="text-gray-600 text-sm font-medium mb-2">
              Extracted Text
            </div>
            <pre className="bg-gray-50 p-4 rounded-lg text-gray-800 text-sm overflow-auto max-h-64 border border-gray-400 shadow-inner">
              {out.extracted_text}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

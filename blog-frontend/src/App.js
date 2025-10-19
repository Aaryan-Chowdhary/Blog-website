
// import React, { useState, useEffect } from 'react';
// import { Heart, MessageCircle, Edit, Trash2, User, LogOut, Home, PenSquare, BookOpen } from 'lucide-react';

// const API = {
//   async login(email, password) {
//     return { success: true, user: { id: 1, name: 'John Doe', email }, token: 'mock-token' };
//   },
//   async signup(name, email, password) {
//     return { success: true, user: { id: 1, name, email }, token: 'mock-token' };
//   },
//   async getBlogs() {
//     return [
//       { id: 1, title: 'Getting Started with React', excerpt: 'Learn the basics of React development...', content: 'React is a powerful JavaScript library for building user interfaces. It allows you to create reusable components and manage state efficiently. Whether you are building a simple website or a complex web application, React provides the tools you need to succeed. In this post, we will explore the fundamentals of React and how to get started with your first project.', author: 'John Doe', date: '2025-10-15', likes: 24, comments: [] },
//       { id: 2, title: 'Advanced JavaScript Patterns', excerpt: 'Explore design patterns in modern JS...', content: 'JavaScript has evolved significantly over the years, and modern development requires understanding advanced patterns and best practices. From closures to promises, from async/await to design patterns, this guide covers everything you need to write clean, maintainable JavaScript code. We will dive deep into functional programming concepts and how to apply them in real-world scenarios.', author: 'Jane Smith', date: '2025-10-14', likes: 18, comments: [] }
//     ];
//   },
//   async createBlog(blog) {
//     return { success: true, blog: { ...blog, id: Date.now() } };
//   },
//   async updateBlog(id, blog) {
//     return { success: true };
//   },
//   async deleteBlog(id) {
//     return { success: true };
//   },
//   async addComment(blogId, comment) {
//     return { success: true, comment: { id: Date.now(), ...comment } };
//   },
//   async likeBlog(blogId) {
//     return { success: true };
//   }
// };

// function App() {
//   const [currentView, setCurrentView] = useState('home');
//   const [user, setUser] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [editingBlog, setEditingBlog] = useState(null);

//   useEffect(() => {
//     loadBlogs();
//     const storedUser = { id: 1, name: 'Demo User', email: 'demo@example.com' };
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const loadBlogs = async () => {
//     const data = await API.getBlogs();
//     setBlogs(data);
//   };

//   const handleLogin = async (email, password) => {
//     const result = await API.login(email, password);
//     if (result.success) {
//       setUser(result.user);
//       setCurrentView('blogs');
//     }
//   };

//   const handleSignup = async (name, email, password) => {
//     const result = await API.signup(name, email, password);
//     if (result.success) {
//       setUser(result.user);
//       setCurrentView('blogs');
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setCurrentView('home');
//   };

//   const handleCreateBlog = async (blog) => {
//     const result = await API.createBlog({ ...blog, author: user.name, date: new Date().toISOString().split('T')[0], likes: 0, comments: [] });
//     if (result.success) {
//       await loadBlogs();
//       setCurrentView('blogs');
//     }
//   };

//   const handleUpdateBlog = async (id, blog) => {
//     await API.updateBlog(id, blog);
//     await loadBlogs();
//     setEditingBlog(null);
//     setCurrentView('blogs');
//   };

//   const handleDeleteBlog = async (id) => {
//     if (window.confirm('Delete this blog?')) {
//       await API.deleteBlog(id);
//       await loadBlogs();
//       setCurrentView('blogs');
//     }
//   };

//   const handleLike = async (blogId) => {
//     if (!user) {
//       alert('Please login to like posts');
//       return;
//     }
//     await API.likeBlog(blogId);
//     await loadBlogs();
//   };

//   const handleComment = async (blogId, text) => {
//     if (!user) {
//       alert('Please login to comment');
//       return;
//     }
//     await API.addComment(blogId, { author: user.name, text, date: new Date().toISOString() });
//     await loadBlogs();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <Header user={user} currentView={currentView} setCurrentView={setCurrentView} onLogout={handleLogout} />
      
//       <main className="container mx-auto px-4 py-8 max-w-6xl">
//         {currentView === 'home' && <HomePage setCurrentView={setCurrentView} />}
//         {currentView === 'login' && <LoginPage onLogin={handleLogin} setCurrentView={setCurrentView} />}
//         {currentView === 'signup' && <SignupPage onSignup={handleSignup} setCurrentView={setCurrentView} />}
//         {currentView === 'blogs' && <BlogList blogs={blogs} setSelectedBlog={setSelectedBlog} setCurrentView={setCurrentView} user={user} />}
//         {currentView === 'view' && selectedBlog && <BlogView blog={selectedBlog} user={user} onLike={handleLike} onComment={handleComment} onEdit={() => { setEditingBlog(selectedBlog); setCurrentView('edit'); }} onDelete={handleDeleteBlog} setCurrentView={setCurrentView} />}
//         {currentView === 'create' && <BlogEditor onSave={handleCreateBlog} onCancel={() => setCurrentView('blogs')} />}
//         {currentView === 'edit' && editingBlog && <BlogEditor blog={editingBlog} onSave={(blog) => handleUpdateBlog(editingBlog.id, blog)} onCancel={() => { setEditingBlog(null); setCurrentView('blogs'); }} />}
//       </main>
//     </div>
//   );
// }

// function Header({ user, currentView, setCurrentView, onLogout }) {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
//           <BookOpen className="w-8 h-8 text-indigo-600" />
//           <h1 className="text-2xl font-bold text-gray-800">BlogHub</h1>
//         </div>
        
//         <nav className="flex items-center gap-4">
//           <button onClick={() => setCurrentView('home')} className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${currentView === 'home' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
//             <Home className="w-4 h-4" />
//             <span>Home</span>
//           </button>
//           <button onClick={() => setCurrentView('blogs')} className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${currentView === 'blogs' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
//             <BookOpen className="w-4 h-4" />
//             <span>Blogs</span>
//           </button>
          
//           {user ? (
//             <>
//               <button onClick={() => setCurrentView('create')} className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
//                 <PenSquare className="w-4 h-4" />
//                 <span>Write</span>
//               </button>
//               <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
//                 <User className="w-4 h-4" />
//                 <span className="text-sm font-medium">{user.name}</span>
//               </div>
//               <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition">
//                 <LogOut className="w-5 h-5 text-gray-600" />
//               </button>
//             </>
//           ) : (
//             <>
//               <button onClick={() => setCurrentView('login')} className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">Login</button>
//               <button onClick={() => setCurrentView('signup')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Sign Up</button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// function HomePage({ setCurrentView }) {
//   return (
//     <div className="space-y-12">
//       <section className="text-center py-16">
//         <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to BlogHub</h2>
//         <p className="text-xl text-gray-600 mb-8">Share your stories, ideas, and experiences with the world</p>
//         <div className="flex gap-4 justify-center">
//           <button onClick={() => setCurrentView('blogs')} className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition">Explore Blogs</button>
//           <button onClick={() => setCurrentView('signup')} className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg text-lg hover:bg-indigo-50 transition">Get Started</button>
//         </div>
//       </section>

//       <section className="grid md:grid-cols-3 gap-8">
//         <FeatureCard icon={<BookOpen className="w-12 h-12 text-indigo-600" />} title="Read & Discover" description="Browse through thousands of blogs on various topics. No account needed to read!" />
//         <FeatureCard icon={<PenSquare className="w-12 h-12 text-indigo-600" />} title="Write & Share" description="Create your own blogs with our easy-to-use editor. Sign up to start writing!" />
//         <FeatureCard icon={<MessageCircle className="w-12 h-12 text-indigo-600" />} title="Engage & Connect" description="Like and comment on posts. Join discussions with other readers!" />
//       </section>

//       <section className="bg-white rounded-2xl shadow-lg p-8">
//         <h3 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h3>
//         <div className="space-y-6">
//           <Step number="1" title="Browse Freely" description="Anyone can read blogs without signing up. Explore content and discover new authors." />
//           <Step number="2" title="Create Account" description="Sign up in seconds to unlock full features. Write your own blogs and engage with others." />
//           <Step number="3" title="Write & Publish" description="Use our simple editor to create beautiful blog posts. Add titles, content, and publish instantly." />
//           <Step number="4" title="Interact" description="Like posts you enjoy and leave comments. Build connections with other writers and readers." />
//         </div>
//       </section>

//       <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-12 text-center text-white">
//         <h3 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h3>
//         <p className="text-lg mb-6 opacity-90">Join our community of writers and readers today</p>
//         <button onClick={() => setCurrentView('signup')} className="px-8 py-3 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">Sign Up Now</button>
//       </section>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
//       <div className="mb-4">{icon}</div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// }

// function Step({ number, title, description }) {
//   return (
//     <div className="flex gap-4">
//       <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">{number}</div>
//       <div>
//         <h4 className="text-xl font-bold text-gray-800 mb-1">{title}</h4>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </div>
//   );
// }

// function LoginPage({ onLogin, setCurrentView }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = () => {
//     if (email && password) {
//       onLogin(email, password);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} />
//         </div>
//         <button onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Login</button>
//       </div>
//       <p className="text-center mt-4 text-gray-600">Don't have an account? <button onClick={() => setCurrentView('signup')} className="text-indigo-600 font-semibold hover:underline">Sign Up</button></p>
//     </div>
//   );
// }

// function SignupPage({ onSignup, setCurrentView }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = () => {
//     if (name && email && password) {
//       onSignup(name, email, password);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} />
//         </div>
//         <button onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Sign Up</button>
//       </div>
//       <p className="text-center mt-4 text-gray-600">Already have an account? <button onClick={() => setCurrentView('login')} className="text-indigo-600 font-semibold hover:underline">Login</button></p>
//     </div>
//   );
// }

// function BlogList({ blogs, setSelectedBlog, setCurrentView, user }) {
//   return (
//     <div>
//       <h2 className="text-4xl font-bold text-gray-800 mb-8">Latest Blogs</h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         {blogs.map(blog => (
//           <div key={blog.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer" onClick={() => { setSelectedBlog(blog); setCurrentView('view'); }}>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h3>
//             <p className="text-gray-600 mb-4">{blog.excerpt}</p>
//             <div className="flex items-center justify-between text-sm text-gray-500">
//               <span>By {blog.author}</span>
//               <span>{blog.date}</span>
//             </div>
//             <div className="flex items-center gap-4 mt-4 pt-4 border-t">
//               <span className="flex items-center gap-1 text-gray-600"><Heart className="w-4 h-4" /> {blog.likes}</span>
//               <span className="flex items-center gap-1 text-gray-600"><MessageCircle className="w-4 h-4" /> {blog.comments?.length || 0}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function BlogView({ blog, user, onLike, onComment, onEdit, onDelete, setCurrentView }) {
//   const [comment, setComment] = useState('');

//   const handleCommentSubmit = () => {
//     if (comment.trim()) {
//       onComment(blog.id, comment);
//       setComment('');
//     }
//   };

//   const isAuthor = user && blog.author === user.name;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <button onClick={() => setCurrentView('blogs')} className="mb-4 text-indigo-600 hover:underline">← Back to Blogs</button>
      
//       <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
//             <div className="text-gray-600">By {blog.author} • {blog.date}</div>
//           </div>
//           {isAuthor && (
//             <div className="flex gap-2">
//               <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-lg transition"><Edit className="w-5 h-5 text-gray-600" /></button>
//               <button onClick={() => onDelete(blog.id)} className="p-2 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-5 h-5 text-red-600" /></button>
//             </div>
//           )}
//         </div>
        
//         <div className="prose max-w-none mb-6">
//           <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
//         </div>
        
//         <div className="flex items-center gap-6 pt-6 border-t">
//           <button onClick={() => onLike(blog.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
//             <Heart className="w-5 h-5 text-red-500" />
//             <span className="font-semibold">{blog.likes}</span>
//           </button>
//           <div className="flex items-center gap-2 text-gray-600">
//             <MessageCircle className="w-5 h-5" />
//             <span className="font-semibold">{blog.comments?.length || 0} Comments</span>
//           </div>
//         </div>
//       </article>

//       <div className="bg-white rounded-xl shadow-lg p-8">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6">Comments</h3>
        
//         {user ? (
//           <div className="mb-6">
//             <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows="3" />
//             <button onClick={handleCommentSubmit} className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Post Comment</button>
//           </div>
//         ) : (
//           <div className="mb-6 p-4 bg-indigo-50 rounded-lg text-center">
//             <p className="text-gray-700">Please <button onClick={() => setCurrentView('login')} className="text-indigo-600 font-semibold hover:underline">login</button> to comment</p>
//           </div>
//         )}

//         <div className="space-y-4">
//           {blog.comments?.map(c => (
//             <div key={c.id} className="p-4 bg-gray-50 rounded-lg">
//               <div className="flex justify-between items-start mb-2">
//                 <span className="font-semibold text-gray-800">{c.author}</span>
//                 <span className="text-sm text-gray-500">{new Date(c.date).toLocaleDateString()}</span>
//               </div>
//               <p className="text-gray-700">{c.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function BlogEditor({ blog, onSave, onCancel }) {
//   const [title, setTitle] = useState(blog?.title || '');
//   const [content, setContent] = useState(blog?.content || '');
//   const [excerpt, setExcerpt] = useState(blog?.excerpt || '');

//   const handleSubmit = () => {
//     if (title && content) {
//       onSave({ title, content, excerpt: excerpt || content.substring(0, 150) + '...' });
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">{blog ? 'Edit Blog' : 'Create New Blog'}</h2>
//       <div className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (Optional)</label>
//           <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description for preview..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
//           <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows="12" />
//         </div>
//         <div className="flex gap-4">
//           <button onClick={handleSubmit} className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Publish</button>
//           <button onClick={onCancel} className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// App.js - Copy this to your frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Edit, Trash2, User, LogOut, Home, PenSquare, BookOpen } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// API helper function using fetch
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
  };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
};

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBlogs();
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/blogs');
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const data = await apiRequest('/auth/login', 'POST', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setCurrentView('blogs');
    } catch (error) {
      alert(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      setLoading(true);
      const data = await apiRequest('/auth/signup', 'POST', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setCurrentView('blogs');
    } catch (error) {
      alert(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('home');
  };

  const handleCreateBlog = async (blog) => {
    try {
      setLoading(true);
      await apiRequest('/blogs', 'POST', blog);
      await loadBlogs();
      setCurrentView('blogs');
    } catch (error) {
      alert(error.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlog = async (id, blog) => {
    try {
      setLoading(true);
      await apiRequest(`/blogs/${id}`, 'PUT', blog);
      await loadBlogs();
      setEditingBlog(null);
      setCurrentView('blogs');
    } catch (error) {
      alert(error.message || 'Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Delete this blog?')) {
      try {
        setLoading(true);
        await apiRequest(`/blogs/${id}`, 'DELETE');
        await loadBlogs();
        setCurrentView('blogs');
      } catch (error) {
        alert(error.message || 'Failed to delete blog');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLike = async (blogId) => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
    try {
      await apiRequest(`/blogs/${blogId}/like`, 'POST');
      await loadBlogs();
      if (selectedBlog && selectedBlog._id === blogId) {
        const data = await apiRequest(`/blogs/${blogId}`);
        setSelectedBlog(data);
      }
    } catch (error) {
      alert(error.message || 'Failed to like post');
    }
  };

  const handleComment = async (blogId, text) => {
    if (!user) {
      alert('Please login to comment');
      return;
    }
    try {
      await apiRequest(`/blogs/${blogId}/comments`, 'POST', { text });
      await loadBlogs();
      const data = await apiRequest(`/blogs/${blogId}`);
      setSelectedBlog(data);
    } catch (error) {
      alert(error.message || 'Failed to add comment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header user={user} currentView={currentView} setCurrentView={setCurrentView} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {loading && <LoadingSpinner />}
        {currentView === 'home' && <HomePage setCurrentView={setCurrentView} />}
        {currentView === 'login' && <LoginPage onLogin={handleLogin} setCurrentView={setCurrentView} loading={loading} />}
        {currentView === 'signup' && <SignupPage onSignup={handleSignup} setCurrentView={setCurrentView} loading={loading} />}
        {currentView === 'blogs' && <BlogList blogs={blogs} setSelectedBlog={setSelectedBlog} setCurrentView={setCurrentView} user={user} />}
        {currentView === 'view' && selectedBlog && <BlogView blog={selectedBlog} user={user} onLike={handleLike} onComment={handleComment} onEdit={() => { setEditingBlog(selectedBlog); setCurrentView('edit'); }} onDelete={handleDeleteBlog} setCurrentView={setCurrentView} />}
        {currentView === 'create' && <BlogEditor onSave={handleCreateBlog} onCancel={() => setCurrentView('blogs')} loading={loading} />}
        {currentView === 'edit' && editingBlog && <BlogEditor blog={editingBlog} onSave={(blog) => handleUpdateBlog(editingBlog._id || editingBlog.id, blog)} onCancel={() => { setEditingBlog(null); setCurrentView('blogs'); }} loading={loading} />}
      </main>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    </div>
  );
}

function Header({ user, currentView, setCurrentView, onLogout }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">BlogHub</h1>
        </div>
        
        <nav className="flex items-center gap-4">
          <button onClick={() => setCurrentView('home')} className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${currentView === 'home' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button onClick={() => setCurrentView('blogs')} className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${currentView === 'blogs' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <BookOpen className="w-4 h-4" />
            <span>Blogs</span>
          </button>
          
          {user ? (
            <>
              <button onClick={() => setCurrentView('create')} className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                <PenSquare className="w-4 h-4" />
                <span>Write</span>
              </button>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentView('login')} className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">Login</button>
              <button onClick={() => setCurrentView('signup')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Sign Up</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function HomePage({ setCurrentView }) {
  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to BlogHub</h2>
        <p className="text-xl text-gray-600 mb-8">Share your stories, ideas, and experiences with the world</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setCurrentView('blogs')} className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition">Explore Blogs</button>
          <button onClick={() => setCurrentView('signup')} className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg text-lg hover:bg-indigo-50 transition">Get Started</button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard icon={<BookOpen className="w-12 h-12 text-indigo-600" />} title="Read & Discover" description="Browse through thousands of blogs on various topics. No account needed to read!" />
        <FeatureCard icon={<PenSquare className="w-12 h-12 text-indigo-600" />} title="Write & Share" description="Create your own blogs with our easy-to-use editor. Sign up to start writing!" />
        <FeatureCard icon={<MessageCircle className="w-12 h-12 text-indigo-600" />} title="Engage & Connect" description="Like and comment on posts. Join discussions with other readers!" />
      </section>

      <section className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h3>
        <div className="space-y-6">
          <Step number="1" title="Browse Freely" description="Anyone can read blogs without signing up. Explore content and discover new authors." />
          <Step number="2" title="Create Account" description="Sign up in seconds to unlock full features. Write your own blogs and engage with others." />
          <Step number="3" title="Write & Publish" description="Use our simple editor to create beautiful blog posts. Add titles, content, and publish instantly." />
          <Step number="4" title="Interact" description="Like posts you enjoy and leave comments. Build connections with other writers and readers." />
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h3>
        <p className="text-lg mb-6 opacity-90">Join our community of writers and readers today</p>
        <button onClick={() => setCurrentView('signup')} className="px-8 py-3 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">Sign Up Now</button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">{number}</div>
      <div>
        <h4 className="text-xl font-bold text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function LoginPage({ onLogin, setCurrentView, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled={loading} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} disabled={loading} />
        </div>
        <button onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <p className="text-center mt-4 text-gray-600">Don't have an account? <button onClick={() => setCurrentView('signup')} className="text-indigo-600 font-semibold hover:underline">Sign Up</button></p>
    </div>
  );
}

function SignupPage({ onSignup, setCurrentView, loading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (name && email && password) {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled={loading} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled={loading} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} disabled={loading} />
        </div>
        <button onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>
      <p className="text-center mt-4 text-gray-600">Already have an account? <button onClick={() => setCurrentView('login')} className="text-indigo-600 font-semibold hover:underline">Login</button></p>
    </div>
  );
}

function BlogList({ blogs, setSelectedBlog, setCurrentView }) {
  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Latest Blogs</h2>
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blogs yet. Be the first to write one!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <div key={blog._id || blog.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer" onClick={() => { setSelectedBlog(blog); setCurrentView('view'); }}>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {blog.author}</span>
                <span>{new Date(blog.createdAt || blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                <span className="flex items-center gap-1 text-gray-600"><Heart className="w-4 h-4" /> {blog.likes}</span>
                <span className="flex items-center gap-1 text-gray-600"><MessageCircle className="w-4 h-4" /> {blog.comments?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogView({ blog, user, onLike, onComment, onEdit, onDelete, setCurrentView }) {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onComment(blog._id || blog.id, comment);
      setComment('');
    }
  };

  const isAuthor = user && blog.author === user.name;

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => setCurrentView('blogs')} className="mb-4 text-indigo-600 hover:underline">← Back to Blogs</button>
      
      <article className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
            <div className="text-gray-600">By {blog.author} • {new Date(blog.createdAt || blog.date).toLocaleDateString()}</div>
          </div>
          {isAuthor && (
            <div className="flex gap-2">
              <button onClick={onEdit} className="p-2 hover:bg-gray-100 rounded-lg transition"><Edit className="w-5 h-5 text-gray-600" /></button>
              <button onClick={() => onDelete(blog._id || blog.id)} className="p-2 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-5 h-5 text-red-600" /></button>
            </div>
          )}
        </div>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{blog.content}</p>
        </div>
        
        <div className="flex items-center gap-6 pt-6 border-t">
          <button onClick={() => onLike(blog._id || blog.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-semibold">{blog.likes}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">{blog.comments?.length || 0} Comments</span>
          </div>
        </div>
      </article>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Comments</h3>
        
        {user ? (
          <div className="mb-6">
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows="3" />
            <button onClick={handleCommentSubmit} className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Post Comment</button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg text-center">
            <p className="text-gray-700">Please <button onClick={() => setCurrentView('login')} className="text-indigo-600 font-semibold hover:underline">login</button> to comment</p>
          </div>
        )}

        <div className="space-y-4">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((c, index) => (
              <div key={c._id || c.id || index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-800">{c.author}</span>
                  <span className="text-sm text-gray-500">{new Date(c.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{c.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogEditor({ blog, onSave, onCancel, loading }) {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');

  const handleSubmit = () => {
    if (title && content) {
      onSave({ title, content, excerpt: excerpt || content.substring(0, 150) + '...' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{blog ? 'Edit Blog' : 'Create New Blog'}</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled={loading} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (Optional)</label>
          <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description for preview..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" disabled={loading} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows="12" disabled={loading} />
        </div>
        <div className="flex gap-4">
          <button onClick={handleSubmit} className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish'}
          </button>
          <button onClick={onCancel} className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition" disabled={loading}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default App;
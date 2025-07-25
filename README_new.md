# My Portfolio

A modern, responsive single-page portfolio website for full-stack software developers built with React and Vite.

## ✨ Features

- **🎨 Modern Design** - Gradient backgrounds, smooth animations, and contemporary UI
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop
- **⚡ Single Page App** - Smooth scrolling navigation between sections
- **🎭 Rich Animations** - Fade-in effects, floating elements, and interactive hover states
- **📄 Resume Integration** - PDF preview and download functionality
- **🔗 Direct Contact** - Email, LinkedIn, GitHub, and social media links
- **🎯 Professional** - Clean code structure with modular components
- **⚡ Fast Performance** - Powered by Vite for lightning-fast development

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Navigation with scroll detection
│   ├── Hero.jsx         # Landing section with typing animation
│   ├── About.jsx        # About me with stats and highlights
│   ├── Projects.jsx     # Featured projects showcase
│   ├── Skills.jsx       # Technical skills with progress bars
│   ├── Resume.jsx       # Resume timeline and PDF viewer
│   └── Contact.jsx      # Contact methods and social links
├── App.jsx              # Main app with scroll tracking
├── App.css              # Modern CSS with animations
└── main.jsx             # Entry point
```

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Resume
Place your resume PDF in the `public` folder as `resume.pdf`

### 3. Customize Your Content
Edit the components in `src/components/` to update:
- **Hero.jsx**: Your name, title, and social links
- **About.jsx**: Personal description and statistics
- **Projects.jsx**: Your portfolio projects
- **Skills.jsx**: Technical skills and certifications
- **Resume.jsx**: Work experience and education
- **Contact.jsx**: Contact information and location

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio!

## 🎨 Customization Guide

### Adding Your Information

**Update Personal Details in Hero.jsx:**
```javascript
// Change your name and title
<span className="name">Your Name</span>

// Update social links
const socialLinks = [
  { name: "GitHub", url: "https://github.com/yourusername", icon: "🔗" },
  { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile", icon: "💼" },
  // ... add more
]
```

**Add Your Projects in Projects.jsx:**
```javascript
{
  id: 1,
  title: "Your Amazing Project",
  description: "Detailed project description",
  technologies: ["React", "Node.js", "MongoDB"],
  githubUrl: "https://github.com/yourusername/project",
  liveUrl: "https://your-project.com",
  images: ["project1.jpg"] // Optional: add to public folder
}
```

**Update Skills in Skills.jsx:**
```javascript
{
  category: "Frontend",
  icon: "🎨",
  skills: ["React", "Vue.js", "Your Skills"]
}
```

### Color Customization
Edit CSS variables in `App.css`:
```css
:root {
  --primary-color: #6366f1;    /* Main brand color */
  --secondary-color: #06b6d4;  /* Accent color */
  --accent-color: #f59e0b;     /* Highlight color */
}
```

## 📱 Sections Overview

1. **🏠 Hero** - Eye-catching landing with animated typing effect
2. **👤 About** - Personal introduction with statistics and highlights  
3. **💼 Projects** - Showcase of your best work with live demos
4. **🛠️ Skills** - Technical skills with animated progress bars
5. **📄 Resume** - Professional timeline and downloadable PDF
6. **📞 Contact** - Multiple ways to get in touch

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Popular Platforms

**Vercel (Recommended):**
1. Connect your GitHub repository
2. Deploy automatically on every push

**Netlify:**
1. Drag and drop the `dist` folder
2. Or connect via GitHub for continuous deployment

**GitHub Pages:**
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

## 🎯 Performance Features

- **Lazy Loading** - Components load as needed
- **Optimized Images** - Automatic image compression
- **CSS Animations** - Hardware-accelerated transitions
- **Minimal Bundle** - Only essential dependencies
- **Fast Navigation** - Smooth scrolling between sections

## 🔧 Technologies Used

- **Frontend**: React 19, Modern CSS3
- **Build Tool**: Vite (super fast HMR)
- **Styling**: Pure CSS with CSS Variables
- **Icons**: Emoji (lightweight and universal)
- **Animations**: CSS3 transitions and keyframes
- **Typography**: Inter font family

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Contact Features

The portfolio includes multiple contact methods:
- **📧 Direct Email** - Opens default email client
- **💼 LinkedIn** - Professional networking
- **🔗 GitHub** - Code repository access
- **🐦 Social Media** - Twitter and other platforms
- **📍 Location** - Your city/country
- **⏰ Response Time** - Set expectations

## 🎨 Design Philosophy

- **Minimalist** - Clean, uncluttered interface
- **Professional** - Business-appropriate aesthetic
- **Modern** - Contemporary design trends
- **Accessible** - WCAG compliance considerations
- **Fast** - Optimized for quick loading

## 📝 License

MIT License - Feel free to use this template for your own portfolio!

---

**Ready to showcase your skills?** 🚀 
Customize this template and deploy your professional portfolio today!

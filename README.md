# 🤖💰 AI-Powered Financial Advisor Bot

> **Built entirely with AI in just 1 hour using advanced prompt engineering techniques!**

A comprehensive financial advisory web application that provides personalized investment suggestions, budgeting tips, goal tracking, and intelligent chatbot assistance. This project demonstrates the power of AI-assisted development and prompt engineering.

## 🚀 **Live Demo**

[Add your deployed app link here]

## ✨ **Features**

- 📊 **Interactive Dashboard** with real-time financial analytics
- 💬 **AI Chatbot** powered by Google Gemini for personalized advice
- 💵 **Transaction Tracking** for income and expenses
- 🎯 **Goal Management** with progress tracking
- 📈 **Investment Suggestions** based on user profile
- 💡 **Smart Budgeting Tips** and recommendations
- 📱 **Responsive Design** for all devices
- 🔒 **No Authentication Required** - Direct access to main app

## 🛠️ **Tech Stack**

### Frontend
- **React.js** - Modern UI framework
- **Chart.js/Recharts** - Interactive charts and visualizations
- **Tailwind CSS** - Utility-first styling
- **Axios** - API communication

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLite** - Lightweight database
- **Google Gemini AI** - Advanced conversational AI
- **Pydantic** - Data validation and serialization

## 🤖 **AI Development Story**

This entire application was built in **just 1 hour** using AI tools and prompt engineering:

- 🎨 **Frontend**: Built with [Bolt.new](https://bolt.new) using natural language prompts
- ⚙️ **Backend & Database**: Developed with [Claude.ai](https://claude.ai) through detailed technical prompts
- 🧠 **AI Integration**: Google Gemini API for intelligent financial advice

The project showcases how effective prompt engineering can accelerate development and create production-ready applications.

## 📁 **Project Structure**

```
Financial-Advisor/
├── Frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Application pages
│   │   └── utils/          # Utility functions
│   └── package.json
├── Backend/                 # FastAPI server
│   ├── app.py              # Main backend application
│   └── financial_advisor.db # SQLite database
├── Prompts/                # AI prompts used for development
│   ├── frontend-prompts.md
│   └── backend-prompts.md
└── README.md
```

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- Google Gemini API Key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Financial-Advisor.git
   cd Financial-Advisor/Backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn google-generativeai python-multipart sqlite3
   ```

3. **Set up Gemini API Key**
   ```bash
   export GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Run the backend server**
   ```bash
   python app.py
   ```
   Server will start at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   App will open at `http://localhost:3000`

## 📡 **API Endpoints**

### User Management
- `GET /api/user/{user_id}` - Get user profile
- `PUT /api/user/{user_id}` - Update user profile

### Transactions
- `POST /api/transactions` - Add new transaction
- `GET /api/transactions/{user_id}` - Get user transactions

### Analytics
- `GET /api/analytics/{user_id}` - Get financial analytics data

### Goals
- `POST /api/goals` - Create new financial goal
- `GET /api/goals/{user_id}` - Get user goals
- `PUT /api/goals/{goal_id}` - Update goal progress

### AI Chat
- `POST /api/chat` - Chat with financial advisor bot
- `GET /api/chat/history/{user_id}` - Get chat history

### Financial Advice
- `POST /api/financial-advice` - Get comprehensive financial analysis

## 🧠 **AI Features**

### Intelligent Chatbot
- Personalized financial advice based on user data
- Context-aware responses using transaction history
- Goal-oriented recommendations
- Rule-based fallbacks for reliability

### Smart Analytics
- Automated expense categorization
- Savings rate analysis
- Investment recommendations by age group
- Budget optimization suggestions

## 📝 **Prompt Engineering**

Check out the detailed prompts used to build this application in the `/Prompts` directory:

- **Frontend Prompts**: Natural language descriptions for UI/UX design
- **Backend Prompts**: Technical specifications for API development
- **Database Design**: Schema and relationship definitions

These prompts demonstrate effective AI collaboration techniques for full-stack development.

## 🎯 **Key Accomplishments**

- ✅ Complete full-stack application in 60 minutes
- ✅ Production-ready code with proper error handling
- ✅ Responsive design with modern UI/UX
- ✅ AI integration with fallback mechanisms
- ✅ Comprehensive financial analytics
- ✅ Real-time data visualization

## 🔮 **Future Enhancements**

- [ ] User authentication and multi-user support
- [ ] Integration with real banking APIs
- [ ] Advanced ML models for predictions
- [ ] Mobile app development
- [ ] Export functionality for reports
- [ ] Email notifications for goals

## 🤝 **Contributing**

This project demonstrates AI-assisted development. Feel free to:

1. Fork the repository
2. Create feature branches
3. Submit pull requests
4. Share your own AI prompts and techniques

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

**Email**: [sonisoham91@gmail.com](mailto:sonisoham91@gmail.com)

For questions about:
- AI prompt engineering techniques
- Technical implementation details
- Collaboration opportunities
- AI development consulting

## 🙏 **Acknowledgments**

- **Bolt.new** - For rapid frontend development
- **Claude.ai** - For comprehensive backend generation
- **Google Gemini** - For intelligent AI conversations
- **Open Source Community** - For amazing tools and libraries

## ⭐ **Show Your Support**

If this project helped you understand AI-assisted development or prompt engineering, please:

- ⭐ Star this repository
- 🐛 Report issues
- 💡 Suggest improvements
- 📤 Share with others

---

**Built with ❤️ and AI in 1 hour | Powered by effective prompt engineering**
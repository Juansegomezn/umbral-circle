# 🌐 Umbral Circle

A modern, full-stack social media application built with cutting-edge technologies. Umbral Circle enables users to connect, share posts, engage with content through likes and comments, and build their network by following other users.

---

## 🎯 Project Overview

Umbral Circle is a full-featured social network that demonstrates professional full-stack development practices with a secure authentication system, real-time updates, and efficient state management. The application provides a seamless user experience with theme support (Light/Dark mode), responsive design, and smooth interactions.

**Status:** Production-Ready | **Architecture:** Monorepo (Frontend + Backend)

---

## ✨ Features

### 🔐 Authentication & Security
- **Secure Registration & Login** - User authentication with JWT tokens stored in httpOnly cookies
- **Password Hashing** - Bcryptjs for secure password management
- **Logout:** Server-side cookie clearance and local state reset.
- **Client-Side Validation:** Robust form validation in Login and Register (Email regex, 8-character password minimum, and empty field prevention).
- **Guest Access:** "Login as Guest" feature for instant platform exploration without registration.
- **Visual Feedback:** Integrated loading states with `CircularProgress` and button disabling to prevent duplicate API requests.

### Social Features
- 📝 **Create Posts** - Share text and images with your network
- ❤️ **Like System** - Like and unlike posts in real-time
- 💬 **Comments** - Add comments to posts with instant updates
- 👥 **Follow System** - Follow and unfollow other users
- 🗑️ **Post Management** - Delete your own posts with confirmation

### User Profile
- 👤 **Profile Management** - Edit profile information and preferences
- 🖼️ **Cover & Profile Pictures** - Upload and update profile images
- 📍 **Profile Information** - Manage username, name, city, and website
- 🎨 **Profile Customization** - Display user cover photo and profile picture

### User Experience
- 🌙 **Dark/Light Theme** - System-wide theme customization with SCSS
- ⚡ **Real-time Updates** - Pages update without requiring manual refresh
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🖼️ **Image Preview** - Preview images before posting
- 📂 **Dropdown Menus** - Intuitive menus for post management

### 🔍 Advanced Search & Navigation
- **Real-time User Search:** Integrated search bar in the Navbar using PostgreSQL `ILIKE` for high-performance user discovery.
- **Mobile-First Navigation:** Custom hamburger menu dropdown for account management and a dedicated mobile search overlay with toggleable "Lupa/X" icons.
- **Improved UX:** Interactive sidebar and profile sections for intuitive navigation.

### ⚡ Performance Optimization
- **Image Optimization:** Background images for Auth pages use Pexels URL parameters for auto-compression and resizing (WebP support).
- **Asset Preloading:** Critical assets are preloaded in the HTML head to reduce LCP (Largest Contentful Paint) times.
---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React with Vite (fast build tooling)
- **Styling:** SCSS with custom theme system (Light/Dark mode)
- **State Management:** TanStack Query (React Query) for server state
- **API Client:** Axios for HTTP requests
- **Routing:** React Router DOM
- **UI Components:** Material UI (Icons & Loaders)
- **HTTP Security:** Cookie-based JWT authentication

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT) with httpOnly cookies
- **Password Security:** Bcryptjs for password hashing
- **Middleware:** cookie-parser for cookie management
- **File Upload:** Multer for image uploads to local storage
- **API Pattern:** RESTful architecture

### Database & Cloud
- **System:** PostgreSQL (migrated from MySQL)
- **Hosting:** Supabase (High-performance relational database)
- **Infrastructure:** Previously MySQL/Railway, now optimized for Postgres.

---

## 📁 Project Structure

```
umbral-circle/
├── front/                    # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── navbar/       # Navigation bar
│   │   │   ├── leftbar/      # Left sidebar
│   │   │   ├── rightbar/     # Right sidebar
│   │   │   ├── share/        # Post creation component
│   │   │   ├── posts/        # Posts feed
│   │   │   ├── post/         # Individual post component
│   │   │   ├── comments/     # Comments section
│   │   │   ├── stories/      # Stories component
│   │   │   └── updateModal/  # Profile edit modal
│   │   ├── pages/            # Page-level components
│   │   │   ├── home/         # Home feed page
│   │   │   ├── profile/      # User profile page
│   │   │   ├── login/        # Login page
│   │   │   └── register/     # Registration page
│   │   ├── context/          # React context providers
│   │   │   ├── authContext.jsx       # Authentication state
│   │   │   └── darkModeContext.jsx   # Theme state
│   │   ├── utils/            # Utility functions
│   │   ├── axios.js          # Axios configuration
│   │   ├── global.scss       # Global styles
│   │   └── App.jsx           # Root component
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── back/                     # Express backend application
    ├── controllers/          # Request handlers
    │   ├── auth.js           # Authentication logic
    │   ├── user.js           # User-related endpoints
    │   ├── post.js           # Post CRUD operations
    │   ├── comment.js        # Comment management
    │   ├── like.js           # Like system
    │   └── relationship.js   # Follow/unfollow logic
    ├── routes/               # API routes
    │   ├── auth.js
    │   ├── users.js
    │   ├── posts.js
    │   ├── comments.js
    │   ├── likes.js
    │   └── relationships.js
    ├── connect.js            # Database connection
    ├── index.js              # Server entry point
    ├── package.json
    └── .env                  # Environment variables (not tracked)
```

---

## 🗄️ Database Schema

The MySQL database consists of 6 primary tables with relationships:

### Users Table
```sql
- id (INT, PK, AUTO_INCREMENT)
- username (VARCHAR(45), UNIQUE)
- email (VARCHAR(45), UNIQUE)
- password (VARCHAR(200)) 
- name (VARCHAR(45))
- profilePic (VARCHAR(300)) 
- coverPic (VARCHAR(300)) 
- location (VARCHAR(45))
- website (VARCHAR(45))
```

### Posts Table
```sql
- id (INT, PK, AUTO_INCREMENT)
- userId (INT, FK → users.id)
- description (VARCHAR(200))
- img (VARCHAR(300))
- createdAt (DATETIME)
```

### Stories Table (Coming Soon)
```sql
- id (INT, PK, AUTO_INCREMENT)
- img (VARCHAR(300))
- createdAt (DATETIME)
- userId (INT, FK → users.id)
```

### Comments Table
```sql
comments:
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- userId (INT, FOREIGN KEY → users.id)
- postId (INT, FOREIGN KEY → posts.id)
- description (VARCHAR(200))
- createdAt (TIMESTAMP)
```

### Likes Table
```sql
likes:
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- userId (INT, FOREIGN KEY → users.id)
- postId (INT, FOREIGN KEY → posts.id)
- UNIQUE(userId, postId) -- Prevent duplicate likes
```

### Relationships Table
```sql
relationships:
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- followerUserId (INT, FOREIGN KEY → users.id)
- followedUserId (INT, FOREIGN KEY → users.id)
- UNIQUE(followerUserId, followedUserId) -- Prevent duplicate follows
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16 or higher
- MySQL v8.0 or higher
- Git

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd back
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root of the `back` directory:**
   ```env
   DB_HOST=your_supabase_db_host
   DB_USER=postgres
   DB_PASSWORD=your_supabase_password
   DB_NAME=postgres
   DB_PORT=5432
   JWT_SECRET_KEY=your_secret_key
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   
   Or with Nodemon for automatic restart on file changes:
   ```bash
   npx nodemon index.js
   ```

The backend will run on `http://localhost:3000` by default.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will typically run on `http://localhost:5173` (Vite's default).

### Database Setup

1. **Create the MySQL database:**
   ```sql
   CREATE DATABASE umbral_circle;
   ```

2. **Import the schema** 
Locate the back/database.sql file. You can import it via terminal:

'mysql -u your_user -p umbral_circle < back/database.sql'

Alternatively, copy and execute the script within your preferred SQL client (MySQL Workbench, TablePlus, etc.).

---

## 📖 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Destroy session

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user information
- `GET /api/users/search?name=...` - Real-time user discovery.

### Posts
- `GET /api/posts` - Get all posts / feed
- `POST /api/posts` - Create post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/comments/:postId` - Get comments for post
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment

### Likes
- `POST /api/likes` - Like a post
- `DELETE /api/likes/:postId` - Unlike a post

### Relationships
- `POST /api/relationships` - Follow user
- `DELETE /api/relationships/:userId` - Unfollow user


> 💡 **For detailed request/reponse parameters and technical specifications, please refer to the [API.md](./API.md) file.**
---

## 🔐 Security Features

- ✅ **Password Hashing** - Bcryptjs with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **HttpOnly Cookies** - Prevent XSS attacks
- ✅ **CORS Configured** - Controlled cross-origin requests
- ✅ **Input Validation** - Server-side validation on all endpoints
- ✅ **Secure File Upload** - Multer with filename sanitization

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Juansegomezn/umbral-circle.git
cd umbral-circle
```

### 2. Backend Setup
```bash
cd back
npm install
# Create .env file with your database credentials
npm start # or npx nodemon index.js
```

### 3. Frontend Setup
```bash
cd ../front
npm install
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

---

## 🔄 Development Workflow

### Frontend Development
- Vite hot module replacement (HMM) for instant updates
- SCSS compilation with theme support
- React Query DevTools for debugging state
- ESLint configured for code quality

### Backend Development
- Use Nodemon for automatic server restart on code changes
- MySQL database operations with proper error handling
- JWT token validation on protected routes
- Multer configured for image uploads to `/public/upload`

---

## 💻 Environment Variables

### Backend `.env` Example
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=umbral
JWT_SECRET_KEY=your_super_secret_jwt_key_here
PORT=3000
```

### Frontend Configuration
- Axios configured in `src/axios.js` to connect with backend
- API base URL: `http://localhost:3000/`
- Automatic token inclusion using axios interceptors

---

## 🎨 Theme System

The application uses SCSS with a custom theme system supporting:
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes for low-light environments
- Global theme context via `darkModeContext.jsx`
- Instant theme switching without page reload
- Persistent theme preference in local storage

---

## 📦 Key Dependencies

### Frontend
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "@tanstack/react-query": "^4.0.0",
  "axios": "^1.0.0",
  "@mui/icons-material": "^5.0.0"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "mysql": "^2.18.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.0",
  "multer": "^1.4.0",
  "cookie-parser": "^1.4.0"
}
```

---

## 🖼️ Image Upload

Images are uploaded to the `/public/upload` directory with:
- Multer handling multipart form data
- Automatic filename generation (timestamp-based)
- Support for JPEG, PNG, GIF formats
- Server-side validation

---

## 🧪 Testing the API

You can test endpoints using:
- **Postman** - Import API collection
- **Insomnia** - REST client
- **cURL** - Command line

Example:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

---

## 📚 Component Architecture

### State Management
- **Auth Context** - Manages user authentication & current user data
- **Dark Mode Context** - Handles theme state globally
- **React Query** - Manages server state with automatic caching & invalidation

### Data Flow
1. User interaction in component
2. API call via Axios
3. React Query handles request & caching
4. Context updates trigger re-render
5. UI reflects new state

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173 (frontend)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Kill process on port 3000 (backend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Error
- Ensure your PostgreSQL instance is running (Supabase).
- Verify `.env` credentials (DB_HOST, DB_PORT 5432).
- Check PostgreSQL connection limits if using a free tier.
- Refer to `umbral-db.docx` for the exact schema structure and reference images.

### CORS Issues
- Backend CORS is configured to allow frontend requests
- Verify both services are running on correct ports

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

<div align="center">

**Developed by Juan Sebastian Gomez Ayala**

</div>
# 📖 Umbral Circle API Documentation

This document provides a detailed reference for all the API endpoints available in the **Umbral Circle** backend.

## 🔑 Authentication (`/auth`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user. Hash password using bcrypt. |
| `POST` | `/login` | Authenticates user and returns JWT in an `accessToken` cookie. |
| `POST` | `/logout` | Clears the `accessToken` cookie. |

---

## 📬 Posts (`/posts`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/?userId=ID` | Get posts from a specific user OR from current user + followed users if no ID is provided. | ✅ |
| `POST` | `/` | Create a new post. Expects `description` and `img`. | ✅ |
| `DELETE` | `/:id` | Delete a post. Only allowed if the user is the owner. | ✅ |

---

## 💬 Comments (`/comments`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/?postId=ID` | Get all comments for a specific post. | ❌ |
| `POST` | `/` | Add a comment to a post. Expects `description` and `postId`. | ✅ |

---

## ❤️ Likes (`/likes`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/?postId=ID` | Get all users who liked a post. | ❌ |
| `POST` | `/` | Add a like to a post. Expects `postId`. | ✅ |
| `DELETE` | `/?postId=ID` | Remove a like from a post. | ✅ |

---

## 👥 Relationships (`/relationships`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/?followedUserId=ID`| Get list of followers for a user. | ❌ |
| `POST` | `/` | Follow a user. Expects `followedUserId`. | ✅ |
| `DELETE` | `/?followedUserId=ID`| Unfollow a user. | ✅ |

---

## 👤 Users (`/users`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/find/:userId` | Get public profile information. (Excludes password). | ❌ |
| `PUT` | `/` | Update current user profile. Expects all profile fields. | ✅ |

---

## 📁 File Upload (`/upload`)

| Method | Endpoint | Description | Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/upload` | Uploads an image to server storage. | `file` (Multipart) |

> **Note:** All protected routes (✅) require the `accessToken` cookie to be present in the request header.
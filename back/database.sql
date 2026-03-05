-- Create Database
CREATE DATABASE IF NOT EXISTS umbral_circle;
USE umbral_circle;

-- 1. Users Table
-- Stores user credentials, profile information, and preferences
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(200) NOT NULL,
  name VARCHAR(45) NOT NULL,
  coverPic VARCHAR(300) NULL,
  profilePic VARCHAR(300) NULL,
  location VARCHAR(45) NULL,
  website VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX username_UNIQUE (username ASC),
  UNIQUE INDEX email_UNIQUE (email ASC)
) ENGINE=InnoDB;

-- 2. Posts Table
-- Stores user-generated content with optional image support
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  description VARCHAR(200) NULL,
  img VARCHAR(300) NULL,
  userId INT NOT NULL,
  createdAt DATETIME NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_post_user FOREIGN KEY (userId) 
    REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3. Comments Table
-- Manages feedback and discussions on specific posts
CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT,
  description VARCHAR(200) NOT NULL,
  createdAt DATETIME NULL,
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_comment_user FOREIGN KEY (userId) 
    REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_comment_post FOREIGN KEY (postId) 
    REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 4. Likes Table
-- Tracks user engagement on posts with a unique constraint to prevent duplicate likes
CREATE TABLE likes (
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX unique_like (userId ASC, postId ASC),
  CONSTRAINT fk_like_user FOREIGN KEY (userId) 
    REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_like_post FOREIGN KEY (postId) 
    REFERENCES posts (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. Relationships Table
-- Manages the follower/following social graph between users
CREATE TABLE relationships (
  id INT NOT NULL AUTO_INCREMENT,
  followerUserId INT NOT NULL,
  followedUserId INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX unique_rel (followerUserId ASC, followedUserId ASC),
  CONSTRAINT fk_rel_follower FOREIGN
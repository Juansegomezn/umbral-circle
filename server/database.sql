-- 1. Users Table
CREATE TABLE umbral.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  name VARCHAR(45) NOT NULL,
  "coverPic" VARCHAR(300),
  "profilePic" VARCHAR(300),
  location VARCHAR(45),
  website VARCHAR(45)
);

-- 2. Posts Table
CREATE TABLE umbral.posts (
  id SERIAL PRIMARY KEY,
  description VARCHAR(500),
  img VARCHAR(300),
  "userId" INT NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_post_user FOREIGN KEY ("userId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Comments Table
CREATE TABLE umbral.comments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(200) NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  "userId" INT NOT NULL,
  "postId" INT NOT NULL,
  CONSTRAINT fk_comment_user FOREIGN KEY ("userId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_comment_post FOREIGN KEY ("postId") 
    REFERENCES umbral.posts (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. Likes Table
CREATE TABLE umbral.likes (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "postId" INT NOT NULL,
  CONSTRAINT unique_like UNIQUE ("userId", "postId"),
  CONSTRAINT fk_like_user FOREIGN KEY ("userId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_like_post FOREIGN KEY ("postId") 
    REFERENCES umbral.posts (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. Relationships Table
CREATE TABLE umbral.relationships (
  id SERIAL PRIMARY KEY,
  "followerUserId" INT NOT NULL,
  "followedUserId" INT NOT NULL,
  CONSTRAINT unique_rel UNIQUE ("followerUserId", "followedUserId"),
  CONSTRAINT fk_rel_follower FOREIGN KEY ("followerUserId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_rel_followed FOREIGN KEY ("followedUserId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 6. Main Stories Table
CREATE TABLE umbral.stories (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "contentUrl" VARCHAR(300) NOT NULL,
  "contentType" VARCHAR(10) NOT NULL, -- 'image' or 'video'
  "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_story_user FOREIGN KEY ("userId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX idx_stories_user_date ON umbral.stories("userId", "createdAt" DESC);

-- 7. Story Views Table
CREATE TABLE umbral.story_views (
  id SERIAL PRIMARY KEY,
  "storyId" INT NOT NULL,
  "userId" INT NOT NULL,
  "viewedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_view_story FOREIGN KEY ("storyId") 
    REFERENCES umbral.stories (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_view_user FOREIGN KEY ("userId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT unique_user_story_view UNIQUE ("storyId", "userId")
);

-- 8. Story Reactions Table
CREATE TABLE umbral.story_reactions (
  id SERIAL PRIMARY KEY,
  "storyId" INT NOT NULL,
  "userId" INT NOT NULL,
  "emoji" VARCHAR(10) NOT NULL,
  "reactedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reaction_story FOREIGN KEY ("storyId") 
    REFERENCES umbral.stories (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_reaction_user FOREIGN KEY ("userId") 
    REFERENCES umbral.users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT unique_user_story_reaction UNIQUE ("storyId", "userId")
);
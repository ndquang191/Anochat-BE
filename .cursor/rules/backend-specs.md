# Backend Specification: Anonymous Chat App

## Overview

This document defines the backend requirements for an anonymous chat application. It outlines all core functionalities that need to be implemented in the NestJS backend. Database schema and implementation are not included here.

---

## 1. Authentication & Authorization

- Users must authenticate using Google OAuth via the `better-auth` service.
- The backend will receive an access token from `better-auth`.
- On first login, the backend stores the following user data:
  - `user_id`, `email`, `name`, `avatar`
- The backend will issue a JWT token to the client.

---

## 2. User Profile Management

- After login, the user can optionally provide the following info:
  - `age`, `city`, `gender` (`male` or `female`)
- Each field can be hidden from their chat partner (privacy setting).
- These profile fields are stored separately from OAuth data.

---

## 3. Matchmaking Queue System

- After completing profile info, the user selects a chat category.
- Current categories (configurable): `['polite']`
- The user is placed in a queue based on:
  - Gender
  - Selected category
- The system matches users of opposite genders in the same category.
- When matched, a chat room is created for the two users.

---

## 4. Real-Time Chat (WebSocket)

- Users in a room communicate via WebSocket.
- Messages are stored in the database during the chat session.

---

## 5. Post-Chat Cleanup Logic

- When both users have left the room:
  - The system runs a function to analyze all messages in that room.
  - If any message contains a **sensitive keyword**, the room and its messages are retained.
  - If no sensitive keywords are found, **all messages are deleted** from the database.
- Sensitive keywords are configurable and currently include:
  - `['hà nội', 'bikini']`

---

## 6. Multi-Tab Support

- When a user opens a new browser tab:
  - The frontend sends the JWT to reconnect.
  - The backend validates the token and restores the current room.
  - Chat should resume seamlessly if the room is still active.

---

## 7. Config File

A configuration file should be defined and include:

```ts
export const ChatConfig = {
  categories: ['polite'],
  sensitiveKeywords: ['hà nội', 'bikini'],
  matchTimeout: 30, // seconds
};
```

This configuration can be imported into any module.

---

## Notes

- No report functionality is needed.
- No use of Supabase SDK; only standard PostgreSQL queries.
- ORM: Drizzle
- Database: Supabase (PostgreSQL)

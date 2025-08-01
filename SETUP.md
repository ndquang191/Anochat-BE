# Setup Instructions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration (Supabase)
DB_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres

# Better Auth Configuration
BETTER_AUTH_SECRET=your-better-auth-secret-key
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (for Better Auth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Configuration (for better-auth integration)
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
```

## Database Setup

1. Get your Supabase database connection string:
   - Go to Supabase Dashboard → Settings → Database
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your actual database password

2. Run the database migrations:

```bash
# Generate migration files
npm run db:generate

# Apply migrations to database
npm run db:migrate
```

## Better Auth Setup

1. Install Better Auth:

```bash
npm install better-auth
```

2. Generate Better Auth secret:

```bash
# Use the button on Better Auth docs or generate with openssl
openssl rand -base64 32
```

3. Set up Google OAuth:
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:3000/auth/callback/google`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev
```

## API Endpoints

### Authentication (Better Auth)

- `GET/POST /auth/*` - Better Auth endpoints
- `GET /auth/me` - Get current user with profile

### Users

- `GET /users/profile` - Get current user profile (authenticated)
- `POST /users` - Create user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user (authenticated)
- `PUT /users/profile/:userId` - Update profile (authenticated)

## Database Schema

### Users Table (Better Auth Compatible)

- `id` - Primary key (UUID)
- `email` - User email from Better Auth
- `name` - User name from Better Auth
- `image` - Avatar URL from Better Auth
- `isActive` - Account status
- `isDeleted` - Soft delete flag
- `createdAt` - Account creation time

### Profiles Table (Anonymous User Info)

- `userId` - Foreign key to users.id
- `isMale` - Gender (for matching)
- `age` - User age (optional)
- `city` - User city (optional)
- `isHidden` - Profile visibility setting
- `updatedAt` - Last update time

## Database Studio

To view and manage your database:

```bash
npm run db:studio
```

## Project Structure

- `src/database/` - Database schema and connection
- `src/users/` - User management services and controllers
- `src/auth/` - Better Auth configuration and guards
- `src/config/` - Application configuration
- `drizzle/` - Generated migration files

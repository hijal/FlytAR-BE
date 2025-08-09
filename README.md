## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the root directory:

   ```env
    # PostgreSQL
    NODE_ENV=development
    PORT=3000

    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=
    DB_USER=
    DB_PASSWORD=

    JWT_SECRET=super-secret-jwt-key
    JWT_EXPIRES_IN=7d

    CLIENT_URLs=http://localhost:3000,http://localhost:3001
   ```

4. **Run database migrations and seeders**

   ```bash
   npm run migrate
   ```

5. **Start the application**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

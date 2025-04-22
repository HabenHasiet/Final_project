<<<<<<< HEAD
=======
# Final_project
>>>>>>> 45f8e40d6c72dac67da482f66609c726428aad33
# Study Material Backend

This is the backend for managing study materials. It provides functionality for uploading files, managing access control, and serving materials to users.

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features
- Upload study materials with metadata.
- Restrict access to unpaid materials.
- Bookmark materials as "paid."
- Serve uploaded files securely.

## Technologies Used
- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **Sequelize**: ORM for database management.
- **MySQL**: Database.
- **Multer**: File upload middleware.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MySQL server running.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/team-username/study-material-backend.git
    cd study-material-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
      ```
      DB_HOST=your-database-host       # The host of your database (e.g., localhost)
      DB_USER=your-database-username   # The username for your database
      DB_PASSWORD=your-database-password # The password for your database
      DB_NAME=your-database-name       # The name of your database
      ```

4. Run database migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the server:
    ```bash
    npm start
    ```

### Usage
1. Start the server:
    ```bash
    npm start
    ```

2. Access the API at `http://localhost:3000`.

3. Use tools like Postman to interact with the endpoints:
    - For example, to upload a file, send a `POST` request to `/api/users/upload` with the required fields and file.

## API Endpoints

### Upload Material
- **URL**: `/api/users/upload`
- **Method**: `POST`
- **Description**: Upload a file and save metadata to the database.

### Get All Materials
- **URL**: `/api/users/materials`
- **Method**: `GET`
- **Description**: Retrieve all materials.

### Get Material by ID
- **URL**: `/api/users/materials/:material_id`
- **Method**: `GET`
- **Description**: Retrieve a specific material by its ID.

### Bookmark Material
- **URL**: `/api/users/materials/:material_id/bookmark`
- **Method**: `POST`
- **Description**: Mark a material as "paid."

## Future Enhancements
- Add user authentication using JWT.
- Integrate a payment gateway for automated "paid" status updates.
- Implement pagination for the `/materials` endpoint.
- Add unit tests using Jest or Mocha.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

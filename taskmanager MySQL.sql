-- Creacion del shcema/database
CREATE SCHEMA taskmanager;

use taskmanager;

-- Cracion de tablas
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status ENUM('0', '1') DEFAULT '1',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);


CREATE TABLE Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    state ENUM('open', 'in_progress', 'done') NOT NULL,
    status ENUM('0', '1') DEFAULT '1',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Insertar usuarios de ejemplo
INSERT INTO Users (username, password, status)
VALUES
    ('user1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5heXVPa2FtaSIsInN1YiI6MTAsImlhdCI6MTcyODM3MTk5MCwiZXhwIjoxNzI4Mzc1NTkwfQ.1TuJ5_u9KeVZnAxWz9sm1ukleeopsImoM192g19wtIc', '1'),
    ('user1', 'MD5 HASH', '1');

-- Insertar tareas de ejemplo
INSERT INTO Tasks (title, description, state, status, userId)
VALUES
    ('Task 1', 'Description for task 1', 'open', '1', 1),
    ('Task 2', 'Description for task 2', 'in_progress', '1', 1),
    ('Task 3', 'Description for task 3', 'done', '1', 1),
    ('Task 4', 'Description for task 4', 'open', '1', 2),
    ('Task 5', 'Description for task 5', 'in_progress', '1', 2);
    
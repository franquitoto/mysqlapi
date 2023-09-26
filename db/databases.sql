-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS gofixdb;

-- Utilizar la base de datos
USE gofixdb;

-- Crear la tabla de roles
CREATE TABLE IF NOT EXISTS roles (
  id INT(10) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id VARCHAR(10) NOT NULL,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(70) NOT NULL,
  email VARCHAR(45) NOT NULL,
  rol_id INT(10) NOT NULL, -- Columna para almacenar el ID del rol
  PRIMARY KEY (id),
  UNIQUE KEY (username), -- Restricción UNIQUE para el campo 'username'
  UNIQUE KEY (email),    -- Restricción UNIQUE para el campo 'email'
  FOREIGN KEY (rol_id) REFERENCES roles(id) -- Clave foránea para la relación entre usuarios y roles
);

-- Crear la tabla productos
CREATE TABLE productos (
    id VARCHAR(35) NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    imagen_nombre VARCHAR(255) NOT NULL,
    imagen_path VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    precio INT NOT NULL,
    descripcion TEXT NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    capacidad VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    destacado ENUM('SI', 'NO') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO productos (id, nombre, categoria, precio, descripcion, modelo, capacidad, marca, color, imagen_url, imagen_nombre, imagen_path)
VALUES
('64754b1632e15b5bfaf24fa3', 'iPhone 12 Pro', 'celulares', 800, 'El iPhone 12 Pro es un teléfono inteligente de gama alta de Apple con características premium. Con una pantalla Super Retina XDR de 6.1 pulgadas, el iPhone 12 Pro ofrece una calidad visual impresionante. Equipado con el potente procesador A14 Bionic, una cámara triple de 12 MP y funciones avanzadas de fotografía, el iPhone 12 Pro es ideal para los entusiastas de la fotografía. Disponible en color gold, combina estilo y rendimiento en un dispositivo de primera clase.', '12 Pro', '128GB', 'Apple', 'Gold', 'http://localhost:3000/img\\1685555406271.jpg', '1685555406271.jpg', 'img\\1685555406271.jpg'),
('64754b1632e15b5bfaf24fa4', 'iPhone 12 Pro Max', 'celulares', 900, 'El iPhone 12 Pro Max es el teléfono inteligente más avanzado de Apple. Con una pantalla Super Retina XDR de 6.7 pulgadas, ofrece una experiencia visual excepcional. Equipado con el potente procesador A14 Bionic, una cámara triple de 12 MP y características de fotografía profesional, el iPhone 12 Pro Max satisface las necesidades de los usuarios más exigentes. Disponible en color negro, combina estilo y rendimiento en un dispositivo premium.', '12 Pro Max', '128GB', 'Apple', 'Negro', 'http://localhost:3000/img\\1685555792728.jpg', '1685555792728.jpg', 'img\\1685555792728.jpg'),
('64754b1632e15b5bfaf24fa5', 'iPhone 13', 'celulares', 1000, 'El iPhone 13 es un teléfono inteligente de última generación de Apple. Con una pantalla Super Retina XDR de 6.1 pulgadas, ofrece colores vibrantes y una calidad visual impresionante. Equipado con el potente procesador A15 Bionic, una cámara dual de 12 MP y funciones mejoradas de fotografía y video, el iPhone 13 lleva el rendimiento a otro nivel. Disponible en color rose, combina estilo y tecnología en un dispositivo avanzado.', '13', '128GB', 'Apple', 'Rose', 'http://localhost:3000/img\\1686459377632.png', '1686459377632.png', 'img\\1686459377632.png'),
('64754b1632e15b5bfaf24fa6', 'iPhone 13 Pro', 'celulares', 1100, 'El iPhone 13 Pro es un teléfono inteligente de alto rendimiento de Apple. Con una pantalla Super Retina XDR de 6.1 pulgadas, ofrece una calidad visual excepcional. Equipado con el potente procesador A15 Bionic, una cámara triple de 12 MP y características profesionales de fotografía y video, el iPhone 13 Pro es perfecto para los usuarios que buscan lo mejor en rendimiento y funcionalidad. Disponible en color gold, combina estilo y tecnología en un dispositivo premium.', '13 Pro', '128GB', 'Apple', 'Gold', 'http://localhost:3000/img\\1687394451558.png', '1687394451558.png', 'img\\1687394451558.png'),
('64754b1632e15b5bfaf24fa7', 'iPhone 13 Pro Max', 'celulares', 1150, 'El iPhone 13 Pro Max es el teléfono inteligente más avanzado de Apple. Con una pantalla Super Retina XDR de 6.7 pulgadas, ofrece una experiencia visual inmersiva. Equipado con el potente procesador A15 Bionic, una cámara triple de 12 MP y características profesionales de fotografía y video, el iPhone 13 Pro Max redefine el rendimiento en un dispositivo de alta gama. Disponible en color negro, combina estilo y tecnología en un dispositivo premium.', '13 Pro Max', '128GB', 'Apple', 'Negro', 'http://localhost:3000/img\\1685555859768.jpg', '1685555859768.jpg', 'img\\1685555859768.jpg'),
('64754b1632e15b5bfaf24fa0', 'iPhone 11', 'celulares', 600, 'El iPhone 11 es un teléfono inteligente de Apple con un diseño moderno y un potente rendimiento. Con una pantalla Liquid Retina de 6.1 pulgadas, cámara dual de 12 MP y el procesador A13 Bionic, ofrece una experiencia de uso fluida y captura fotos y videos impresionantes. Disponible en color blanco, el iPhone 11 combina estilo y funcionalidad en un dispositivo confiable.', '11', '128GB', 'Apple', 'Blanco', 'http://localhost:3000/img\\1685555881022.jpg', '1685555881022.jpg', 'img\\1685555881022.jpg'),
('64764989183e6392f10e1cab', 'iPhone 14 Pro', 'celulares', 1200, 'El iPhone 14 Pro es un teléfono inteligente de gama alta de Apple con características premium. Con una pantalla Super Retina XDR de 6.1 pulgadas, el iPhone 12 Pro ofrece una calidad visual impresionante. Equipado con el potente procesador A14 Bionic, una cámara triple de 12 MP y funciones avanzadas de fotografía, el iPhone 12 Pro es ideal para los entusiastas de la fotografía. Disponible en color gold, combina estilo y rendimiento en un dispositivo de primera clase.', '13 Pro', '356GB', 'Apple', 'Gold', 'http://localhost:3000/img\\1687393604959.png', '1687393604959.png', 'img\\1687393604959.png'),
('6494d9e30b0bc18fd972342c', 'iPhone 8 Plus', 'celulares', 500, 'El iPhone 8 Plus es un teléfono inteligente de alta gama lanzado por Apple. Cuenta con una pantalla Retina de 5.5 pulgadas, una cámara dual de 12 MP para fotos con efecto de profundidad y zoom óptico, y un potente chip A11 Bionic para un rendimiento rápido. Además, tiene carga inalámbrica, resistencia al agua y al polvo, y utiliza el sistema operativo iOS. Un dispositivo elegante y poderoso para satisfacer todas tus necesidades.', '8 plus', '128', 'Apple', 'gold', 'http://localhost:3000/img\\1687476713746.jpg', '1687476713746.jpg', 'img\\1687476713746.jpg');



-- Insertar el rol "admin"
INSERT INTO roles (nombre) VALUES ('admin');

-- Insertar el rol "user"
INSERT INTO roles (nombre) VALUES ('user');

-- Insertar el rol "superadmin"
INSERT INTO roles (nombre) VALUES ('superadmin');



-- Ver la tabla usuarios
SELECT * FROM usuarios;

-- Ver la tabla roles
SELECT * FROM roles;



-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-02-2023 a las 05:19:04
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `becas_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `idCarrera` int(11) NOT NULL,
  `nombreCarreca` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`idCarrera`, `nombreCarreca`) VALUES
(1, 'Ingeniería de Sistemas'),
(2, 'Ingeniería Civil'),
(3, 'Licenciatura en turismo'),
(4, 'Licenciatura en Administración y gestión municipal'),
(5, 'TSU. Enfermeria'),
(6, 'TSU. Análisis y diseño de sistemas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `cedula` int(11) NOT NULL,
  `tipoCedula` varchar(2) NOT NULL,
  `nombreEstudiante` varchar(50) NOT NULL,
  `apellidoEstudiante` varchar(50) NOT NULL,
  `idCarrera` int(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` text NOT NULL,
  `becado` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`cedula`, `tipoCedula`, `nombreEstudiante`, `apellidoEstudiante`, `idCarrera`, `telefono`, `direccion`, `becado`) VALUES
(22650599, 'V', 'LEONARDO', 'RIVERA', 5, '4123579763', '6301\nS/N', 'No'),
(28316440, 'V', 'LEONARDO', 'RIVERA', 1, '4123579763', '6301\nS/N', 'No'),
(28316441, 'V', 'LEONARDO', 'RIVERA', 1, '4123579763', '6301\nS/N', 'No'),
(28316442, 'V', 'LEONARDO', 'RIVERA', 6, '4123579763', '6301\nS/N', 'Si'),
(28316445, 'V', 'LEONARDO', 'RIVERA', 1, '4123579763', '6301\nS/N', 'Si'),
(28316452, 'V', 'LEONARDO', 'RIVERA', 6, '4123579763', '6301\nS/N', 'Si'),
(28316453, 'V', 'LEONARDO', 'RIVERA', 3, '4123579763', '6301\nS/N', 'Si'),
(28316454, 'V', 'LEONARDO', 'RIVERA', 4, '4123579763', '6301\nS/N', 'Si'),
(28316455, 'V', 'LEONARDO', 'RIVERA', 5, '4123579763', '6301\nS/N', 'Si'),
(28316456, 'V', 'LEONARDO', 'RIVERA', 6, '4123579763', '6301\nS/N', 'Si'),
(28316652, 'V', 'LEONARDO', 'RIVERA', 4, '4123579763', '6301\nS/N', 'Si'),
(28316777, 'V', 'LEONARDO', 'RIVERA', 3, '4123579763', '6301\nS/N', 'No'),
(28316778, 'V', 'LEONARDO', 'RIVERA', 3, '4123579763', '6301\nS/N', 'No'),
(28317441, 'V', 'LEONARDO', 'RIVERA', 2, '4123579763', '6301\nS/N', 'Si'),
(28318441, 'V', 'LEONARDO', 'RIVERA', 2, '4123579763', '6301\nS/N', 'No');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersadmin`
--

CREATE TABLE `usersadmin` (
  `USER` varchar(30) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `APELLIDO` varchar(50) NOT NULL,
  `PASS` varchar(15) NOT NULL,
  `ADMIN` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usersadmin`
--

INSERT INTO `usersadmin` (`USER`, `NOMBRE`, `APELLIDO`, `PASS`, `ADMIN`) VALUES
('Admin1', 'Admin', 'admin', '123456', 'Si'),
('Leonardo1004', 'Leonardo', 'Rivera', '123456', 'Si'),
('noadmin', 'noadmin', 'noadmin', '123456', 'No'),
('Victoria1', 'Victoria', 'Perez', '123456', 'No');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`idCarrera`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`cedula`),
  ADD KEY `idCarrera` (`idCarrera`);

--
-- Indices de la tabla `usersadmin`
--
ALTER TABLE `usersadmin`
  ADD PRIMARY KEY (`USER`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`idCarrera`) REFERENCES `carreras` (`idCarrera`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

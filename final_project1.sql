-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 30, 2024 at 09:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_project1`
--

-- --------------------------------------------------------

--
-- Table structure for table `Amigos`
--

CREATE TABLE `Amigos` (
  `user_id` int(8) UNSIGNED NOT NULL,
  `amigo_id` int(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Amigos`
--

INSERT INTO `Amigos` (`user_id`, `amigo_id`) VALUES
(1, 2),
(1, 41),
(2, 1),
(2, 41),
(2, 42),
(2, 51),
(41, 1),
(41, 2),
(42, 2),
(51, 2);

-- --------------------------------------------------------

--
-- Table structure for table `CostDistributions`
--

CREATE TABLE `CostDistributions` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_id` int(8) UNSIGNED NOT NULL,
  `amount` decimal(7,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `paid_amount` decimal(7,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CostDistributions`
--

INSERT INTO `CostDistributions` (`id`, `event_id`, `user_id`, `amount`, `created_at`, `updated_at`, `paid_amount`) VALUES
(411, 220, 2, 25.00, '2024-09-30 14:47:23', '2024-09-30 14:47:23', 0.00),
(412, 220, 41, 25.00, '2024-09-30 14:47:23', '2024-09-30 14:47:23', 0.00),
(413, 220, 42, 25.00, '2024-09-30 14:47:23', '2024-09-30 14:47:23', 0.00),
(414, 220, 51, 25.00, '2024-09-30 14:47:23', '2024-09-30 14:47:23', 0.00),
(415, 221, 2, 50.00, '2024-09-30 14:49:37', '2024-09-30 14:49:37', 0.00),
(416, 221, 41, 50.00, '2024-09-30 14:49:37', '2024-09-30 14:49:37', 0.00),
(417, 221, 42, 50.00, '2024-09-30 14:49:37', '2024-09-30 14:49:37', 0.00),
(418, 222, 2, 70.00, '2024-09-30 14:51:47', '2024-09-30 14:51:47', 0.00),
(419, 222, 41, 70.00, '2024-09-30 14:51:47', '2024-09-30 14:51:47', 0.00),
(420, 222, 42, 70.00, '2024-09-30 14:51:47', '2024-09-30 14:51:47', 0.00),
(430, 223, 2, 25.00, '2024-09-30 14:55:58', '2024-09-30 14:55:58', 0.00),
(431, 223, 41, 25.00, '2024-09-30 14:55:58', '2024-09-30 14:55:58', 0.00),
(432, 223, 42, 25.00, '2024-09-30 14:55:58', '2024-09-30 14:55:58', 0.00),
(433, 224, 2, 133.33, '2024-09-30 14:58:56', '2024-09-30 14:58:56', 0.00),
(434, 224, 41, 133.33, '2024-09-30 14:58:56', '2024-09-30 14:58:56', 0.00),
(435, 224, 42, 133.33, '2024-09-30 14:58:56', '2024-09-30 14:58:56', 0.00),
(442, 225, 2, 400.00, '2024-09-30 15:04:34', '2024-09-30 15:04:34', 0.00),
(443, 225, 41, 400.00, '2024-09-30 15:04:34', '2024-09-30 15:04:34', 0.00),
(444, 225, 42, 400.00, '2024-09-30 15:04:34', '2024-09-30 15:04:34', 0.00),
(445, 226, 2, 400.00, '2024-09-30 15:12:30', '2024-09-30 15:12:30', 0.00),
(446, 226, 41, 400.00, '2024-09-30 15:12:30', '2024-09-30 15:12:30', 0.00),
(447, 226, 42, 400.00, '2024-09-30 15:12:30', '2024-09-30 15:12:30', 0.00),
(448, 226, 51, 400.00, '2024-09-30 15:12:30', '2024-09-30 15:12:30', 0.00),
(449, 227, 2, 4.50, '2024-09-30 15:20:20', '2024-09-30 15:20:20', 0.00),
(450, 227, 41, 4.50, '2024-09-30 15:20:20', '2024-09-30 15:20:20', 0.00),
(451, 227, 42, 4.50, '2024-09-30 15:20:20', '2024-09-30 15:20:20', 0.00),
(452, 227, 51, 4.50, '2024-09-30 15:20:20', '2024-09-30 15:20:20', 0.00),
(453, 228, 41, 40.00, '2024-09-30 15:29:48', '2024-09-30 15:29:48', 0.00),
(454, 228, 42, 40.00, '2024-09-30 15:29:48', '2024-09-30 15:29:48', 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `id_event` int(11) NOT NULL,
  `viaje_id` int(6) NOT NULL,
  `titulo` varchar(40) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `latitud` decimal(9,6) DEFAULT NULL,
  `longitud` decimal(9,6) DEFAULT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `costo` decimal(7,2) DEFAULT NULL,
  `comentarios` varchar(100) DEFAULT NULL,
  `user_id_create` int(8) UNSIGNED NOT NULL,
  `user_id_paid` int(8) UNSIGNED DEFAULT NULL,
  `categoria` enum('Hospedaje','Transporte','Turismo','Comida') NOT NULL DEFAULT 'Turismo',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`id_event`, `viaje_id`, `titulo`, `ubicacion`, `latitud`, `longitud`, `fecha_inicio`, `fecha_fin`, `costo`, `comentarios`, `user_id_create`, `user_id_paid`, `categoria`, `created_at`, `updated_at`) VALUES
(220, 79, 'sagrada familia', 'sagrada familia barcelona', NULL, NULL, '2024-10-08 13:45:00', '2024-10-08 16:45:00', 100.00, 'llegar 15min antes', 2, 2, 'Turismo', '2024-09-30 14:47:23', '2024-09-30 14:47:23'),
(221, 78, 'Cusco', 'machupicchu cusco peru', NULL, NULL, '2024-10-15 08:00:00', '2024-10-15 14:48:00', 150.00, 'el bus se toma en aguas calientes', 2, 2, 'Turismo', '2024-09-30 14:49:37', '2024-09-30 14:49:37'),
(222, 78, 'Tour gastronomico', 'lima peru', NULL, NULL, '2024-10-14 11:00:00', '2024-10-14 14:00:00', 210.00, 'nos recogen del hotel', 2, 2, 'Comida', '2024-09-30 14:51:47', '2024-09-30 14:51:47'),
(223, 78, 'Montaña de los 7 colores', 'urubamba cusco peru', NULL, NULL, '2024-10-16 05:30:00', '2024-10-16 16:00:00', 75.00, 'llevar comida y agua para la caminata', 2, 2, 'Turismo', '2024-09-30 14:53:59', '2024-09-30 14:55:58'),
(224, 78, 'Hotel Cusco', 'andean wings hotel ', NULL, NULL, '2024-10-15 08:00:00', '2024-10-19 10:00:00', 400.00, 'check in 12pm', 2, 2, 'Hospedaje', '2024-09-30 14:58:56', '2024-09-30 14:58:56'),
(225, 78, 'Hotel Lima', ' Av. la Paz 1099 Lima peru', NULL, NULL, '2024-10-19 12:00:00', '2024-10-22 08:00:00', 1200.00, 'incluye recogida del aeropuerto', 2, 2, 'Hospedaje', '2024-09-30 15:01:38', '2024-09-30 15:03:25'),
(226, 79, 'Hotel Barcelona', 'W Barcelona', NULL, NULL, '2024-10-07 13:00:00', '2024-10-13 08:00:00', 1600.00, 'check in desde las 3pm', 2, 2, 'Hospedaje', '2024-09-30 15:12:30', '2024-09-30 15:12:30'),
(227, 79, 'Parc Guell', 'park güell barcelona', NULL, NULL, '2024-10-09 14:00:00', '2024-10-09 18:00:00', 18.00, 'vamos despues de almuerzo', 2, 41, 'Turismo', '2024-09-30 15:20:20', '2024-09-30 15:20:20'),
(228, 79, 'Tren a madrid', 'sants barcelona', NULL, NULL, '2024-10-10 13:30:00', '2024-10-10 16:45:00', 80.00, 'Via 2', 2, 42, 'Transporte', '2024-09-30 15:29:48', '2024-09-30 15:29:48');

-- --------------------------------------------------------

--
-- Table structure for table `RecoveryTokens`
--

CREATE TABLE `RecoveryTokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` int(8) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id_user` int(8) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `photo` varchar(30) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `roles` varchar(30) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id_user`, `email`, `password`, `name`, `surname`, `photo`, `created_at`, `updated_at`, `roles`) VALUES
(1, 'ismael.academy@gmail.com', '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', 'Ismael', 'Kale', 'file-1724936832465.webp', '2024-07-25 10:25:19', '2024-08-29 13:07:12', 'user'),
(2, 'laura@hotmail.com', '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', 'Laura', 'Martinez', 'file-1724936636540.webp', '2024-07-25 10:25:19', '2024-08-29 13:03:56', 'user'),
(41, 'claudia@claudia.com', '$2b$10$F3s0DM.0BiTK36hGXdpHl.dfe.tnaCQzOeieGF9bQTe9YHUmnU5im', 'claudia', 'amprimo', 'file-1725005892238.webp', '2024-08-30 08:18:12', '2024-08-30 08:18:12', 'user'),
(42, 'david@david.com', '$2b$10$VMFubCjVUHzr7DTCjNFD0eUf.J0g49cba.EuB4qKFBXdPI09Lbo3.', 'david', 'serra', 'file-1725005926707.jpeg', '2024-08-30 08:18:46', '2024-08-30 08:18:46', 'user'),
(51, 'pao@ccc.com', '$2b$10$zDvI2KEI4J71QzNKSzHFx.MYK1jcj/vi77qZ5EiEo3JndPMy/FI0e', 'paolo', 'amprimo', 'file-1725102009172.webp', '2024-08-31 11:00:09', '2024-08-31 11:00:09', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `UsersViajes`
--

CREATE TABLE `UsersViajes` (
  `user_id` int(8) UNSIGNED NOT NULL,
  `viaje_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `UsersViajes`
--

INSERT INTO `UsersViajes` (`user_id`, `viaje_id`) VALUES
(2, 78),
(2, 79),
(41, 78),
(41, 79),
(42, 78),
(42, 79),
(51, 79);

-- --------------------------------------------------------

--
-- Table structure for table `Viajes`
--

CREATE TABLE `Viajes` (
  `id_viaje` int(6) NOT NULL,
  `titulo` varchar(40) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Viajes`
--

INSERT INTO `Viajes` (`id_viaje`, `titulo`, `ubicacion`, `fecha_inicio`, `fecha_fin`, `created_at`, `updated_at`) VALUES
(78, 'Peru', 'lima peru', '2024-10-14 00:00:00', '2024-10-20 00:00:00', '2024-09-25 08:46:59', '2024-09-30 14:48:20'),
(79, 'Barcelona', 'barcelona', '2024-10-07 00:00:00', '2024-10-13 00:00:00', '2024-09-26 15:50:19', '2024-09-30 14:45:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Amigos`
--
ALTER TABLE `Amigos`
  ADD PRIMARY KEY (`user_id`,`amigo_id`),
  ADD UNIQUE KEY `Amigos_user_id_amigo_id_unique` (`user_id`,`amigo_id`),
  ADD KEY `amigo_id` (`amigo_id`);

--
-- Indexes for table `CostDistributions`
--
ALTER TABLE `CostDistributions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `viaje_id` (`viaje_id`),
  ADD KEY `user_id_create` (`user_id_create`),
  ADD KEY `user_id_paid` (`user_id_paid`);

--
-- Indexes for table `RecoveryTokens`
--
ALTER TABLE `RecoveryTokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD UNIQUE KEY `recovery_tokens_token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `UsersViajes`
--
ALTER TABLE `UsersViajes`
  ADD PRIMARY KEY (`user_id`,`viaje_id`),
  ADD UNIQUE KEY `UsersViajes_viaje_id_user_id_unique` (`user_id`,`viaje_id`),
  ADD KEY `viaje_id` (`viaje_id`);

--
-- Indexes for table `Viajes`
--
ALTER TABLE `Viajes`
  ADD PRIMARY KEY (`id_viaje`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CostDistributions`
--
ALTER TABLE `CostDistributions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=455;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT for table `RecoveryTokens`
--
ALTER TABLE `RecoveryTokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id_user` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `Viajes`
--
ALTER TABLE `Viajes`
  MODIFY `id_viaje` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Amigos`
--
ALTER TABLE `Amigos`
  ADD CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`amigo_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `CostDistributions`
--
ALTER TABLE `CostDistributions`
  ADD CONSTRAINT `costdistributions_ibfk_673` FOREIGN KEY (`event_id`) REFERENCES `Events` (`id_event`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `costdistributions_ibfk_674` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Events`
--
ALTER TABLE `Events`
  ADD CONSTRAINT `events_ibfk_2461` FOREIGN KEY (`viaje_id`) REFERENCES `Viajes` (`id_viaje`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2462` FOREIGN KEY (`user_id_create`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2463` FOREIGN KEY (`user_id_paid`) REFERENCES `Users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `RecoveryTokens`
--
ALTER TABLE `RecoveryTokens`
  ADD CONSTRAINT `recoverytokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UsersViajes`
--
ALTER TABLE `UsersViajes`
  ADD CONSTRAINT `usersviajes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usersviajes_ibfk_2` FOREIGN KEY (`viaje_id`) REFERENCES `Viajes` (`id_viaje`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

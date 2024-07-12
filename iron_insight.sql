-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 12 juil. 2024 à 17:18
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `iron_insight`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id_program` int NOT NULL,
  `id_user` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  KEY `id_program` (`id_program`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id_program`, `id_user`, `comment`, `created_at`) VALUES
(2, 5, 'luca', '2024-07-09 19:33:08'),
(2, 5, 'Toto', '2024-07-10 21:17:35'),
(1, 6, 'Trop bien !', '2024-07-11 23:02:13'),
(1, 6, 'Test', '2024-07-11 23:02:37'),
(1, 6, 'test', '2024-07-11 23:08:02'),
(1, 6, 'test test test test test test test test test test test test test test test test test test test test test ', '2024-07-11 23:14:28'),
(1, 6, 'test test test test test test test test ', '2024-07-11 23:14:40'),
(1, 6, 'toto', '2024-07-11 23:16:21');

-- --------------------------------------------------------

--
-- Structure de la table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
CREATE TABLE IF NOT EXISTS `exercise` (
  `code_exercise` int NOT NULL AUTO_INCREMENT,
  `wording` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `duration` time DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  PRIMARY KEY (`code_exercise`),
  KEY `category` (`category`),
  KEY `difficulty` (`difficulty`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `exercise`
--

INSERT INTO `exercise` (`code_exercise`, `wording`, `duration`, `image`, `category`, `difficulty`) VALUES
(1, 'Presse à cuisse', '17:06:00', 'file-1720188497434-492989119.webp', 4, 2),
(2, 'Développé couché', '04:00:00', 'file-1720188771345-469194598.webp', 1, 2),
(11, 'Extension Quadricpes', '00:00:00', 'file-1720635651854-999116542.gif', 4, 3),
(12, 'Curl Biceps', '00:05:00', 'file-1720733023010-219014887.webp', 3, 1),
(13, 'Curl Haltère Incliné', '00:10:00', 'file-1720733055535-95861657.webp', 3, 3),
(14, 'Oiseau Haltère', '00:15:00', 'file-1720733090467-835897798.gif', 7, 2),
(15, 'Triceps Machine', '00:30:00', 'file-1720733134785-576367303.gif', 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `exercise_category`
--

DROP TABLE IF EXISTS `exercise_category`;
CREATE TABLE IF NOT EXISTS `exercise_category` (
  `code` int NOT NULL AUTO_INCREMENT,
  `wording` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `exercise_category`
--

INSERT INTO `exercise_category` (`code`, `wording`) VALUES
(1, 'Pectoraux'),
(2, 'Triceps'),
(3, 'Biceps'),
(4, 'Quadriceps'),
(5, 'Adducteurs'),
(6, 'Abducteurs'),
(7, 'Épaules'),
(8, 'Grand dorsal');

-- --------------------------------------------------------

--
-- Structure de la table `exercise_difficulty`
--

DROP TABLE IF EXISTS `exercise_difficulty`;
CREATE TABLE IF NOT EXISTS `exercise_difficulty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wording` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `exercise_difficulty`
--

INSERT INTO `exercise_difficulty` (`id`, `wording`) VALUES
(1, 'Débutant'),
(2, 'Habitué'),
(3, 'Avancé'),
(4, 'Expert');

-- --------------------------------------------------------

--
-- Structure de la table `friend`
--

DROP TABLE IF EXISTS `friend`;
CREATE TABLE IF NOT EXISTS `friend` (
  `id_user_1` int NOT NULL,
  `id_user_2` int NOT NULL,
  `added_at` datetime NOT NULL,
  PRIMARY KEY (`id_user_1`,`id_user_2`),
  KEY `id_user_1` (`id_user_1`),
  KEY `id_user_2` (`id_user_2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `friend`
--

INSERT INTO `friend` (`id_user_1`, `id_user_2`, `added_at`) VALUES
(1, 2, '2024-05-15 09:42:35');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id_program` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_program`,`id_user`),
  KEY `id_program` (`id_program`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id_program`, `id_user`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `training_done`
--

DROP TABLE IF EXISTS `training_done`;
CREATE TABLE IF NOT EXISTS `training_done` (
  `id_user` int NOT NULL,
  `id_program` int NOT NULL,
  `time` time NOT NULL,
  `done_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`,`id_program`),
  KEY `id_user` (`id_user`),
  KEY `id_program` (`id_program`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `training_done`
--

INSERT INTO `training_done` (`id_user`, `id_program`, `time`, `done_at`) VALUES
(2, 1, '01:30:44', '2024-07-17 11:30:44');

-- --------------------------------------------------------

--
-- Structure de la table `training_program`
--

DROP TABLE IF EXISTS `training_program`;
CREATE TABLE IF NOT EXISTS `training_program` (
  `id_program` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_program`),
  KEY `id_user` (`id_user`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `training_program`
--

INSERT INTO `training_program` (`id_program`, `name`, `description`, `created_at`, `id_user`) VALUES
(1, 'Programme de fou', 'Programme pour la zone pectoral', '2024-05-15 11:39:14', 2),
(2, 'Programme repos', 'Repos pour les faibles', '2024-05-13 08:29:33', 2),
(25, 'Programme Triceps & Biceps', 'Programme qui te déchire le triceps pas bon pour les débutants', '2024-07-11 23:31:41', 6);

-- --------------------------------------------------------

--
-- Structure de la table `training_program_exercises`
--

DROP TABLE IF EXISTS `training_program_exercises`;
CREATE TABLE IF NOT EXISTS `training_program_exercises` (
  `code_exercise` int NOT NULL,
  `id_program` int NOT NULL,
  PRIMARY KEY (`code_exercise`,`id_program`),
  KEY `code_exercise` (`code_exercise`),
  KEY `id_program` (`id_program`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `training_program_exercises`
--

INSERT INTO `training_program_exercises` (`code_exercise`, `id_program`) VALUES
(1, 1),
(1, 2),
(2, 1),
(12, 25),
(13, 25),
(14, 25),
(15, 25);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `weight` decimal(5,1) NOT NULL,
  `height` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `weight`, `height`, `created_at`, `updated_at`) VALUES
(1, 'Monique52', 'momo@gmail.com', 'password', 65.0, 160, '2024-06-11 08:10:52', '2024-06-25 08:10:52'),
(2, 'MichelCostaud', 'michmich@hotmail.fr', 'password', 87.0, 190, '2024-01-01 08:11:22', '2024-03-08 08:11:22'),
(3, 'jean', 'jean@michel', '$2b$10$dwp3DB9BSnBCQRkOnoRnB.QArPl2bkIltcNvpyu/fLD1awWNllkAy', -1.0, -1, '2024-07-01 10:53:44', '2024-07-01 10:53:44'),
(4, 'pierre', 'pierre@gmail.com', '$2b$10$6vlIQtqLEu2iXQYlc8EWw.Y4YirVCkLG3GowCSsk5yUoABhv25b6.', -1.0, -1, '2024-07-05 14:48:33', '2024-07-05 14:48:33'),
(5, 'luca', 'luca@michel', '$2b$10$vS990XY4pC4J/WKQkRK6ce76HWxaOo41NkAmod/5YdXpdFtvS3GuG', -1.0, -1, '2024-07-05 16:03:07', '2024-07-05 16:03:07'),
(6, 'toto', 'toto@gmail.com', '$2b$10$tYewaobq9QRetSFTDfTQDum5HIf50CfdDTIuU6tGX3.fDUahSfuQS', -1.0, -1, '2024-07-11 22:07:46', '2024-07-11 22:07:46');

-- --------------------------------------------------------

--
-- Structure de la table `user_record`
--

DROP TABLE IF EXISTS `user_record`;
CREATE TABLE IF NOT EXISTS `user_record` (
  `id_user` int NOT NULL,
  `id_exercise` int NOT NULL,
  `best_weight` int NOT NULL,
  `realised_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`,`id_exercise`),
  KEY `id_user` (`id_user`),
  KEY `id_exercise` (`id_exercise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_record`
--

INSERT INTO `user_record` (`id_user`, `id_exercise`, `best_weight`, `realised_at`) VALUES
(2, 1, 120, '2024-07-01 09:05:57'),
(2, 3, 50, '2024-04-03 15:06:07');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_program`) REFERENCES `training_program` (`id_program`);

--
-- Contraintes pour la table `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `exercise_ibfk_1` FOREIGN KEY (`category`) REFERENCES `exercise_category` (`code`),
  ADD CONSTRAINT `exercise_ibfk_2` FOREIGN KEY (`difficulty`) REFERENCES `exercise_difficulty` (`id`);

--
-- Contraintes pour la table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`id_user_1`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`id_user_2`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_program`) REFERENCES `training_program` (`id_program`);

--
-- Contraintes pour la table `training_done`
--
ALTER TABLE `training_done`
  ADD CONSTRAINT `training_done_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `training_done_ibfk_2` FOREIGN KEY (`id_program`) REFERENCES `training_program` (`id_program`);

--
-- Contraintes pour la table `training_program`
--
ALTER TABLE `training_program`
  ADD CONSTRAINT `training_program_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `training_program_exercises`
--
ALTER TABLE `training_program_exercises`
  ADD CONSTRAINT `training_program_exercises_ibfk_1` FOREIGN KEY (`code_exercise`) REFERENCES `exercise` (`code_exercise`),
  ADD CONSTRAINT `training_program_exercises_ibfk_2` FOREIGN KEY (`id_program`) REFERENCES `training_program` (`id_program`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

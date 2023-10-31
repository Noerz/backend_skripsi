-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2023 at 02:57 AM
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
-- Database: `skripsi`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT NULL,
  `division_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `gender`, `status`, `division_id`) VALUES
(18, 'Fareza Muhammad', 'Fareza_Muhammad@gmail.com', 'Male', 'Active', 3),
(20, 'Ja’far Abdullah', 'Ja’far_Abdullah@gmail.com', 'Male', 'Active', 4),
(21, 'Meri Antika', 'Meri_Antika@gmail.com', 'Female', 'Active', 5),
(22, 'Mupidah ', 'Mupidah @gmail.com', 'Female', 'Active', 6),
(23, 'Nur Anisah', 'Nur_Anisah@gmail.com', 'Female', 'Active', 7),
(24, 'Rifdah Indriani', 'Rifdah_Indriani@gmail.com', 'Female', 'Active', 8);

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `auth_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`auth_id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(19, 'Fareza Muhammad', 'Fareza_Muhammad@gmail.com', '$2b$10$ttMItlvemA1zuQuGkNBRZ.j.Y5gRevisHpgmpubdUV77NgBrB44/y', 'admin', '2023-10-01 10:35:47', '2023-10-01 10:35:47'),
(22, 'Ja’far Abdullah', 'Ja’far_Abdullah@gmail.com', '$2b$10$3/dVi316mv397ZddXpIM5uQxELDJvNgUrQ0mF7dG/AnGfMTRn.0Tq', 'admin', '2023-10-01 10:37:02', '2023-10-01 10:37:02'),
(23, 'Meri Antika', 'Meri_Antika@gmail.com', '$2b$10$0j9BGplqD3.dtgoIzfPWEeYeIfbu.FapkvczVm4DRP7X0PMspCawW', 'admin', '2023-10-01 10:37:36', '2023-10-01 10:37:36'),
(24, 'Mupidah ', 'Mupidah @gmail.com', '$2b$10$3t5z2f5d0Dh1I.rsFVQsZ.9iRghBZ.iObFaxcezQFsEkLEVJA3jNS', 'admin', '2023-10-01 10:38:05', '2023-10-01 10:38:05'),
(25, 'Nur Anisah', 'Nur_Anisah@gmail.com', '$2b$10$sGbGZGm/wnNIef4yYglCweRAF87ObGe3R1/SQKcoZJt812G5bU6li', 'admin', '2023-10-01 10:38:29', '2023-10-01 10:38:29'),
(26, 'Rifdah Indriani', 'Rifdah_Indriani@gmail.com', '$2b$10$gbYgtroi6OxMtS1FK0Vb0u50VZN6JHdNBxf.zqfKVEy7Q4GttjUC.', 'admin', '2023-10-01 10:38:46', '2023-10-01 10:38:46');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `division`
--

INSERT INTO `division` (`id`, `name`, `description`) VALUES
(3, 'Ketua Umum', 'BPH'),
(4, 'Wakil Ketua Umum', 'BPH'),
(5, 'Sekertaris Umum 1', 'BPH'),
(6, 'Sekertaris Umum 2', 'BPH'),
(7, 'Bendahara Umum 1', 'BPH'),
(8, 'Bendahara Umum 2', 'BPH'),
(9, 'Humas dan Advokasi', 'Pengurus yang bertugas sebagai jembatan antara mahasiswa dengan prodi'),
(10, 'Div. Kewirausahaan', 'Pengurus yang bertugas sebagai pembuat usaha di dalam organisasi'),
(11, 'Kominfo', 'Pengurus yang bertugas sebagai penyalur informasi kepada luar organisasi'),
(12, 'Kerohanian', 'Pengurus yang bertugas sebagai melaksanakan kegiatan keagamaan'),
(13, 'Penelitian dan Pengembangan', 'Pengurus yang bertugas melakukan pengembangan serta penelitian di organisasi'),
(14, 'Keanggotaan', 'Pengurus yang bertugas mengelola anggota aktif organisasi'),
(15, 'Minat dan Bakat', 'Pengurus yang bertugas memanajemen minat serta bakat mahasiswa');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `due_on` datetime DEFAULT NULL,
  `status` enum('Pending','Completed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `division_id` (`division_id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`auth_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`division_id`) REFERENCES `division` (`id`),
  ADD CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`email`) REFERENCES `auth` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admin` (`id`);

--
-- Constraints for table `todo`
--
ALTER TABLE `todo`
  ADD CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admin` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`email`) REFERENCES `auth` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

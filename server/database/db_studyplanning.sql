-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 01 Haz 2025, 21:38:40
-- Sunucu sürümü: 10.4.27-MariaDB
-- PHP Sürümü: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `db_studyplanning`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `etude`
--

CREATE TABLE `etude` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `class_number` tinyint(1) NOT NULL,
  `private_status` tinyint(1) NOT NULL DEFAULT 0,
  `capacity` tinyint(11) DEFAULT NULL,
  `request` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1: Yeni bir talep geldi.\r\n0: Talep işlendi.',
  `request_from` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `etude`
--

INSERT INTO `etude` (`id`, `teacher_id`, `date_start`, `date_end`, `class_number`, `private_status`, `capacity`, `request`, `request_from`) VALUES
(118, 17, '2025-05-18 15:00:00', '2025-05-18 16:00:00', 1, 0, 3, 0, 1),
(119, 17, '2025-05-21 12:00:00', '2025-05-21 13:00:00', 1, 0, 3, 0, 13),
(120, 17, '2025-05-17 12:30:00', '2025-05-17 13:30:00', 1, 0, 3, 0, NULL),
(121, 17, '2025-05-24 18:00:00', '2025-05-24 19:00:00', 1, 0, 5, 0, NULL),
(122, 17, '2025-06-03 13:15:00', '2025-06-03 14:15:00', 1, 1, 1, 0, 12),
(123, 17, '2025-05-16 12:00:00', '2025-05-16 13:00:00', 1, 0, 3, 0, NULL),
(124, 17, '2025-05-27 13:30:00', '2025-05-27 14:30:00', 1, 0, 3, 0, NULL),
(125, 17, '2025-05-27 11:00:00', '2025-05-27 12:00:00', 1, 0, 5, 0, NULL),
(126, 16, '2025-05-26 15:15:00', '2025-05-26 16:15:00', 1, 0, 3, 0, NULL),
(127, 22, '2025-05-28 13:30:00', '2025-05-28 14:30:00', 1, 0, 3, 0, NULL),
(128, 22, '2025-05-27 10:30:00', '2025-05-27 11:30:00', 1, 0, 3, 0, NULL),
(129, 16, '2025-05-27 17:15:00', '2025-05-27 18:15:00', 1, 1, 1, 0, 1),
(130, 24, NULL, NULL, 1, 0, NULL, 1, 1),
(131, 22, NULL, NULL, 1, 0, NULL, 1, 1),
(132, 21, NULL, NULL, 1, 0, NULL, 1, 1),
(133, 16, NULL, NULL, 1, 0, NULL, 1, 1),
(134, 25, NULL, NULL, 1, 0, NULL, 1, 1),
(135, 20, NULL, NULL, 1, 0, NULL, 1, 1),
(136, 17, '2025-06-01 12:15:00', '2025-06-01 13:15:00', 1, 0, 3, 0, NULL),
(137, 20, '2025-06-08 12:30:00', '2025-06-08 13:30:00', 1, 1, 1, 1, 1),
(138, 20, NULL, NULL, 1, 1, 1, 1, 1),
(139, 22, '2025-06-05 17:15:00', '2025-06-05 18:15:00', 1, 0, 3, 0, 1),
(140, 17, '2025-06-11 13:15:00', '2025-06-11 14:15:00', 1, 0, 3, 0, NULL),
(143, 17, '2025-06-05 12:00:00', '2025-06-05 13:00:00', 3, 0, 3, 0, NULL),
(144, 17, '2025-06-13 15:15:00', '2025-06-13 16:15:00', 2, 1, 1, 0, NULL),
(145, 17, '2025-06-13 15:15:00', '2025-06-13 16:15:00', 1, 1, 1, 0, NULL),
(146, 17, NULL, NULL, 1, 0, NULL, 1, 1),
(147, 17, '2025-06-07 12:12:00', '2025-06-07 13:13:00', 3, 0, 3, 0, NULL),
(148, 17, '2025-06-14 13:00:00', '2025-06-14 14:00:00', 2, 0, 3, 0, NULL),
(149, 17, '2025-06-13 13:13:00', '2025-06-13 15:15:00', 1, 0, 1, 0, NULL),
(150, 17, '2025-06-13 12:12:00', '2025-06-13 14:14:00', 4, 0, 3, 0, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `etude_enroll`
--

CREATE TABLE `etude_enroll` (
  `id` int(11) NOT NULL,
  `etude_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `enroll_date` datetime NOT NULL DEFAULT current_timestamp(),
  `attend` tinyint(1) DEFAULT 0 COMMENT '0: Katılmadınız.\r\n1: Katıldınız.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `etude_enroll`
--

INSERT INTO `etude_enroll` (`id`, `etude_id`, `student_id`, `enroll_date`, `attend`) VALUES
(1, 119, 13, '2025-05-19 17:31:27', 1),
(2, 118, 1, '2025-05-19 17:31:36', 1),
(3, 118, 13, '2025-05-19 17:33:38', 1),
(5, 120, 2, '2025-05-19 19:18:01', 0),
(6, 120, 12, '2025-05-19 19:18:07', 0),
(7, 119, 2, '2025-05-19 19:19:19', 1),
(8, 119, 1, '2025-05-21 00:03:47', 1),
(9, 121, 1, '2025-05-21 00:26:15', 0),
(10, 129, 1, '2025-05-25 18:16:51', 0),
(28, 124, 1, '2025-05-25 23:23:58', 1),
(29, 125, 1, '2025-05-25 23:24:08', 0),
(30, 126, 1, '2025-05-25 23:24:09', 0),
(31, 128, 1, '2025-05-26 23:49:13', 1),
(32, 127, 1, '2025-05-27 01:19:55', 0),
(33, 122, 12, '2025-05-30 00:25:11', 0),
(40, 136, 1, '2025-05-30 00:51:31', 0),
(41, 144, 12, '2025-05-30 00:59:13', 0),
(42, 145, 12, '2025-05-30 00:59:49', 0),
(43, 127, 13, '2025-05-30 01:04:22', 1),
(44, 128, 13, '2025-05-30 01:04:22', 1),
(45, 139, 1, '2025-05-30 01:06:56', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `etude_notice`
--

CREATE TABLE `etude_notice` (
  `id` int(11) NOT NULL,
  `etude_id` int(11) NOT NULL,
  `notice` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `etude_notice`
--

INSERT INTO `etude_notice` (`id`, `etude_id`, `notice`, `createdAt`) VALUES
(1, 118, 'Merhaba arkadaşlar. Etütümüzü 21.05.2025 tarihinde saat 15:00-16:00 arasında gerçekleştireceğiz. Görüşmek üzere.', '2025-05-19 17:33:01'),
(2, 119, 'Merhaba arkadaşlar. Etütümüzü 21.05.2025 tarihinde saat 12:00-13:00 arasında gerçekleştireceğiz. Görüşmek üzere.', '2025-05-19 17:33:16'),
(3, 125, '1', '2025-05-27 00:47:08'),
(4, 125, '2', '2025-05-27 00:47:10'),
(5, 125, '3', '2025-05-27 00:47:13'),
(6, 128, 'fizik 1', '2025-05-27 01:20:26'),
(7, 122, '123', '2025-05-30 00:25:18'),
(8, 136, 'qwe', '2025-05-30 00:51:48'),
(9, 140, '3', '2025-05-30 00:53:58');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `family`
--

CREATE TABLE `family` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `family`
--

INSERT INTO `family` (`id`, `student_id`, `parent_id`) VALUES
(1, 1, 3),
(2, 1, 4),
(3, 2, 3),
(4, 2, 4),
(5, 13, 5),
(6, 13, 6),
(7, 12, 6),
(8, 12, 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `lesson`
--

CREATE TABLE `lesson` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `lesson`
--

INSERT INTO `lesson` (`id`, `name`) VALUES
(1, 'Matematik'),
(2, 'Tarih'),
(3, 'Coğrafya'),
(4, 'Türk Dili ve Edebiyatı'),
(5, 'Fizik'),
(6, 'Biyoloji'),
(7, 'Kimya'),
(8, 'Geometri');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `lesson_teacher`
--

CREATE TABLE `lesson_teacher` (
  `id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `lesson_teacher`
--

INSERT INTO `lesson_teacher` (`id`, `lesson_id`, `teacher_id`) VALUES
(2, 1, 16),
(3, 1, 18),
(4, 2, 17),
(5, 2, 19),
(6, 3, 26),
(7, 3, 27),
(8, 5, 22),
(9, 5, 23),
(10, 6, 24),
(11, 6, 25),
(12, 7, 20),
(13, 7, 21);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notice_admin`
--

CREATE TABLE `notice_admin` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `notice_admin`
--

INSERT INTO `notice_admin` (`id`, `admin_id`, `parent_id`, `content`, `createdAt`) VALUES
(1, 9, 4, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error veritatis quidem dolor soluta delectus. Eligendi delectus officiis omnis quos, unde at ab molestias, assumenda suscipit rem, dolorum doloremque non facere!', '2025-06-01'),
(2, 9, 3, '1', '2025-06-01'),
(3, 9, 3, '2', '2025-06-01'),
(4, 9, 3, '3', '2025-06-01');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notice_teacher`
--

CREATE TABLE `notice_teacher` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `notice_teacher`
--

INSERT INTO `notice_teacher` (`id`, `teacher_id`, `parent_id`, `content`, `createdAt`) VALUES
(3, 17, 4, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur ipsam hic rem tempore aliquam mollitia, at reiciendis expedita corrupti provident praesentium odit ex, possimus quam maxime soluta facilis repellat consectetur non nesciunt pariatur. Dolorum possimus repudiandae obcaecati corrupti provident quisquam!\n', '2025-06-01'),
(4, 17, 6, '2', '2025-06-01'),
(5, 17, 3, '2', '2025-06-01'),
(6, 17, 5, '1', '2025-06-01'),
(7, 17, 3, '1', '2025-06-01'),
(8, 17, 4, '1', '2025-06-01'),
(9, 17, 3, '1', '2025-06-01'),
(10, 17, 3, '1', '2025-06-01'),
(11, 17, 5, 'q', '2025-06-01');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `teacher_workhours`
--

CREATE TABLE `teacher_workhours` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `teacher_workhours`
--

INSERT INTO `teacher_workhours` (`id`, `teacher_id`, `start`, `end`) VALUES
(1, 17, '2025-04-24 16:00:00', '2025-04-24 17:00:00'),
(2, 17, '2025-04-25 16:00:00', '2025-04-25 17:00:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `type` tinyint(2) NOT NULL,
  `class_number` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `surname`, `type`, `class_number`) VALUES
(1, 'aliyeozuag', '123', 'Aliye', 'ÖZÜAĞ', 3, 1),
(2, 'elifozuag', '123', 'Elif', 'ÖZÜAĞ', 3, 1),
(3, 'sahinozuag', '123', 'Şahin', 'ÖZÜAĞ', 4, NULL),
(4, 'seherozuag', '123', 'Seher', 'ÖZÜAĞ', 4, NULL),
(5, 'melekozturk', '123', 'Melek', 'ÖZTÜRK', 4, NULL),
(6, 'hasanozturk', '123', 'Hasan', 'ÖZTÜRK', 4, NULL),
(9, 'vahaptecim', '123', 'Vahap', 'TECİM', 1, NULL),
(12, 'furkanozturk', '123', 'Furkan', 'ÖZTÜRK', 3, 4),
(13, 'ahsenozturk', '123', 'Ahsen', 'ÖZTÜRK', 3, 1),
(16, 'matematikhocası1', '123', 'Matematik', 'Hocası1', 2, NULL),
(17, 'tarihhocası1', '123', 'Tarih', 'Hocası1', 2, NULL),
(18, 'matematikhocası2', '123', 'Matematik', 'Hocası2', 2, NULL),
(19, 'tarihhocası2', '123', 'Tarih', 'Hocası2', 2, NULL),
(20, 'kimyahocası1', '123', 'Kimya', 'Hocası1', 2, NULL),
(21, 'kimyahocası2', '123', 'Kimya', 'Hocası2', 2, NULL),
(22, 'fizikhocası1', '123', 'Fizik', 'Hocası1', 2, NULL),
(23, 'fizikhocası2', '123', 'Fizik', 'Hocası2', 2, NULL),
(24, 'biyolojihocası1', '123', 'Biyoloji', 'Hocası1', 2, NULL),
(25, 'biyolojihocası2', '123', 'Biyoloji', 'Hocası2', 2, NULL),
(26, 'coğrafyahocası1', '123', 'Coğrafya', 'Hocası1', 2, NULL),
(27, 'coğrafyahocası2', '123', 'Coğrafya', 'Hocası2', 2, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_type`
--

CREATE TABLE `user_type` (
  `id` tinyint(2) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `user_type`
--

INSERT INTO `user_type` (`id`, `name`) VALUES
(1, 'Yönetici'),
(2, 'Öğretmen'),
(3, 'Öğrenci'),
(4, 'Veli');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `etude`
--
ALTER TABLE `etude`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `request_from` (`request_from`);

--
-- Tablo için indeksler `etude_enroll`
--
ALTER TABLE `etude_enroll`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etude_id` (`etude_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Tablo için indeksler `etude_notice`
--
ALTER TABLE `etude_notice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etude_id` (`etude_id`);

--
-- Tablo için indeksler `family`
--
ALTER TABLE `family`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student` (`student_id`),
  ADD KEY `parent` (`parent_id`);

--
-- Tablo için indeksler `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `lesson_teacher`
--
ALTER TABLE `lesson_teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_id` (`lesson_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Tablo için indeksler `notice_admin`
--
ALTER TABLE `notice_admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Tablo için indeksler `notice_teacher`
--
ALTER TABLE `notice_teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Tablo için indeksler `teacher_workhours`
--
ALTER TABLE `teacher_workhours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Tablo için indeksler `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `type` (`type`);

--
-- Tablo için indeksler `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `etude`
--
ALTER TABLE `etude`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- Tablo için AUTO_INCREMENT değeri `etude_enroll`
--
ALTER TABLE `etude_enroll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Tablo için AUTO_INCREMENT değeri `etude_notice`
--
ALTER TABLE `etude_notice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `family`
--
ALTER TABLE `family`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `lesson_teacher`
--
ALTER TABLE `lesson_teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `notice_admin`
--
ALTER TABLE `notice_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `notice_teacher`
--
ALTER TABLE `notice_teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tablo için AUTO_INCREMENT değeri `teacher_workhours`
--
ALTER TABLE `teacher_workhours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Tablo için AUTO_INCREMENT değeri `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `etude`
--
ALTER TABLE `etude`
  ADD CONSTRAINT `etude_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `etude_ibfk_4` FOREIGN KEY (`request_from`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `etude_enroll`
--
ALTER TABLE `etude_enroll`
  ADD CONSTRAINT `etude_enroll_ibfk_1` FOREIGN KEY (`etude_id`) REFERENCES `etude` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `etude_enroll_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `etude_notice`
--
ALTER TABLE `etude_notice`
  ADD CONSTRAINT `etude_notice_ibfk_1` FOREIGN KEY (`etude_id`) REFERENCES `etude` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `family`
--
ALTER TABLE `family`
  ADD CONSTRAINT `family_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `family_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `lesson_teacher`
--
ALTER TABLE `lesson_teacher`
  ADD CONSTRAINT `lesson_teacher_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lesson_teacher_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `notice_admin`
--
ALTER TABLE `notice_admin`
  ADD CONSTRAINT `notice_admin_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notice_admin_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `notice_teacher`
--
ALTER TABLE `notice_teacher`
  ADD CONSTRAINT `notice_teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notice_teacher_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `teacher_workhours`
--
ALTER TABLE `teacher_workhours`
  ADD CONSTRAINT `teacher_workhours_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`type`) REFERENCES `user_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

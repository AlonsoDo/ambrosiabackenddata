-- --------------------------------------------------------
-- Host:                         eu-cdbr-west-01.cleardb.com
-- Versión del servidor:         5.5.40-log - MySQL Community Server (GPL)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.elementos
CREATE TABLE IF NOT EXISTS `elementos` (
  `ElementoId` int(11) NOT NULL AUTO_INCREMENT,
  `PadreId` int(11) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Impuesto` decimal(10,2) NOT NULL,
  `ImprimirEnFactura` tinyint(4) NOT NULL,
  `ImprimirEnComanda` tinyint(4) NOT NULL,
  `ColorLetras` varchar(7) NOT NULL,
  `ColorFondo` varchar(7) NOT NULL,
  `TieneImpresora` tinyint(4) NOT NULL,
  `TieneTerminal` tinyint(4) NOT NULL,
  PRIMARY KEY (`ElementoId`)
) ENGINE=InnoDB AUTO_INCREMENT=1014 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.elementos: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `elementos` DISABLE KEYS */;
INSERT INTO `elementos` (`ElementoId`, `PadreId`, `CompanyId`, `Descripcion`, `Precio`, `Impuesto`, `ImprimirEnFactura`, `ImprimirEnComanda`, `ColorLetras`, `ColorFondo`, `TieneImpresora`, `TieneTerminal`) VALUES
	(14, 0, 4, 'Cervezas', 0.00, 0.00, 0, 0, '', '', 0, 0),
	(24, 0, 4, 'Cafes', -0.01, 0.00, 0, 0, '', '', 0, 0),
	(34, 0, 4, 'Ensaladas', 0.00, 7.00, 0, 0, '', '', 0, 0),
	(44, 0, 4, 'Entrantes', 0.00, 0.00, 1, 0, '', '', 0, 0),
	(54, 0, 4, 'Carnes', 0.00, 0.00, 1, 1, '', '', 0, 0),
	(64, 0, 4, 'Pescados', 0.00, 0.00, 1, 1, '#a15555', '#1d7d43', 0, 0),
	(804, 0, 4, 'Postres', 0.00, 0.00, 0, 0, '#fcfcfc', '#e6197b', 1, 1),
	(814, -1, 4, 'Postres', 0.00, 0.00, 0, 0, '#fcfcfc', '#e6197b', 1, 1),
	(954, 0, 4, 'Bebidas', 0.00, 0.00, 0, 0, '#1de08e', '#eb0c5c', 0, 0),
	(964, -1, 4, 'Bebidas', 0.00, 0.00, 0, 0, '#1de08e', '#eb0c5c', 0, 0),
	(984, -1, 4, 'Vinos', 0.00, 0.00, 0, 0, '#40de18', '#f0164a', 1, 1);
/*!40000 ALTER TABLE `elementos` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `EmpleadoId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreEmpleado` varchar(30) NOT NULL,
  `ClaveEmpleado` varchar(20) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`EmpleadoId`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.empleados: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` (`EmpleadoId`, `NombreEmpleado`, `ClaveEmpleado`, `CompanyId`) VALUES
	(34, 'Roberto', '1234', 34),
	(64, 'Sandra', '1234', 4),
	(74, 'Antonio', '1234', 4),
	(84, 'Juan', '1234', 4),
	(94, 'Lopez', '1234', 4);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.impresoraconfig
CREATE TABLE IF NOT EXISTS `impresoraconfig` (
  `ElementoId` int(11) NOT NULL,
  `NombreImpresora` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.impresoraconfig: ~168 rows (aproximadamente)
/*!40000 ALTER TABLE `impresoraconfig` DISABLE KEYS */;
INSERT INTO `impresoraconfig` (`ElementoId`, `NombreImpresora`) VALUES
	(104, 'undefined'),
	(104, 'undefined'),
	(104, 'undefined'),
	(114, 'undefined'),
	(114, 'undefined'),
	(114, 'undefined'),
	(124, 'undefined'),
	(124, 'undefined'),
	(124, 'undefined'),
	(144, 'Cocina-Postres'),
	(144, 'Cocina-Postres'),
	(144, 'Cocina-Postres'),
	(154, 'Cocina-Postres'),
	(154, 'Cocina-Postres'),
	(154, 'Cocina-Postres'),
	(194, 'Cocina-Primeros'),
	(194, 'Cocina-Postres'),
	(194, 'Cocina-Segundos'),
	(204, 'Cocina-Primeros'),
	(234, 'Cocina-Primeros'),
	(244, 'Cocina-Primeros'),
	(254, 'Cocina-Primeros'),
	(274, 'Cocina-Primeros'),
	(274, 'Cocina-Segundos'),
	(284, 'Cocina-Primeros'),
	(284, 'Cocina-Segundos'),
	(274, 'Cocina-Postres'),
	(284, 'Cocina-Postres'),
	(294, 'Cocina-Primeros'),
	(294, 'Cocina-Segundos'),
	(294, 'Cocina-Postres'),
	(304, 'Cocina-Primeros'),
	(304, 'Cocina-Segundos'),
	(304, 'Cocina-Postres'),
	(314, 'Cocina-Primeros'),
	(314, 'Cocina-Segundos'),
	(324, 'Cocina-Primeros'),
	(324, 'Cocina-Segundos'),
	(314, 'Cocina-Postres'),
	(324, 'Cocina-Postres'),
	(364, 'Cocina-Primeros'),
	(374, 'Cocina-Primeros'),
	(384, 'Cocina-Primeros'),
	(394, 'Cocina-Primeros'),
	(444, 'Cocina-Primeros'),
	(444, 'Cocina-Segundos'),
	(444, 'Cocina-Postres'),
	(454, 'Cocina-Primeros'),
	(454, 'Cocina-Segundos'),
	(454, 'Cocina-Postres'),
	(464, 'Cocina-Primeros'),
	(474, 'Cocina-Primeros'),
	(494, 'Cocina-Segundos'),
	(494, 'Cocina-Primeros'),
	(484, 'Cocina-Segundos'),
	(484, 'Cocina-Primeros'),
	(514, 'Cocina-Primeros'),
	(514, 'Cocina-Segundos'),
	(504, 'Cocina-Primeros'),
	(504, 'Cocina-Segundos'),
	(534, 'Cocina-Primeros'),
	(534, 'Cocina-Segundos'),
	(534, 'Cocina-Postres'),
	(544, 'Cocina-Primeros'),
	(554, 'Cocina-Primeros'),
	(564, 'Cocina-Primeros'),
	(564, 'Cocina-Segundos'),
	(574, 'Cocina-Primeros'),
	(574, 'Cocina-Segundos'),
	(584, 'Cocina-Primeros'),
	(584, 'Cocina-Segundos'),
	(594, 'Cocina-Primeros'),
	(594, 'Cocina-Segundos'),
	(584, 'Cocina-Postres'),
	(604, 'Cocina-Primeros'),
	(614, 'Cocina-Primeros'),
	(624, 'Cocina-Primeros'),
	(624, 'Cocina-Segundos'),
	(634, 'Cocina-Primeros'),
	(634, 'Cocina-Segundos'),
	(644, 'Cocina-Primeros'),
	(654, 'Cocina-Primeros'),
	(664, 'Cocina-Postres'),
	(664, 'Cocina-Primeros'),
	(664, 'Cocina-Segundos'),
	(674, 'Cocina-Primeros'),
	(674, 'Cocina-Postres'),
	(674, 'Cocina-Segundos'),
	(684, 'Cocina-Segundos'),
	(684, 'Cocina-Primeros'),
	(684, 'Cocina-Postres'),
	(704, 'Cocina-Primeros'),
	(704, 'Cocina-Segundos'),
	(704, 'Cocina-Postres'),
	(714, 'Cocina-Primeros'),
	(714, 'Cocina-Segundos'),
	(1, 'Print1'),
	(1, 'Print2'),
	(1, 'Print3'),
	(1, 'Print4'),
	(1, 'Print5'),
	(1, 'Print6'),
	(1, 'Print7'),
	(1, 'Print8'),
	(1, 'Print9'),
	(1, 'Print10'),
	(1, 'Print11'),
	(1, 'Print12'),
	(1, 'Print1'),
	(1, 'Print2'),
	(1, 'Print3'),
	(1, 'Print4'),
	(1, 'Print5'),
	(1, 'Print6'),
	(1, 'Print7'),
	(1, 'Print8'),
	(1, 'Print9'),
	(1, 'Print10'),
	(1, 'Print11'),
	(1, 'Print12'),
	(1, 'Print1'),
	(1, 'Print2'),
	(1, 'Print3'),
	(1, 'Print4'),
	(1, 'Print5'),
	(1, 'Print6'),
	(1, 'Print7'),
	(1, 'Print8'),
	(1, 'Print9'),
	(1, 'Print10'),
	(1, 'Print11'),
	(1, 'Print12'),
	(764, 'Cocina-Primeros'),
	(764, 'Cocina-Segundos'),
	(764, 'Cocina-Postres'),
	(774, 'Cocina-Primeros'),
	(774, 'Cocina-Segundos'),
	(774, 'Cocina-Postres'),
	(784, 'Cocina-Primeros'),
	(794, 'Cocina-Primeros'),
	(784, 'Cocina-Segundos'),
	(794, 'Cocina-Segundos'),
	(784, 'Cocina-Postres'),
	(784, 'Caja'),
	(794, 'Cocina-Postres'),
	(794, 'Caja'),
	(794, 'Barra'),
	(794, 'Cocina'),
	(784, 'Barra'),
	(784, 'Cocina'),
	(804, 'Cocina-Primeros'),
	(814, 'Cocina-Primeros'),
	(804, 'Cocina-Segundos'),
	(814, 'Cocina-Segundos'),
	(814, 'Cocina-Postres'),
	(814, 'Caja'),
	(804, 'Cocina-Postres'),
	(814, 'Barra'),
	(804, 'Caja'),
	(814, 'Cocina'),
	(804, 'Barra'),
	(804, 'Cocina'),
	(844, 'Cocina-Primeros'),
	(844, 'Caja'),
	(884, 'Cocina-Primeros'),
	(874, 'Cocina-Primeros'),
	(884, 'Caja'),
	(874, 'Caja'),
	(974, 'Barra'),
	(974, 'Barra'),
	(984, 'Barra'),
	(984, 'Barra'),
	(994, 'Cocina-Primeros'),
	(994, 'Caja'),
	(1004, 'Cocina-Primeros'),
	(1004, 'Caja');
/*!40000 ALTER TABLE `impresoraconfig` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.impresoras
CREATE TABLE IF NOT EXISTS `impresoras` (
  `ImpresoraId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreImpresora` varchar(30) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`ImpresoraId`)
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.impresoras: ~15 rows (aproximadamente)
/*!40000 ALTER TABLE `impresoras` DISABLE KEYS */;
INSERT INTO `impresoras` (`ImpresoraId`, `NombreImpresora`, `CompanyId`) VALUES
	(74, 'Cocina-Entrantes', 14),
	(94, 'Cocina-Primeros', 14),
	(124, 'Cocina-Segundos', 14),
	(134, 'Cocina-Postres', 14),
	(144, 'Barra-Bebida', 14),
	(154, 'Barra-Comida', 14),
	(164, 'Caja-Barra', 14),
	(174, 'Caja', 24),
	(184, 'Barra', 24),
	(194, 'Caja', 34),
	(234, 'Barra', 34),
	(244, 'Cocina', 34),
	(274, 'Cocina-Primeros', 4),
	(284, 'Cocina-Segundos', 4),
	(304, 'Barra', 4);
/*!40000 ALTER TABLE `impresoras` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.login
CREATE TABLE IF NOT EXISTS `login` (
  `CompanyId` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `User` varchar(20) NOT NULL,
  `Pass` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `NombreComercial` varchar(50) NOT NULL,
  `NombreFiscal` varchar(50) NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `CodigoPostal` varchar(5) NOT NULL,
  `Ciudad` varchar(30) NOT NULL,
  `NIF` varchar(10) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  PRIMARY KEY (`CompanyId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.login: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` (`CompanyId`, `User`, `Pass`, `Email`, `NombreComercial`, `NombreFiscal`, `Direccion`, `CodigoPostal`, `Ciudad`, `NIF`, `Telefono`) VALUES
	(4, 'Caspi', '1234', 'alonso_caspi@hotmail.com', 'Restaurante Los Pescadores 2', 'Bahia S.L.', 'Playa del Bajondillo 24', '12345', 'Torrremolinos', '12123123-X', '952445566'),
	(14, 'Sofia2', '1234', 'sofiadominguezbelmonte@gmail.com', 'Heladeria Dolche Gusto', 'Mirar S.A.', 'C/ San Juan 25', '12345', 'La Higuera', '1234567-L', '123123123'),
	(24, 'CaspiAutentico', '12345678', 'alonso.caspi@gmail.com', 'Taperia La Esquinita', 'GestaSur S.L.', 'C/ Estepona 22', '29555', 'Marbella', '27333444-L', ''),
	(34, 'Caspi2', '12345', 'alonso_caspi2@hotmail.com', '', '', '', '', '', '', ''),
	(44, 'tamisa', '1234A', 'correoapolosoft@hotmail.com', '', '', '', '', '', '', ''),
	(54, 'Test', '12345', 'apolosoft@telefonica.net', '', '', '', '', '', '', ''),
	(64, 'test1', 'test', 'apolosoft@telefonica.com', '', '', '', '', '', '', ''),
	(74, 'w', 'w', 'alonso@gmail.com', '', '', '', '', '', '', ''),
	(84, 'Yo', '1234', 'alonso@gmail.com', '', '', '', '', '', '', ''),
	(94, 'CaspiYo', '1234', 'alonso@gmail.com', '', '', '', '', '', '', '');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.terminalconfig
CREATE TABLE IF NOT EXISTS `terminalconfig` (
  `ElementoId` int(11) NOT NULL,
  `NombreTerminal` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.terminalconfig: ~110 rows (aproximadamente)
/*!40000 ALTER TABLE `terminalconfig` DISABLE KEYS */;
INSERT INTO `terminalconfig` (`ElementoId`, `NombreTerminal`) VALUES
	(224, 'Caja'),
	(224, 'Barra'),
	(224, 'Cocina'),
	(234, 'Caja'),
	(244, 'Caja'),
	(254, 'Caja'),
	(274, 'Cocina'),
	(274, 'Barra'),
	(274, 'Caja'),
	(284, 'Barra'),
	(284, 'Caja'),
	(294, 'Caja'),
	(294, 'Barra'),
	(294, 'Cocina'),
	(304, 'Caja'),
	(314, 'Caja'),
	(314, 'Cocina'),
	(314, 'Barra'),
	(324, 'Caja'),
	(324, 'Barra'),
	(334, 'Caja'),
	(344, 'Cocina'),
	(354, 'Cocina'),
	(384, 'Caja'),
	(394, 'Caja'),
	(424, 'Caja'),
	(434, 'Caja'),
	(444, 'Barra'),
	(444, 'Caja'),
	(444, 'Cocina'),
	(464, 'Caja'),
	(474, 'Caja'),
	(484, 'Caja'),
	(494, 'Caja'),
	(514, 'Caja'),
	(504, 'Barra'),
	(504, 'Caja'),
	(514, 'Barra'),
	(534, 'Barra'),
	(534, 'Caja'),
	(534, 'Cocina'),
	(544, 'Caja'),
	(554, 'Caja'),
	(564, 'Barra'),
	(564, 'Caja'),
	(574, 'Barra'),
	(574, 'Caja'),
	(594, 'Caja'),
	(584, 'Barra'),
	(604, 'Caja'),
	(614, 'Caja'),
	(614, 'Cocina'),
	(614, 'Barra'),
	(604, 'Cocina'),
	(604, 'Barra'),
	(624, 'Barra'),
	(624, 'Caja'),
	(634, 'Caja'),
	(634, 'Barra'),
	(644, 'Caja'),
	(654, 'Caja'),
	(664, 'Caja'),
	(674, 'Caja'),
	(704, 'Caja'),
	(704, 'Cocina'),
	(704, 'Barra'),
	(714, 'Caja'),
	(724, 'Caja'),
	(744, 'Caja'),
	(744, 'Cocina'),
	(744, 'Barra'),
	(754, 'Caja'),
	(754, 'Cocina'),
	(754, 'Barra'),
	(764, 'Caja'),
	(764, 'Barra'),
	(764, 'Cocina'),
	(774, 'Cocina'),
	(774, 'Barra'),
	(774, 'Caja'),
	(794, 'Cocina-Primeros'),
	(794, 'Cocina-Segundos'),
	(794, 'Cocina-Postres'),
	(794, 'Caja'),
	(794, 'Barra'),
	(794, 'Cocina'),
	(784, 'Cocina-Primeros'),
	(784, 'Cocina-Segundos'),
	(784, 'Cocina-Postres'),
	(784, 'Caja'),
	(784, 'Barra'),
	(784, 'Cocina'),
	(804, 'Cocina-Primeros'),
	(804, 'Cocina-Segundos'),
	(814, 'Cocina-Primeros'),
	(804, 'Cocina-Postres'),
	(814, 'Cocina-Segundos'),
	(804, 'Caja'),
	(814, 'Cocina-Postres'),
	(814, 'Caja'),
	(804, 'Barra'),
	(814, 'Barra'),
	(804, 'Cocina'),
	(814, 'Cocina'),
	(844, 'Cocina-Primeros'),
	(844, 'Caja'),
	(884, 'Cocina-Primeros'),
	(884, 'Caja'),
	(874, 'Cocina-Primeros'),
	(874, 'Caja');
/*!40000 ALTER TABLE `terminalconfig` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.terminales
CREATE TABLE IF NOT EXISTS `terminales` (
  `TerminalId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreTerminal` varchar(30) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`TerminalId`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.terminales: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `terminales` DISABLE KEYS */;
INSERT INTO `terminales` (`TerminalId`, `NombreTerminal`, `CompanyId`) VALUES
	(74, 'Terminal-Barra', 34),
	(84, 'Terminal-Caja', 34),
	(94, 'Terminal-Cocina', 34),
	(154, 'Caja', 4),
	(164, 'Barra', 4),
	(174, 'Cocina', 4),
	(184, 'Caja2', 4);
/*!40000 ALTER TABLE `terminales` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

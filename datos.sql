-- --------------------------------------------------------
-- Host:                         eu-cdbr-west-01.cleardb.com
-- Versión del servidor:         5.5.56-log - MySQL Community Server (GPL)
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
) ENGINE=InnoDB AUTO_INCREMENT=1515 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.elementos: ~27 rows (aproximadamente)
/*!40000 ALTER TABLE `elementos` DISABLE KEYS */;
INSERT INTO `elementos` (`ElementoId`, `PadreId`, `CompanyId`, `Descripcion`, `Precio`, `Impuesto`, `ImprimirEnFactura`, `ImprimirEnComanda`, `ColorLetras`, `ColorFondo`, `TieneImpresora`, `TieneTerminal`) VALUES
	(34, 0, 4, 'Ensaladas', 0.00, 7.00, 0, 0, '', '', 0, 0),
	(44, 0, 4, 'Entrantes', 0.00, 0.00, 1, 0, '', '', 0, 0),
	(54, 0, 4, 'Carnes', 0.00, 0.00, 1, 1, '', '', 0, 0),
	(64, 0, 4, 'Pescados', 0.00, 0.00, 1, 1, '#a15555', '#1d7d43', 0, 0),
	(804, 0, 4, 'Postres', 0.00, 0.00, 0, 0, '#fcfcfc', '#e6197b', 1, 1),
	(954, 0, 4, 'Bebidas', 0.00, 0.00, 0, 0, '#1de08e', '#eb0c5c', 0, 0),
	(1014, -1, 4, 'Lenguado Menier', 15.50, 0.00, 1, 1, '#faf7f7', '#f00e52', 1, 1),
	(1054, 0, 104, 'Menu Especial', 22.00, 7.00, 1, 0, '#ffffff', '#000000', 0, 0),
	(1064, 0, 104, 'Entrantes', 0.00, 0.00, 1, 1, '#ffffff', '#000000', 0, 0),
	(1084, 0, 104, 'Carnes', 0.00, 0.00, 0, 0, '#ffffff', '#000000', 1, 0),
	(1094, 0, 104, 'Pescados', 0.00, 0.00, 1, 1, '#000000', '#ed1a73', 1, 0),
	(1104, -1, 104, 'Postres', 0.00, 0.00, 0, 0, '#ffffff', '#000000', 1, 1),
	(1114, -1, 104, 'Cervezas', 0.00, 0.00, 0, 0, '#ffffff', '#000000', 0, 1),
	(1124, -1, 104, 'Carnes', 0.00, 0.00, 0, 0, '#e80eab', '#000000', 0, 1),
	(1134, -1, 104, 'Ensaladas', 0.00, 0.00, 0, 0, '#ebaf15', '#000000', 0, 1),
	(1154, 0, 104, 'Cafes', 0.00, 0.00, 0, 0, '#f0af07', '#000000', 0, 1),
	(1174, -1, 104, 'Vinos', 0.00, 0.00, 0, 0, '#000000', '#f2b311', 1, 1),
	(1214, -1, 104, 'Pescado Plancha', 0.04, 0.04, 0, 0, '#ed0e52', '#000002', 1, 1),
	(1284, 0, 104, 'Pizzas', 0.00, 0.00, 0, 0, '#f50a34', '#000000', 0, 0),
	(1294, -1, 4, 'Solomillo Pimienta', 15.00, 7.00, 1, 1, '#000000', '#ed0977', 1, 1),
	(1314, -1, 4, 'Espeto Sardinas', 5.00, 7.00, 1, 1, '#000000', '#1ad944', 1, 1),
	(1334, -1, 4, 'Lenguado Plancha', 12.00, 7.00, 1, 1, '#000000', '#21db34', 1, 1),
	(1344, -1, 4, 'Sin Sal', 0.00, 0.00, 0, 1, '#000000', '#14e35b', 1, 1),
	(1354, -1, 4, 'Medio Hecho', 0.00, 0.00, 0, 1, '#000000', '#3ede16', 1, 1),
	(1364, -1, 4, 'Bien Hecho', 0.00, 0.00, 0, 1, '#000000', '#3ede16', 1, 1),
	(1374, -1, 4, 'Otros Pescados', 0.00, 0.00, 0, 1, '#000000', '#24e02b', 1, 1),
	(1434, -1, 4, 'Ensalada Mixta', 5.00, 7.00, 1, 1, '#000000', '#1fe08f', 1, 1),
	(1444, -1, 4, 'Ensalada de la Casa', 6.00, 7.00, 1, 1, '#000000', '#1fe08f', 1, 1),
	(1454, -1, 4, 'Solomillo Ternera', 15.00, 7.00, 1, 1, '#000000', '#e0701f', 1, 1),
	(1464, -1, 4, 'Brocheta Mixta', 13.00, 7.00, 1, 1, '#000000', '#ed9a1c', 1, 1),
	(1474, -1, 4, 'Chuletas Cordero', 12.00, 7.00, 1, 1, '#000000', '#e05e14', 1, 1),
	(1484, 0, 4, 'Vinos', 0.00, 0.00, 0, 0, '#000000', '#e05e14', 0, 0),
	(1504, -1, 4, 'Chuletas Cerdo', 11.00, 7.00, 1, 1, '#000000', '#e3b614', 1, 1),
	(1514, -1, 4, 'Pizzas', 0.00, 0.00, 0, 0, '#000000', '#de7f10', 1, 1);
/*!40000 ALTER TABLE `elementos` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `EmpleadoId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreEmpleado` varchar(30) NOT NULL,
  `ClaveEmpleado` varchar(20) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`EmpleadoId`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;

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

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.impresoraconfig: ~213 rows (aproximadamente)
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
	(304, 'Cocina-Primeros'),
	(294, 'Cocina-Postres'),
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
	(454, 'Cocina-Primeros'),
	(444, 'Cocina-Postres'),
	(454, 'Cocina-Segundos'),
	(454, 'Cocina-Postres'),
	(464, 'Cocina-Primeros'),
	(474, 'Cocina-Primeros'),
	(494, 'Cocina-Segundos'),
	(494, 'Cocina-Primeros'),
	(484, 'Cocina-Primeros'),
	(484, 'Cocina-Segundos'),
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
	(784, 'Cocina-Segundos'),
	(784, 'Cocina-Postres'),
	(784, 'Caja'),
	(784, 'Barra'),
	(784, 'Cocina'),
	(794, 'Cocina-Primeros'),
	(794, 'Cocina-Segundos'),
	(794, 'Cocina-Postres'),
	(794, 'Caja'),
	(794, 'Barra'),
	(794, 'Cocina'),
	(804, 'Cocina-Primeros'),
	(804, 'Cocina-Segundos'),
	(804, 'Cocina-Postres'),
	(804, 'Caja'),
	(804, 'Barra'),
	(804, 'Cocina'),
	(814, 'Cocina-Primeros'),
	(814, 'Cocina-Segundos'),
	(814, 'Cocina-Postres'),
	(814, 'Caja'),
	(814, 'Barra'),
	(814, 'Cocina'),
	(844, 'Cocina-Primeros'),
	(844, 'Caja'),
	(884, 'Cocina-Primeros'),
	(884, 'Caja'),
	(874, 'Cocina-Primeros'),
	(874, 'Caja'),
	(974, 'Barra'),
	(974, 'Barra'),
	(994, 'Cocina-Primeros'),
	(994, 'Caja'),
	(1004, 'Cocina-Primeros'),
	(1004, 'Caja'),
	(1014, 'Cocina-Segundos'),
	(1014, 'Cocina'),
	(1024, 'Cocina'),
	(1024, 'Cocina'),
	(1034, 'Cocina-Segundos'),
	(1034, 'Cocina'),
	(1044, 'Barra'),
	(1044, 'Barra'),
	(1074, 'Cocina'),
	(1074, 'Cocina'),
	(1084, 'Barra'),
	(1084, 'Caja'),
	(1094, 'Caja'),
	(1104, 'Barra'),
	(1104, 'Cocina'),
	(1104, 'Barra'),
	(1174, 'Barra'),
	(1174, 'Cocina'),
	(1174, 'Caja'),
	(1224, 'Barra'),
	(1224, 'Caja'),
	(1234, 'Barra'),
	(1234, 'Caja'),
	(1254, 'Cocina'),
	(1214, 'Test4'),
	(984, 'Barra'),
	(1294, 'Cocina'),
	(1304, 'Cocina'),
	(1314, 'Cocina'),
	(1324, 'Cocina'),
	(1334, 'Cocina'),
	(1344, 'Cocina'),
	(1354, 'Cocina'),
	(1374, 'Cocina'),
	(1384, 'Cocina'),
	(1404, 'Cocina'),
	(1414, 'Cocina'),
	(1424, 'Cocina'),
	(1364, 'Cocina'),
	(1434, 'Cocina'),
	(1444, 'Cocina'),
	(1454, 'Cocina'),
	(1464, 'Cocina'),
	(1474, 'Cocina'),
	(1494, 'Cocina'),
	(1504, 'Cocina'),
	(1514, 'Cocina');
/*!40000 ALTER TABLE `impresoraconfig` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.impresoras
CREATE TABLE IF NOT EXISTS `impresoras` (
  `ImpresoraId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreImpresora` varchar(30) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`ImpresoraId`)
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.impresoras: ~22 rows (aproximadamente)
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
	(274, 'Cocina', 4),
	(284, 'Cocina-Segundos', 4),
	(304, 'Barra', 4),
	(314, 'Barra', 104),
	(324, 'Cocina', 104),
	(334, 'Caja', 104),
	(344, 'Test', 104),
	(354, 'Test2', 104),
	(364, 'Test3', 104),
	(374, 'Test4', 104);
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
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.login: ~11 rows (aproximadamente)
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
	(94, 'CaspiYo', '1234', 'alonso@gmail.com', '', '', '', '', '', '', ''),
	(104, 'SinImpresoras', '1234', 'alonso.caspi@gmail.com', '', '', '', '', '', '', '');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.terminalconfig
CREATE TABLE IF NOT EXISTS `terminalconfig` (
  `ElementoId` int(11) NOT NULL,
  `NombreTerminal` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.terminalconfig: ~131 rows (aproximadamente)
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
	(314, 'Cocina'),
	(314, 'Caja'),
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
	(534, 'Cocina'),
	(534, 'Caja'),
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
	(604, 'Barra'),
	(604, 'Cocina'),
	(624, 'Barra'),
	(624, 'Caja'),
	(634, 'Caja'),
	(634, 'Barra'),
	(644, 'Caja'),
	(654, 'Caja'),
	(664, 'Caja'),
	(674, 'Caja'),
	(704, 'Cocina'),
	(704, 'Caja'),
	(704, 'Barra'),
	(714, 'Caja'),
	(724, 'Caja'),
	(744, 'Caja'),
	(744, 'Barra'),
	(744, 'Cocina'),
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
	(814, 'Cocina-Primeros'),
	(814, 'Cocina-Segundos'),
	(814, 'Cocina-Postres'),
	(814, 'Caja'),
	(814, 'Barra'),
	(814, 'Cocina'),
	(804, 'Cocina-Primeros'),
	(804, 'Cocina-Segundos'),
	(804, 'Cocina-Postres'),
	(804, 'Caja'),
	(804, 'Barra'),
	(804, 'Cocina'),
	(844, 'Cocina-Primeros'),
	(844, 'Caja'),
	(884, 'Cocina-Primeros'),
	(884, 'Caja'),
	(874, 'Cocina-Primeros'),
	(874, 'Caja'),
	(1154, 'Barra'),
	(1164, 'Barra'),
	(1174, 'Cocina'),
	(1174, 'Barra'),
	(1174, 'Caja'),
	(1254, 'Cocina'),
	(1214, 'Caja'),
	(1294, 'Cocina'),
	(1304, 'Cocina'),
	(1314, 'Cocina'),
	(1324, 'Cocina'),
	(1334, 'Cocina'),
	(1344, 'Cocina'),
	(1354, 'Cocina'),
	(1374, 'Cocina'),
	(1384, 'Cocina'),
	(1404, 'Cocina'),
	(1414, 'Cocina'),
	(1424, 'Caja'),
	(1424, 'Cocina'),
	(1364, 'Cocina'),
	(1434, 'Cocina'),
	(1444, 'Cocina'),
	(1454, 'Cocina'),
	(1464, 'Cocina'),
	(1474, 'Cocina'),
	(1494, 'Cocina'),
	(1504, 'Cocina'),
	(1514, 'Cocina');
/*!40000 ALTER TABLE `terminalconfig` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.terminales
CREATE TABLE IF NOT EXISTS `terminales` (
  `TerminalId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreTerminal` varchar(30) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`TerminalId`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.terminales: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `terminales` DISABLE KEYS */;
INSERT INTO `terminales` (`TerminalId`, `NombreTerminal`, `CompanyId`) VALUES
	(74, 'Terminal-Barra', 34),
	(84, 'Terminal-Caja', 34),
	(94, 'Terminal-Cocina', 34),
	(154, 'Caja', 4),
	(164, 'Barra', 4),
	(174, 'Cocina', 4),
	(184, 'Caja2', 4),
	(194, 'Cocina', 104),
	(204, 'Barra', 104),
	(214, 'Caja', 104);
/*!40000 ALTER TABLE `terminales` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

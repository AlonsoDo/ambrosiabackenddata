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

-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `EmpleadoId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreEmpleado` varchar(30) NOT NULL,
  `ClaveEmpleado` varchar(20) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`EmpleadoId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.empleados: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` (`EmpleadoId`, `NombreEmpleado`, `ClaveEmpleado`, `CompanyId`) VALUES
	(34, 'Roberto', '1234', 34),
	(64, 'Sandra', '1234', 4),
	(74, 'Antonio', '1234', 4),
	(84, 'Juan', '1234', 4),
	(94, 'Lopez', '1234', 4);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.impresoras
CREATE TABLE IF NOT EXISTS `impresoras` (
  `ImpresoraId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreImpresora` varchar(30) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`ImpresoraId`)
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.impresoras: ~16 rows (aproximadamente)
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
	(284, 'Cocina-Segundos', 4);
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
  KEY `CompanyId` (`CompanyId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.login: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` (`CompanyId`, `User`, `Pass`, `Email`, `NombreComercial`, `NombreFiscal`, `Direccion`, `CodigoPostal`, `Ciudad`, `NIF`, `Telefono`) VALUES
	(4, 'Caspi', '1234', 'alonso_caspi@hotmail.com', 'Restaurante Los Pescadores', 'Bahia S.L.', 'Playa del Bajondillo 24', '12345', 'Torrremolinos', '12123123-X', '952445566'),
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


-- Volcando estructura para tabla heroku_f5b0ff88b3e8283.terminales
CREATE TABLE IF NOT EXISTS `terminales` (
  `TerminalId` int(11) NOT NULL AUTO_INCREMENT,
  `NombreTerminal` varchar(30) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  PRIMARY KEY (`TerminalId`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_f5b0ff88b3e8283.terminales: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `terminales` DISABLE KEYS */;
INSERT INTO `terminales` (`TerminalId`, `NombreTerminal`, `CompanyId`) VALUES
	(74, 'Terminal-Barra', 34),
	(84, 'Terminal-Caja', 34),
	(94, 'Terminal-Cocina', 34),
	(154, 'Caja', 4);
/*!40000 ALTER TABLE `terminales` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

CREATE TABLE member (
    tagID VARCHAR(32) NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    lastName VARCHAR(255),
    sex VarChar(1),
    birthday DATE
);

CREATE TABLE log (
    logID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    timestamp DATETIME,
    tagID VARCHAR(32),
    authorized TINYINT(1) 

);

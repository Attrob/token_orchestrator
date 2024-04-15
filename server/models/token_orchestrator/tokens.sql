CREATE DATABASE IF NOT EXISTS token_orchestrator;

CREATE TABLE IF NOT EXISTS tokens (
    id int(11) NOT NULL AUTO_INCREMENT,
    token_key varchar(255) UNIQUE NOT NULL,
    in_use tinyint(1) NOT NULL DEFAULT 0,
    is_active tinyint(1) NOT NULL DEFAULT 1,
    expiry_at datetime NOT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW() ON UPDATE NOW(),
)
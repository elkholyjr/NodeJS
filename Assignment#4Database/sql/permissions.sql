CREATE USER 'store_manager'@'localhost'
IDENTIFIED BY 'StrongPassword123!';

GRANT SELECT, INSERT, UPDATE
ON RetailStore.*
TO 'store_manager'@'localhost';


REVOKE UPDATE
ON RetailStore.*
FROM 'store_manager'@'localhost';



GRANT DELETE
ON RetailStore.Sales
TO 'store_manager'@'localhost';
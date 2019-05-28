-- Change DELIMITER to $$
DELIMITER $$
-- Create customer_update_account stored procedure
CREATE PROCEDURE shopping_cart_update(IN inItemId VARCHAR(36), IN inQuantity INT)
BEGIN
  IF inQuantity > 0 THEN
    UPDATE shopping_cart
    SET    quantity = inQuantity, added_on = NOW()
    WHERE  item_id = inItemId;
  ELSE
    CALL shopping_cart_remove_product(inItemId);
  END IF;
END$$


-- Change back DELIMITER to ;
DELIMITER ;
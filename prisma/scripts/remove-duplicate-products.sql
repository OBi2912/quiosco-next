-- Eliminar productos duplicados (mismo name, image, categoryId), manteniendo el de menor id
-- Primero: eliminar OrderProducts que referencian los productos duplicados que vamos a borrar
DELETE FROM "OrderProducts"
WHERE "productId" IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name, image, "categoryId" ORDER BY id) as rn
    FROM "Product"
  ) sub WHERE rn > 1
);

-- Segundo: eliminar los productos duplicados
DELETE FROM "Product"
WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY name, image, "categoryId" ORDER BY id) as rn
    FROM "Product"
  ) sub WHERE rn > 1
);

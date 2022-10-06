# Assymetric
- Cambios Internos
    1. Se creo el método protegido **createPadding**
- Cambios Externos
    1. Se agrego **paddingSetting** como nuevo parámetro para *FastyCryptAssymetric*. Su función es la de permitir al usuario final decidir el mecanismo que desee para implementar complejidad a la seguridad de los mensajes relacionados con el padding, permitiendo seleccionar el tamaño minimo y maximo de padding que puede agregarse en cada mensaje de forma aleatoria asi como permitir decidir si quiere un algoritmo mas seguro para el generador de padding que se agrega junto a los mensanjes para acomplejarlos y permitir el paso a salidas de mayor complejidad.

# Types
 1. Se agregó un nuevo tipo de dato: **IPaddingSettings**

# Errores Conocidos
- Problemas de compatibilidad con Jest en Aqu al realizar los test: **Se remplazó o JEST por MOCHA + CHAI**

# Pendientes
- Agregar la documentación de las nuevas implementaciones
- Cambiar la función generadora de paddings mediante "crypto-js": **No se cambiará debido a que la seguridad la garantiza el nonce, en cambio del padding agregado se usa unicamente para generar salidas de tamaños variables, por lo cual es innecesario**
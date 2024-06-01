# Proyecto Final de Computación en Internet

## **Estudiantes**:

 - *Johan Daniel Aguirre Arias*
 - *Alejandro Amu Garcia*
 - *Miguel Angel Gonzales*
 - *Rafaela Sofia Ruiz*

## **Grupo: #1 (Milton Sarria Paja)**

## Descripción del Problema
Nuestro equipo ha sido contratado para desarrollar una tienda en línea para una empresa local. La tienda necesita tener la funcionalidad básica de permitir a los administradores agregar productos y a los clientes comprarlos. 
Además, se debe generar una factura para cada compra realizada por un cliente. La gestión de datos se hace de forma volátil, es decir, permanecen mientras el programa principal se encuentre en ejecución. No es necesario garantizar persistencia de datos.

## Objetivo General
El objetivo de este proyecto es desarrollar una tienda en línea funcional que permita a los administradores gestionar productos y a los clientes realizar compras, generando facturas para cada transacción completada.

## Objetivos Específicos
- Implementar el acceso de los usuarios con permisos específicos para administradores y clientes.
- Crear un sistema para que los administradores puedan agregar nuevos productos al inventario de la tienda.
- Desarrollar una interfaz amigable para que los clientes puedan navegar por los productos disponibles, agregar productos al carrito y realizar compras.
- Generar facturas detalladas para cada compra, incluyendo la descripción de los productos, la cantidad comprada y el precio total.
- Implementar un historial de compras accesible para los clientes.

## Requisitos Funcionales
### Roles de Usuario:
La tienda tendrá dos roles de usuario: Administrador y Cliente.
- El administrador tiene permiso para agregar nuevos productos al inventario de la tienda.
- El cliente puede navegar por los productos disponibles, agregar productos al carrito y realizar una compra.

### Servicios Prestados:
#### Administrador:
- Agregar, eliminar y/o modificar nuevos productos al inventario de la tienda, especificando el nombre del producto, descripción, precio y cantidad disponible.

#### Cliente:
- Registrarse o iniciar sesión en su cuenta de cliente.
- Ver la lista de productos disponibles en la tienda.
- Agregar productos al carrito de compras.
- Realizar una compra, generando una factura que incluya los detalles de los productos comprados, la cantidad y el precio total.
- Ver el historial de compras anteriores.

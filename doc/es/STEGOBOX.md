## Clase StegoBox

La clase [StegoBox](../../src/core/StegoBox.mjs) es la abstracción máxima del concepto. Consta de una serie de métodos que deben implementar todas las clases herederas: encriptar, desencriptar, configurar ...

En el siguiente esquema, se ilustra las distintas clases que pueden surgir (no todas) aplicando algoritmos sobre imágenes como LSB ('replacement') secuencial o aleatorio o el MSB con fines didácticos:

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" src="../img/sealed_6.png?raw=true"></a></p>

Por otro lado tenemos el **contexto** de cada caja de cifrado. Este contexto construye una instancia de la aplicación, con todos los componente necesarios. Por ejemplo LSB-Random necesita una semilla para obtener píxeles mediante un PRNG (Pseudo-Random Number Generator) mientras que LSB-Secuencial no; el contexto es el encargado de construir estos elementos en pantalla, según la necesidad de la caja.
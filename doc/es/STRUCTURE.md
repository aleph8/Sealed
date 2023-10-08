## Estructura de Sealed

La aplicación tiene una estructura modular, de forma que en el desarrollo de nuevas características se pueden reutilizar diversos elementos o clases lo que agiliza el desarrollo y permite abstraer la estructura de la aplicación. 

La aplicación se puede dividir en dos grandes bloques:

+ **Toolbox**: este bloque se encarga de realizar las transformaciones necesarias en los datos para pasarla a la StegoBox. Estos datos se moldean acorde a las opciones elegidas por el usuario y finalemente se transforman a un formato en particular para el proceso de encriptado.

+ **StegoBox**: objeto que recibe los datos a encriptar procesados, y se encarga de aplicar un algoritmo a un estegomedio determinado.Finalmente devuelve el estegomedio encriptado o la información oculta en este.

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" src="../img/sealed_5.png?raw=true"></a></p>


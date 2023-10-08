## Structure of Sealed

The application has a modular structure, so that in the development of new features various elements or classes can be reused, which speeds up the development and allows to abstract the structure of the application. 

The application can be divided into two large blocks:

+ **Toolbox**: this block is in charge of performing the necessary transformations on the data to pass it to the StegoBox. These data are shaped according to the options chosen by the user and finally transformed into a particular format for the encryption process.

+ **StegoBox**: object that receives the processed data to be encrypted, and is responsible for applying an algorithm to a given stegomedium. Finally it returns the encrypted stegomedium or the information hidden in it.

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" src="../img/sealed_5.png?raw=true"></a></p>

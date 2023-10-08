## StegoBox class

The [StegoBox](../../src/core/StegoBox.mjs) class is the ultimate abstraction of the concept. It consists of a number of methods that all inheriting classes must implement: encrypt, decrypt, configure ....

The following diagram illustrates the different classes that can arise (not all) by applying algorithms on images such as sequential or random LSB ('replacement') or the MSB for didactic purposes:

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" src="../img/sealed_6.png?raw=true"></a></p>


On the other hand we have the **context** of each encryption box. This context builds an instance of the application, with all the necessary components. For example LSB-Random needs a seed to obtain pixels by means of a PRNG (Pseudo-Random Number Generator) while LSB-Sequential does not; the context is in charge of building these elements on screen, according to the need of the box.
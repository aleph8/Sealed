# Sealed

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" width="250" height="250" src="src/img/sealed.svg?raw=true"></a></p>

<h2 align="center"> A web based steganography toolkit </h2>

<p align="center"><img src="https://img.shields.io/badge/version-Alpha_1.0-blue"/> <img src="https://img.shields.io/badge/project-documented-success?style=flat-square"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-Creative Commons 4.0-informational?style=flat-square"/></a></p>

---

Sealed is an open source and simple app to work with complex steganography algorithms from our web browser on any platform. It is intended to serve as a didactic application as well as use by the analyst without having to deal with the complications of the algorithms, serving this application as a toolbox.

This project is a challenge, as we must take into account the limitations of the browser and optimize the existing algorithms to be able to apply them to any client, despite working with images, videos, documents ... it's exciting!

## Live Demo

Sealed is currently in an ALPHA version given to the community by the strength of the Open Source movement.

In no way should it be considered as a final product, a finished product and therefore does not offer any guarantee of its performance. To improve the application you can contribute!

<br>

[You can try an online demo here!](https://alejandrogp.com/sealed)

<br>

**Let it be sealed!**

## How it works

First of all, we need a 'container' or stegomedio, which can be anything from a photograph to a pdf file (currently the application only supports images as stegomedio).

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" width="600" src="doc/img/sealed_1.png?raw=true"></a></p>

Subsequently a data to hide in this medium, which can be a message or a file.

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" width="600" src="doc/img/sealed_2.png?raw=true"></a></p>

Once this is done, we can choose different methods, or modes of operation, including in some cases a secret key.

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" width="600" src="doc/img/sealed_3.png?raw=true"></a></p>

Finally we encrypt (or decrypt) the stegomedia with our secret message. The encrypted image will be automatically downloaded.

<p align="center"><a href="https://alejandrogp.com/sealed"><img hspace="15" width="600" src="doc/img/sealed_4.png?raw=true"></a></p>

In case the 'secret' has more information than can be sealed, the app will give an error.

Sealed has a modular design. That is, the initial message goes through a filter that applies a series of transformations (Toolbox) before passing the content to the 'StegoBox' which, given the container and the content to be sealed, applies the corresponding algorithm with a configuration.

For more information take a look at the [documentation](doc/README.md).

## Contributing

The only things you need to know are JS, CSS and HTML !!!

It is a large scale project so there are a multitude of tasks such as:

+ Algorithm optimization.

+ Improvements in UX and UI.

+ Incrementar el número de StegoBoxes y hacer nuevos algoritmos.

+ Improving existing algorithms.

+ Review contexts and optimize their use.

+ Performing new operations with the Toolbox, such as adding symmetric cryptography with AES.

+ New features.

Thanks to its design, there are a number of guidelines when creating a new StegoBox with a new algorithm, which facilitates development.

## LICENSE

 <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://alejandrogp.com/sealed">Sealed</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://alejandrogp.com">Alejandro García </a> is licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p> 
const axios = require('axios');



    const url = 'http://localhost:5000'
    //MINT
    axios.post(url + `/distribuciones`, {
        nombre_distribucion: 'Mint',
        fecha_ultima_version: '06/27/2020',
        licencia:'GPLv3',
        descripcion: 'Linux Mint es una distribución basada en Ubuntu cuya meta es proveer una experiencia más completa lista para usarse mediante la inclusión de complementos del navegador, códecs multimedia, soporte de reproducción de DVD, Java y otros componentes. También agrega un escritorio y menús a la medida, varias herramientas de configuración únicas y una interfaz de instalación de paquetes basada en red. ',
        estado: 1,
        categoria: 'Beginner',
        origen: 'Irlanda',
        idiomas: 'Multilingüe ',
        requerimientos: 'Procesador: 700 MHz, Memoria: 512 MB - 1 GB, Disco Duro: 5 GB - 10 GB',
        historia: `Los inicios de Mint se dan a mediados del 2006 con una versión beta llamada Ada, el propósito de este grupo (Grupo Mint) por crear una nueva distro de Linux era el tener una distro elegante, potente y principalmente que fuese fácil de usar.
        Prácticamente, Mint está basado en Ubuntu. Ubuntu es una distro que a su vez está basada en Debian. El grupo Mint también ha liberado unas versiones que están basadas en Debian específicamente (LMDE).
        `,
        arquitectura: 'x86_64',
        interfaz_grafica: 'MATE, Cinnamon, XFCE',
        sistema_gestion_paquetes: 'dpkg',
        metodo_actualizacion: 'APT',
        versiones: 'Focal, Bionic, Xenial, Buster',
        url_distribucion: 'https://www.mint.com/',
        url_documentacion: 'https://linuxmint-installation-guide.readthedocs.io/es/latest/',
        url_instalacion: 'https://linuxmint-installation-guide.readthedocs.io/es/latest/install.html',
    }).then(
        respuesta => {
            console.log(respuesta)
        }
    ).catch(
        error => {
            console.log(error);
        }
    )
    //ELEMENTARY
    axios.post(url + `/distribuciones`, {
        nombre_distribucion: 'Elementary',
        fecha_ultima_version:'05/03/2020',
        licencia:'GPLv3',
        descripcion: 'Elementary OS es una distribución de escritorio basada en Ubuntu. Algunas de sus características más interesantes incluyen un nuevo GTK+ y temas para íconos en GNOME, el navegador de red Midori, nuevas aplicaciones desarrolladas por ellos mismos (como Dexter, una agenda y Postler, un cliente de correo) así como Nautilus Elementary, un gestor simple de archivos',
        estado: '1',
        categoria: 'Beginner',
        origen: 'Estados Unidos',
        idiomas: 'Multilingüe ',
        requerimientos: 'Procesador: Intel i3 o dual-core de 64 bits, Memoria: 1 GB, Disco Duro: 15 GB',
        historia: '',
        arquitectura: 'x86_64',
        interfaz_grafica: 'Pantheon ',
        sistema_gestion_paquetes: 'dpkg',
        metodo_actualizacion: 'apt-get (Ubuntu)',
        versiones: 'Hera, Juno, Loki, Freya, Luna, Jupiter',
        url_distribucion: 'https://elementary.io/es/',
        url_documentacion: 'https://github.com/elementary/website/blob/master/docs/learning-the-basics.md',
        url_instalacion: 'https://elementary.io/es/docs/installation#choose-operating-system',
    }).then(
        respuesta => {
            console.log(respuesta)
        }
    ).catch(
        error => {
            console.log(error);
        }
    )

    //ARCH
    axios.post(url + `/distribuciones`, {
        nombre_distribucion: 'Arch',
        fecha_ultima_version:'05/01/2020',
        licencia:'GPL',
        descripcion: 'Arch Linux es una distribución de Linux desarrollada de forma independiente y optimizada para procesadores i686- y x86_64 dirigida a usuarios de Linux competentes. Usa "pacman", su gestor de paquetes desarrollado por ellos mismos para proveer de actualizaciones a las aplicaciones más nuevas con completo rastreo de dependencias. Arch puede ser instalado desde una imagen de CD o vía un servidor FTP.',
        estado: '1',
        categoria: 'Pro',
        origen: 'Canadá',
        idiomas: 'Ingles, Español',
        requerimientos: 'Procesador: 450 MHz, Memoria: 256, Disco Duro: 1GB',
        historia: 'udd Vinet comenzó el desarrollo de Arch Linux a principios del año 2001 y su primera versión fue publicada el 11 de marzo de 2002. Arch Linux fue inspirado en la elegancia y simplicidad de Slackware y CRUX. Además de la creación de la distribución, Judd también creó un programa que permitía instalar, remover y actualizar paquetes. A finales del año 2007, Judd Vinet se retiró de la participación activa como desarrollador y cedió el proyecto a Aaron Griffin el cual continúa como líder en la actualidad.',
        arquitectura: 'x86_64',
        interfaz_grafica: 'Cinnamon, GNOME',
        sistema_gestion_paquetes: 'Pacman',
        metodo_actualizacion: 'Pacman',
        versiones: '',
        url_distribucion: 'https://www.archlinux.org/',
        url_documentacion: 'https://wiki.archlinux.org/index.php/Table_of_contents',
        url_instalacion: 'https://wiki.archlinux.org/index.php/installation_guide',
    }).then(
        respuesta => {
            console.log(respuesta)
        }
    ).catch(
        error => {
            console.log(error);
        }
    )

    //MANJARO
    axios.post(url + `/distribuciones`, {
        nombre_distribucion: 'Manjaro',
        fecha_ultima_version:'06/10/2020',
        nombre_padre: 'Arch',
        licencia:'GPL',
        descripcion: `Manjaro Linux es una distribución basada en Arch Linux orientada al escritorio y amigable con el usuario. Algunas de sus características más destacadas incluyen un proceso de instalación intuitivo, autodetección de equipo físico, "scripts" especiales del bash para manejar controladores gráficos y opciones extras de configuración del escritorio. Manjaro Linux viene en tres ediciones presentando los escritorios de Xfce, GNOME 3 (con el intérprete de comandos Cinnamon) y KDE.`,
        estado: 1,
        categoria: 'Intermediate',
        origen: 'Austria, Alemania, Francia',
        idiomas: 'Multilingüe (Inglés, francés y alemán)',
        requerimientos: '1 GB RAM, 1 GHz Processor, 30 GB free hard disk size,Bootable media ( ISO, DVD &s USB drive), Internet Connection (Opcional)',
        historia: 'Hasta mediados del año 2015 Manjaro Linux todavía se mantenía en estado beta, pero a partir de septiembre de ese año abandona dicha fase con el cambio de nomenclatura en la numeración de las versiones (Manjaro Linux 15.09 "Bellatrix") y con los elementos claves del sistema final —como el instalador gráfico (Calamares 2.2), el gestor de paquetes, el detector de hardware (mhwd) y el gestor de configuraciones— ya implementados. Las ediciones actuales ya se encuentran en un estado altamente usable y muy estable para el usuario final. En consecuencia, las versiones 18.X ya son lo suficientemente maduras siendo por tanto más sencillas de utilizar.',
        arquitectura: 'x86_64',
        interfaz_grafica: 'GNOME, KDE, Xfce',
        sistema_gestion_paquetes: 'Pacman, snap',
        metodo_actualizacion: 'pacman',
        versiones: 'Lysia, Kyria, Juhraya,Illyria, Hakoila, Gellivara, Fringilla, Ellada',
        url_distribucion: 'https://manjaro.org/',
        url_documentacion: 'https://manjaro.org/support/userguide/',
        url_instalacion: 'https://manjaro.org/download/'
    }).then(
        respuesta => {
            console.log(respuesta.data);
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )
    //CentOS
    axios.post(url + `/distribuciones`, {
        nombre_distribucion: 'CentOS',
        fecha_ultima_version:'05/15/2020',
        licencia:'GPL',
        descripcion: 'Es un sistema operativo de código abierto, basado en la distribución Red Hat Enterprise Linux, operándose de manera similar, y cuyo objetivo es ofrecer al usuario un software de "clase empresarial" gratuito. Se define como robusto, estable y fácil de instalar y utilizar.',
        estado: '1',
        categoria: 'Intermediate',
        origen: 'Estados Unidos',
        idiomas: 'Multilingüe',
        requerimientos: 'Memoria: 1 GB, Disco Duro: 20 GB, Procesador: x86-64',
        historia: `CentOS sigue un modelo de desarrollo de software libre y su lanzamiento inicial se produjo el 14 de mayo de 2004.
        Se trata de un operativo que está basado en Red Hat Enterprise Linux. Es una base que está compuesta de software libre y código abierto. Aún así, Red Hat libera el código fuente de forma pública bajo los términos de la Licencia pública general de GNU (y de otras). De ahí a que los desarrolladores de CentOS utilizaran dicho código fuente como base para crear un producto final tan potente.`,
        arquitectura: 'x86_64',
        interfaz_grafica: 'GNOME, KDE',
        sistema_gestion_paquetes: 'Yum',
        metodo_actualizacion: '',
        versiones: 'CentOS 3,4,5,6,7,8',
        url_distribucion: 'https://www.centos.org/',
        url_documentacion: 'https://wiki.centos.org/',
        url_instalacion: 'https://docs.centos.org/en-US/centos/install-guide/',
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )
    //Creacion de 2 usuarios
    axios.post(url + `/usuarios`,{
        alias: 'Tefa',
        correo: 'esgarciag@correo.udistrital.edu.co'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )

    axios.post(url + `/usuarios`,{
        alias: 'Yego',
        correo: 'yego@hotmail.com'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )

    axios.post(url + `/distribuciones/Mint/comentarios`, {
        correo: 'yego@hotmail.com',
        comentario:'Una distribución de muy fácil uso para principiantes como yo :)'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )
    axios.post(url + `/distribuciones/Mint/comentarios`, {
        correo: 'esgarciag@correo.udistrital.edu.co',
        comentario:'Me pareció muy fácil de aprender a utilizar'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )
    axios.post(url + `/distribuciones/Elementary/comentarios`, {
        correo: 'yego@hotmail.com',
        comentario:'Tiene una interfaz diferente, sin embargo, su rendimiento no es el esperado'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )
    // ETIQUETAS
    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Facil_uso'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Dificil_uso'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Buen_rendimiento'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Mal_rendimiento'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Bonita_interfaz'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Mala_interfaz'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Problema_controladores'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Estable'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Inestable'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Bugs'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Instalacion_dificil'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Instalacion_sencilla'
    });

    axios.post(url + '/etiquetas', {
        nombre_etiqueta: 'Personalizable'
    });

    axios.post(url + `/distribuciones/Elementary/etiquetas`,{
        etiqueta_nombre: 'Bugs'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )

    axios.post(url + `/distribuciones/Elementary/etiquetas`,{
        etiqueta_nombre: 'Bonita_interfaz'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )

    axios.post(url + `/distribuciones/Manjaro/etiquetas`,{
        etiqueta_nombre: 'Instalacion_dificil'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )

    axios.post(url + `/distribuciones/Arch/etiquetas`,{
        etiqueta_nombre: 'Personalizable'
    }).then(
        respuesta => {
            console.log(respuesta.data)
        }
    ).catch(
        error => {
            console.log(error.data);
        }
    )

    axios.put(url+ `/distribuciones/Elementary/etiquetas`,{
        nombre_etiqueta: 'Bugs'
    });

    axios.put(url+ `/distribuciones/Elementary/etiquetas`,{
        nombre_etiqueta: 'Bugs'
    });

    axios.put(url+ `/distribuciones/Elementary/etiquetas`,{
        nombre_etiqueta: 'Bugs'
    });

    axios.put(url+ `/distribuciones/Manjaro/etiquetas`,{
        nombre_etiqueta: 'Instalacion_dificil'
    });

    axios.put(url+ `/distribuciones/Manjaro/etiquetas`,{
        nombre_etiqueta: 'Instalacion_dificil'
    });


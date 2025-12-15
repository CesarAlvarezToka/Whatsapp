
Page({
  data: {
    webviewUrl: '',
    isLoading: true
  },

  async onLoad(options) {
    // Guardar options para poder usarlas en onRetry
    this.options = options;

    // Debug: mostrar todos los parámetros recibidos
    console.log('=== DEBUG h5 onLoad ===');
    console.log('options completo:', JSON.stringify(options, null, 2));
    console.log('options.query:', options.query);
    console.log('options.url:', options.url);
    console.log('Tipo de options:', typeof options);
    console.log('Keys de options:', Object.keys(options || {}));

    // En Alipay Mini Programs, los parámetros pueden estar en options.query
    // o directamente en options dependiendo de cómo se pase la URL
    if (options && options.query) {
      console.log('options.query keys:', Object.keys(options.query));
      console.log('options.query valores:', Object.values(options.query));
    }

    this.setData({
      isLoading: true
    });

    // En Alipay Mini Programs, los parámetros de query pueden estar en:
    // 1. options.query.url (más común)
    // 2. options.url (alternativo)
    // 3. options.query como objeto con propiedades
    let urlParam = null;

    // Intentar diferentes formas de acceder al parámetro url
    if (options && options.query) {
      // Primero intentar options.query.url
      if (options.query.url) {
        urlParam = options.query.url;
        console.log('URL encontrada en options.query.url');
      } else {
        // Si no está en .url, buscar en todas las propiedades de query
        const queryKeys = Object.keys(options.query);
        console.log('Buscando URL en query keys:', queryKeys);
        for (let key of queryKeys) {
          const value = options.query[key];
          if (typeof value === 'string' && (value.startsWith('http') || value.includes('%'))) {
            urlParam = value;
            console.log(`URL encontrada en options.query.${key}`);
            break;
          }
        }
      }
    }

    // Si no se encontró en query, intentar directamente en options
    if (!urlParam && options && options.url) {
      urlParam = options.url;
      console.log('URL encontrada en options.url');
    }

    // Último intento: buscar en todas las propiedades de options
    if (!urlParam && options && typeof options === 'object') {
      const allKeys = Object.keys(options);
      console.log('Buscando URL en todas las propiedades:', allKeys);
      for (let key of allKeys) {
        const value = options[key];
        if (typeof value === 'string' && (value.startsWith('http') || value.includes('%'))) {
          urlParam = value;
          console.log(`URL encontrada en options.${key}`);
          break;
        }
      }
    }

    console.log('urlParam encontrado:', urlParam);

    if (urlParam) {
      try {
        // Decodificar la URL si viene codificada
        let webviewUrl = urlParam;

        // Intentar decodificar solo si parece estar codificada
        if (urlParam.includes('%')) {
          webviewUrl = decodeURIComponent(urlParam);
        }

        console.log('URL final para webview:', webviewUrl);

        // Validar que sea una URL válida
        if (!webviewUrl.startsWith('http://') && !webviewUrl.startsWith('https://')) {
          throw new Error('URL inválida: debe comenzar con http:// o https://');
        }

        this.setData({
          webviewUrl: webviewUrl,
          isLoading: false
        });
        console.log('Webview URL establecida correctamente');
        return;
      } catch (error) {
        console.error('Error al procesar URL directa:', error);
        this.setData({
          isLoading: false,
          webviewUrl: ''
        });
        my.showToast({
          content: 'Error al cargar el servicio. Por favor, intenta nuevamente.',
          type: 'fail'
        });
        return;
      }
    }

  },

  // Reintentar carga
  onRetry() {
    this.setData({ isLoading: true });
    // Recargar la página
    this.onLoad(this.options);
  }


});

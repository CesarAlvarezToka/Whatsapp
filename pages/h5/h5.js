
Page({
  data: {
    webviewUrl: '',
    isLoading: true
  },

  async onLoad(options) {
    this.options = options;

  
    this.setData({
      isLoading: true
    });

    if (options.url) {
      try {
        const webviewUrl = decodeURIComponent(options.url);
        this.setData({
          webviewUrl: webviewUrl,
          isLoading: false
        });
        return;
      } catch (error) {
        console.error('Error al procesar URL directa:', error);
        this.setData({
          isLoading: false
        });
        my.showToast({ 
          content: 'Error al cargar el servicio. Por favor, intenta nuevamente.',
          type: 'fail'
        });
        return;
      }
    }

  },
});

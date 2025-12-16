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
        console.error('Error processing direct URL:', error);
        this.setData({
          isLoading: false
        });
        my.showToast({
          content: 'Error loading service. Please try again.',
          type: 'fail'
        });
        return;
      }
    }

  },
});
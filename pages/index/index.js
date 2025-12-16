Page({
  data: {
    isLoading: true

  },

  onLoad(options) {

  },

  // Handle button tap and redirect to TokaTravel
  async handleWhatsApp() {

    const whatsappUrl = 'https://wa.me/525597950000';

    const encodedUrl = encodeURIComponent(whatsappUrl);

    my.navigateTo({
      url: `/pages/h5/h5?url=${encodedUrl}`

    });

  },

  // Handle image error
  handleImageError() {
    console.log('Error loading service image');
    my.showToast({ content: 'Error loading image' });

  }
});
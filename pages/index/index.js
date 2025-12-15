
Page({
  data: {
    isLoading: true
  },
  
  onLoad(options) {
  },
  
  // Manejar tap del botón y redirigir a TokaTravel
  async handleWhatsApp() {

    const whatsappUrl = 'https://wa.me/525597950000';
    const encodedUrl = encodeURIComponent(whatsappUrl);

      my.navigateTo({
        url: `/pages/h5/h5?url=${encodedUrl}`
      });
  },

  // Manejar error de imagen
  handleImageError() {
    console.log('Error al cargar imagen del servicio');
    my.showToast({ content: 'Error al cargar imagen' });
  }
});

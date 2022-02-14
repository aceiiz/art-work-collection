

export const environment = {
  production: false,
  serverUrl: 'https://api.artic.edu/api/v1',
  imgUrl: 'https://www.artic.edu/iiif/2',
  dateFormat: 'DD/MM/YYYY',
  yearFormat: 'YYYY',
  services: {
    artWork: {
      url: '/artworks',
      getById: '/{id}'
    }
  }
};

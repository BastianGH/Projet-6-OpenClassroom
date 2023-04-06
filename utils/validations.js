exports.validateSauce = (sauceObject, file) => {
    Object.keys(sauceObject).forEach(key => {
      let value = sauceObject[key];
      const alphanum = /^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\d\s]+$/;
      if ((key === 'name' || key === 'manufacturer' || key === 'description' || key === 'mainPepper') && !alphanum.test(value)) {
        throw new Error('Le nom le vendeur, la description et le piment principal ne doivent contenir que des lettres et des chiffres.');
      }
      if ((key === 'name' || key === 'manufacturer' || key === 'mainPepper') && (value.length < 3 || value.length > 50) ) {
        throw new Error('Les noms doivent contenir entre 3 et 50 caractères.');
      }
      if (key === 'description' && (value.length < 3 || value.length > 500) ) {
        throw new Error('La decription doit contenir entre 3 et 500 caractères.');
      }
      if (key === 'heat' && isNaN(value)) {
        throw new Error('Le champ doit contenir uniquement des chiffres.');
      }
      if (key === 'heat') {
        sauceObject[key] = parseInt(value);
      }
    });
  
    if (file) {
        if (!/^[a-zA-Z0-9._-]+$/.test(file)) {
        throw new Error('Nom de fichier invalide.');
        }
    
        const extension = file.split('.').pop();
    
        if (!['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
        throw new Error('Format de fichier non pris en charge.');
        }
    }
  };
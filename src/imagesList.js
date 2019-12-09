// const IMAGE_PATH = process.env.PUBLIC_URL + '/images';

// export const images = {
//   reka: {
//     // black_matt: `${IMAGE_PATH}/reka/black_matt.png`,
//     // black_shine: `${IMAGE_PATH}/reka/black_shine.png`,
//     black_matt: `${IMAGE_PATH}/reka/black_matt-2.png`,
//     black_shine: `${IMAGE_PATH}/reka/black_shine-2.png`,
//     gray_matt: `${IMAGE_PATH}/reka/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/reka/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/reka/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/reka/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/reka/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/reka/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/reka/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/reka/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/reka/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/reka/white_shine.png`
//   },
//   nakladkaKolko: {
//     black_matt: `${IMAGE_PATH}/nakladkaKolko/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/nakladkaKolko/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/nakladkaKolko/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/nakladkaKolko/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/nakladkaKolko/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/nakladkaKolko/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/nakladkaKolko/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/nakladkaKolko/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/nakladkaKolko/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/nakladkaKolko/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/nakladkaKolko/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/nakladkaKolko/white_shine.png`
//   },
//   kolkoPuste: {
//     black_matt: `${IMAGE_PATH}/kolkoPuste/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/kolkoPuste/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/kolkoPuste/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/kolkoPuste/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/kolkoPuste/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/kolkoPuste/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/kolkoPuste/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/kolkoPuste/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/kolkoPuste/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/kolkoPuste/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/kolkoPuste/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/kolkoPuste/white_shine.png`
//   },
//   elementX: {
//     black_matt: `${IMAGE_PATH}/elementX/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/elementX/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/elementX/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/elementX/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/elementX/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/elementX/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/elementX/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/elementX/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/elementX/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/elementX/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/elementX/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/elementX/white_shine.png`
//   },
//   szufladka: {
//     black_matt: `${IMAGE_PATH}/szufladka/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/szufladka/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/szufladka/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/szufladka/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/szufladka/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/szufladka/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/szufladka/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/szufladka/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/szufladka/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/szufladka/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/szufladka/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/szufladka/white_shine.png`
//   },
//   przyPrzycisku: {
//     black_matt: `${IMAGE_PATH}/przyPrzycisku/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/przyPrzycisku/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/przyPrzycisku/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/przyPrzycisku/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/przyPrzycisku/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/przyPrzycisku/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/przyPrzycisku/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/przyPrzycisku/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/przyPrzycisku/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/przyPrzycisku/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/przyPrzycisku/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/przyPrzycisku/white_shine.png`
//   },
//   malyPrzycisk: {
//     black_matt: `${IMAGE_PATH}/malyPrzycisk/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/malyPrzycisk/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/malyPrzycisk/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/malyPrzycisk/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/malyPrzycisk/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/malyPrzycisk/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/malyPrzycisk/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/malyPrzycisk/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/malyPrzycisk/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/malyPrzycisk/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/malyPrzycisk/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/malyPrzycisk/white_shine.png`
//   },
//   podSzufladka: {
//     black_matt: `${IMAGE_PATH}/podSzufladka/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/podSzufladka/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/podSzufladka/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/podSzufladka/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/podSzufladka/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/podSzufladka/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/podSzufladka/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/podSzufladka/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/podSzufladka/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/podSzufladka/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/podSzufladka/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/podSzufladka/white_shine.png`
//   },
//   nakladkaTyl: {
//     black_matt: `${IMAGE_PATH}/nakladkaTyl/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/nakladkaTyl/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/nakladkaTyl/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/nakladkaTyl/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/nakladkaTyl/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/nakladkaTyl/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/nakladkaTyl/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/nakladkaTyl/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/nakladkaTyl/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/nakladkaTyl/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/nakladkaTyl/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/nakladkaTyl/white_shine.png`
//   },
//   duzyPrzycisk: {
//     black_matt: `${IMAGE_PATH}/duzyPrzycisk/black_matt.png`,
//     black_shine: `${IMAGE_PATH}/duzyPrzycisk/black_shine.png`,
//     gray_matt: `${IMAGE_PATH}/duzyPrzycisk/gray_matt.png`,
//     gray_shine: `${IMAGE_PATH}/duzyPrzycisk/gray_shine.png`,
//     khaki_matt: `${IMAGE_PATH}/duzyPrzycisk/khaki_matt.png`,
//     khaki_shine: `${IMAGE_PATH}/duzyPrzycisk/khaki_shine.png`,
//     orange_matt: `${IMAGE_PATH}/duzyPrzycisk/orange_matt.png`,
//     orange_shine: `${IMAGE_PATH}/duzyPrzycisk/orange_shine.png`,
//     pink_matt: `${IMAGE_PATH}/duzyPrzycisk/pink_matt.png`,
//     pink_shine: `${IMAGE_PATH}/duzyPrzycisk/pink_shine.png`,
//     white_matt: `${IMAGE_PATH}/duzyPrzycisk/white_matt.png`,
//     white_shine: `${IMAGE_PATH}/duzyPrzycisk/white_shine.png`
//   },
// };


const loadImage = url => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = resolve(img);
  img.onerror = reject(img);
  img.src = url;
});

export default async function loadAssets(assets = {}) {
  const loadedImages = {};

  try {
    for (let key in assets) {
      loadedImages[key] = {};
  
      for (let image in assets[key]) {
        let img = await loadImage(assets[key][image]);
        loadedImages[key][image] = img;
      }
    }

    return loadedImages;
  } 
  catch(e) {
    return new Error('Failed to load assets');
  }
} 
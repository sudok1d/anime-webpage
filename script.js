async function fetchData() {
    try {
        const animeIds = ['322', '13601', '790', '43299' ]
        const baseUrl = 'https://api.jikan.moe/v4/anime'
        //paradise kiss, psycho pass, ergo proxy, wep 
        const animeData = [];

        const promises = animeIds.map(async (id) => {
          const url = `${baseUrl}/${id}`;
          const response = await fetch(url);
    
          if (!response.ok) {
            throw new Error(`Error fetching anime data for ID ${id}: ${response.status}`);
          }
    
          const data = await response.json();
          return data;
        });
    
        animeData.push(...await Promise.all(promises));
    
        console.log(animeData);

        const imageContainer = document.querySelector('.imageContainer')
        animeData.forEach((anime) => {
            const imageUrl = anime.data.images.jpg.large_image_url
            const image = new Image()
            image.src = imageUrl
            imageContainer.appendChild(image)

        })

          console.log(mappedData);
    }

    catch (error) {
        console.error(error)
    }
}

fetchData()


const imageElement = document.getElementById('currentImage');
const nextButton = document.getElementById('nextButton');
const imagePaths = [ 
    'imgs/parakiss1.webp',
    'imgs/psychopass1.jpg'
];

let currentImageIndex = 0;

function changeImage() {
    imageElement.src = imagePaths[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
    }

nextButton.addEventListener('click', changeImage);

changeImage();


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

            image.addEventListener('click', () => {
                const synopsis = anime.data.synopsis;
                showSynopsis(image, synopsis);
            });

        })
         
    }

    catch (error) {
        console.error(error)
    }
}

function showSynopsis(image, synopsis) {
    const synopsisDiv = document.createElement('div')
    synopsisDiv.classList.add('synopsisContainer')

    const synopsisText = document.createElement('p')
    synopsisText.textContent = synopsis

    synopsisDiv.appendChild(synopsisText)

    image.parentNode.insertBefore(synopsisDiv, image.nextSibling);
}

fetchData()

const imageElement = document.getElementById('currentImage');
const textElement = document.getElementById('currentText');
const nextButton = document.getElementById('nextButton');

const animeData = [ 
    {
        imagePath: 'imgs/parakiss1.webp',
        title: 'Paradise Kiss'
    },

    {
        imagePath: 'imgs/psychopass1.avif',
        title: 'Psycho Pass'
    }
];


let currentItemIndex = 0;

function changeDetails() {
    imageElement.src = animeData[currentItemIndex].imagePath;
    textElement.textContent = animeData[currentItemIndex].title;
    currentItemIndex = (currentItemIndex + 1) % animeData.length;
    }

nextButton.addEventListener('click', changeDetails);

changeDetails();



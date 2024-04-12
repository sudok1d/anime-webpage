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

        const container = document.querySelector('.imageContainer')
        animeData.forEach((anime) => {
            const imageUrl = anime.data.images.jpg.large_image_url
            const image = new Image()
            image.src = imageUrl
            container.appendChild(image)

            image.addEventListener('click', () => {
                const synopsis = anime.data.synopsis;
                const title = anime.data.title;
                showSynopsis(image, synopsis, title, container);
            });

        })
         
    }

    catch (error) {
        console.error(error)
    }
}

function showSynopsis(clickedImage, synopsis, title, container) {
    const allImages = container.querySelectorAll('img');
    allImages.forEach((image) => {
        if (image !== clickedImage) {
            if (image.style.display === 'none') {
                image.style.display = 'block'; 
            } 
            
            else {
                image.style.display = 'none'; 
            }
        }
    });

   
    let synopsisDiv = clickedImage.nextElementSibling
    if (!synopsisDiv || synopsisDiv.className !== 'synopsisContainer') {

        synopsisDiv = document.createElement('div')
        synopsisDiv.classList.add('synopsisContainer')

        const synopsisTitle = document.createElement('p')
        synopsisTitle.classList.add('synopsisTitle');
        synopsisTitle.textContent = title

        const synopsisText = document.createElement('p')
        synopsisText.textContent = synopsis

        synopsisDiv.appendChild(synopsisTitle)
        synopsisDiv.appendChild(synopsisText)

        container.insertBefore(synopsisDiv, clickedImage.nextSibling);
    }
    
    else {
        synopsisDiv.style.display = synopsisDiv.style.display === 'none' ? 'block' : 'none';
    }
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
        imagePath: 'imgs/psychopass1.webp',
        title: 'Psycho Pass'
    },

    {
        imagePath: 'imgs/ergoproxy1.png',
        title: 'Ergo Proxy'
    },

    {
        imagePath: 'imgs/wep1.jpg',
        title: 'Wonder Egg Priority'
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



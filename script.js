async function fetchData() {
    try {
        const animeIds = ['322', '13601', '790', '43299', '52991', '48849', '440', '338']
        const baseUrl = 'https://api.jikan.moe/v4/anime'
        //paradise kiss, psycho pass, ergo proxy, wep, frieren, sonny boy, rgu, rose of versailles 
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
                const title = anime.data.title_english;
                const year = anime.data.year
                const season = anime.data.season.toUpperCase();
                showSynopsis(image, synopsis, title, year, season, container);
            });
        })    
    }

    catch (error) {
        console.error(error)
    }
}

function showSynopsis(clickedImage, synopsis, title, year, season, container) {
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

        const animeYear = document.createElement('p')
        animeYear.classList.add('animeYear');
        animeYear.textContent = year

        const animeSeason = document.createElement('p')
        animeSeason.classList.add('animeSeason');
        animeSeason.textContent = season

        const synopsisText = document.createElement('p')
        synopsisText.textContent = synopsis

        synopsisDiv.appendChild(synopsisTitle)
        synopsisDiv.appendChild(animeSeason)
        synopsisDiv.appendChild(animeYear)
        synopsisDiv.appendChild(synopsisText)
    
        container.insertBefore(synopsisDiv, clickedImage.nextSibling);
    }
    
    else {
        synopsisDiv.style.display = synopsisDiv.style.display === 'none' ? 'block' : 'none';
    }
}

fetchData()

const navLinks = document.querySelectorAll('.navLink');
const sections = document.querySelectorAll('section');
const clickMe = document.querySelector('clickMe')

navLinks.forEach(navLink => {
    navLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        sections.forEach(section => {
            section.style.display = 'none';
        });

        const targetId = this.getAttribute('href').substring(1);
    
        const targetSection = document.getElementById(targetId);
        targetSection.style.display = 'block';
    });
});

/*---------------*/
// prevent rightclick & drag 
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('dragstart', event => event.preventDefault());


/*---------------*/
// NAVIGATION BAR

const getNavButton = document.querySelector('.navButton');
const getMenuButtonList = document.querySelector('.buttonMenuContainer');
const getDropDownContainer = document.querySelector('.menuButton');

function isMouseLeavingHorizontally(event, element) {
    const rect = element.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right;
}

// HOVER EVENT Computer
getNavButton.addEventListener('mouseover', () => {
    if (!isTouchDevice()) { // is Computer?
        setTimeout(() => {
            getMenuButtonList.style.top = '80px';
        }, 100);
    }
});

getNavButton.addEventListener('mouseleave', (event) => {
    if (!isTouchDevice() && isMouseLeavingHorizontally(event, getNavButton)) { // is Computer and mouse leacing in x?

        setTimeout(() => {
                getMenuButtonList.style.top = '';
        }, 200); 
    }
});

getDropDownContainer.addEventListener('mouseleave', () => {
    if (!isTouchDevice()) { // is Computer?
        
        setTimeout(() => {
                getMenuButtonList.style.top = '';
        }, 200); 
    }
});

// CLICK Event Mobile
let buttonActive = false;

function toggleMenuButton() {
    getNavButton.addEventListener('click', () => {
        if (isTouchDevice()) {
            if (buttonActive) {
                getMenuButtonList.style.top = '';
            } else {
                getMenuButtonList.style.top = '80px';
            }
            buttonActive = !buttonActive; // Toggle status
        }
    });
}

toggleMenuButton(); 

// check if mobile device
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/*---------------*/
//FREEZE SCROLL SNAP (SCROLL ISSUE ANCHOR BUTTONS)
document.querySelectorAll('.anchorLink').forEach(anchor => {
  
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        // temp deactivation of scrollSnapType
        const slider = document.getElementById('slider');
        slider.style.scrollSnapType = 'none';

        // scroll to target
        target.scrollIntoView({ behavior: 'smooth' });

        let scrollTimeout;
        slider.addEventListener('scroll', function onScroll() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                slider.style.scrollSnapType = 'x mandatory';
                slider.removeEventListener('scroll', onScroll);
            }, 100); // adjust the timeout as needed
        });
    });
});

/*---------------*/
// BUTTONS SLIDER

const buttonNext = document.querySelector('.btn-nxt');
const buttonPrevious = document.querySelector('.btn-pre');
const slider = document.querySelector('.topic-slider');
const sliderItems = document.querySelectorAll('.slider-item');

buttonNext.addEventListener('click', () => {
    const sliderVisibleWidth = slider.clientWidth;
    slider.scrollBy({ left: sliderVisibleWidth, behavior: 'smooth' });

    if (slider.scrollLeft + sliderVisibleWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
    }
});

buttonPrevious.addEventListener('click', () => {
    const sliderVisibleWidth = slider.clientWidth;
    slider.scrollBy({ left: -sliderVisibleWidth, behavior: 'smooth' });

    if (slider.scrollLeft === 0) {
        slider.scrollTo({ left: slider.scrollWidth - sliderVisibleWidth, behavior: 'smooth' });
    }
});

/*---------------*/
// HOVER EFFECT SLIDER & CARD ELEMENTS

const hoveredItems = document.querySelectorAll('.report-item, .photos-item, .slider-item');

hoveredItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        const highlightedTexts = item.querySelector('.report-title, .photos-title');
        const hoveredMedia = item.querySelector('.travel-banner, .slider-banner, .photos-banner');
        const highlightedSliderText = item.querySelector('.slider-title');
        //highlightedTexts.style.fontWeight = 'bold'; not used anymore
        if (highlightedTexts) {
          highlightedTexts.style.color = 'hsla(40, 100%, 62%, 1)';
      }
      
        if (highlightedSliderText) {
          highlightedSliderText.style.opacity = '1';
        }

      if (hoveredMedia) {   
          hoveredMedia.style.filter = 'saturate(1)';
          hoveredMedia.style.opacity = '1';
      }

    });

    item.addEventListener('mouseout', () => {
        const highlightedTexts = item.querySelector('.report-title, .photos-title');
        const hoveredMedia = item.querySelector('.travel-banner, .slider-banner, .photos-banner');
        const highlightedSliderText = item.querySelector('.slider-title');
        //highlightedTexts.style.fontWeight = ''; not used anymore
        if (highlightedTexts) {
          highlightedTexts.style.color = '';
      }
      
      if (highlightedSliderText) {
        highlightedSliderText.style.opacity = '0.9';
      }

      if (hoveredMedia || hoveredVideo) {
          hoveredMedia.style.filter = 'saturate(0.4)';
          hoveredMedia.style.opacity = '0.9';
      }

    });
});

/*---------------*/
// TRAVEL REPORT SEARCH INPUT

document.getElementById('searchInput').addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.report-item');

    listItems.forEach(function (entry) {
        const itemText = entry.textContent.toLowerCase();

        if (itemText.includes(searchTerm)) {
            entry.style.display = 'list-item';
            entry.parentNode.style.listStyleType = 'none';
        } else {
            entry.style.display = 'none';
        }
    });
});

/*---------------*/
// TRAVEL REPORT FILTER BY YEAR AND TAG

document.addEventListener("DOMContentLoaded", function() {
    // DROPDOWN FILTER BY YEAR
    var dropdownYearLinks = document.querySelectorAll('.dropdown-content li');
    var dropdownYearButton = document.querySelector('.dropdown button');
  
    dropdownYearLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // verhindert Standardverhalten vom Link (keine URL)
        
        var year = link.textContent.trim(); // get text of link
        dropdownYearButton.textContent = year; // change button text
        toggleFilterByYear(year); // Filter by year
        applyFilters();
      });
    });
  
    // TAG TOGGLE
    var tagElements = document.querySelectorAll('.taglist li');
  
    tagElements.forEach(function(tagElement) {
      tagElement.addEventListener('click', toggleFilterByTag);
    });
    
    // Dropdown "- all -" selection
    var dropdownAllOption = document.querySelector('.dropdown-content li:first-child');
    dropdownAllOption.addEventListener('click', function(event) {
      event.preventDefault();
      dropdownYearButton.textContent = 'Year'; // reset Dropdown-Text
      resetFilterByYear(); 
      applyFilters(); 
    });
});

function toggleFilterByTag() {
    var isActive = this.classList.toggle('active');
    this.style.color = isActive ? 'hsla(190, 38%, 10%, 1)' : '';
    this.style.background = isActive ? 'hsla(188, 59%, 85%, 0.5)' : '';
    this.style.border = isActive ? '0.1vh solid hsla(190, 38%, 10%, 1)' : '';
    applyFilters();
}

function applyFilters() {
    var reportItems = document.querySelectorAll('.reports-grid .report-item');
    var activeTags = document.querySelectorAll('.taglist li.active');
    var activeTagNames = Array.from(activeTags).map(function(activeTag) {
      return activeTag.textContent.trim();
    });
    var selectedYear = document.querySelector('.dropdown button').textContent.trim();
    
    reportItems.forEach(function(reportItem) {
        var isActiveYear = selectedYear === 'Year' || reportItem.classList.contains('year' + selectedYear);
        var isActiveTag = activeTagNames.length === 0 || Array.from(reportItem.querySelectorAll('.content-tag a')).some(function(tagLink) {
            return activeTagNames.includes(tagLink.textContent.trim().substring(1));
        });
        var allActiveTagsPresent = activeTagNames.every(function(activeTagName) {
            return Array.from(reportItem.querySelectorAll('.content-tag a')).some(function(tagLink) {
                return activeTagName === tagLink.textContent.trim().substring(1);
            });
        });
        reportItem.style.display = isActiveYear && isActiveTag && allActiveTagsPresent ? 'block' : 'none'; // Cheack for year and also active tag names
    });
}

function toggleFilterByYear(year) {
    var reportItems = document.querySelectorAll('.reports-grid .report-item');
    reportItems.forEach(function(reportItem) {
        var isActiveYear = year === 'all' || reportItem.classList.contains('year' + year);
        reportItem.style.display = isActiveYear ? 'block' : 'none';
    });
}

function resetFilterByYear() {
    var reportItems = document.querySelectorAll('.reports-grid .report-item');
    reportItems.forEach(function(reportItem) {
        reportItem.style.display = 'block'; // show all repotItems
    });
}

/*--------------------------*/
/* REPORT POPUP PIC GALLERY HEIGHT */

document.addEventListener("DOMContentLoaded", function() {
    function setGalleryImageHeights() {
        const gallery = document.querySelector('.picture-gallery');
        const pics = gallery.querySelectorAll('.tourPic');
        const numPics = pics.length / 2; // 2 columns for each
        const gap = 5; // 10px gap
        const initialHeight = 152; // 152px / offset

        const picHeight = `calc((100vh - ${initialHeight}px - (${gap}px * (${numPics} - 1))) / ${numPics})`;

        pics.forEach(pic => {

            if (window.innerWidth > 1054) {
                    pic.style.height = picHeight;

            } else if (window.innerWidth > 550) {
                    pic.style.height = `calc(${picHeight} / 1.6)`;

            } else{
                    pic.style.height = '28vh';
                }
        });
    }
        setGalleryImageHeights();

    // update heights on window resize
    window.addEventListener('resize', setGalleryImageHeights);
});

/* POPUP CONTENT */
document.addEventListener("DOMContentLoaded", function() {

    // tour informations
    const tours = [
            { tourId: 'oberstdorf1',
              title: 'Oberstdorf im Juni',
              text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro, voluptas id impedit voluptates deserunt asperiores commodi,
                sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro.`,
              videoId: 'https://player.vimeo.com/video/927066427?h=861bc57781',
              picturePath: '01-resources/14-data/tours/23/obstd1/'
            },

            { tourId: 'oberstdorf2',
              title: 'Fischen im Allgäu',
              text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro, voluptas id impedit voluptates deserunt asperiores commodi,
                sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro.`,
              videoId: 'https://player.vimeo.com/video/927052150?h=c38875e347',
              picturePath: '01-resources/14-data/tours/23/obstd2/'
            },

            { tourId: 'meran',
              title: 'Meran im Herbst',
              text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro, voluptas id impedit voluptates deserunt asperiores commodi,
                sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro.`,
              videoId: 'https://player.vimeo.com/video/928711344?h=74dfd5217d',
              picturePath: '01-resources/14-data/tours/23/sdtrl/'
            },
        
            { tourId: 'mittenwald',
              title: 'Am Karwendel in Mittenwald',
              text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro, voluptas id impedit voluptates deserunt asperiores commodi,
                sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro.`,
              videoId: 'https://player.vimeo.com/video/928709228?h=992bb36770',
              picturePath: '01-resources/14-data/tours/23/mtwld/'
            },

            { tourId: 'arnsburg',
              title: 'Ums Kloster Arnsburg',
              text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro, voluptas id impedit voluptates deserunt asperiores commodi,
                sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                porro.`,
              videoId: 'https://player.vimeo.com/video/928713044?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',


              
              picturePath: '01-resources/14-data/tours/23/klstar/'
            },

            { tourId: 'winterstein',
                title: 'Tagesausflug am Winterstein',
                text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                  porro, voluptas id impedit voluptates deserunt asperiores commodi,
                  sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                  porro.`,
                videoId: 'https://player.vimeo.com/video/927065990?h=59be4efab3',
                picturePath: '01-resources/14-data/tours/23/wntst/'
              },

              { tourId: 'bayerischerWald',
                title: 'Von Regensburg bis zum Laber',
                text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                  porro, voluptas id impedit voluptates deserunt asperiores commodi,
                  sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                  porro.`,
                videoId: 'https://player.vimeo.com/video/928713044?h=9e2b150a76',
                picturePath: '01-resources/14-data/tours/24/bayrwa/'
              },

              { tourId: 'walchensee',
                title: 'Im Kaisergebirge',
                text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                  porro, voluptas id impedit voluptates deserunt asperiores commodi,
                  sint fugiat rerum recusandae aperiam ut. Ad in quae eum nesciunt distinctio?
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque sed,
                  porro.`,
                videoId: 'https://player.vimeo.com/video/928713044?h=9e2b150a76',
                picturePath: '01-resources/14-data/tours/24/wlchse/'
              },
    ];

const getReportElements = document.querySelectorAll('.report-card');
const popupBackground = document.querySelector('.popup-background');
const popupTitle = document.querySelector('.popup-title');
const popupText = document.querySelector('.popup-text');
const popupVideo = document.querySelector('.video iframe');
const pictureGallery = document.querySelector('.picture-gallery');
const closeButton = document.querySelector('.closeBtn');

let initialized = false;

  // INITIALIZATION at start
  const initialTourData = tours[0]; // initial tour data (first)
  popupTitle.textContent = initialTourData.title;
  popupText.textContent = initialTourData.text;
  popupVideo.src = initialTourData.videoId;
  pictureGallery.innerHTML = '';

    for (let i = 1; i <= 8; i++) {
        const listItem = document.createElement('li');
        const img = document.createElement('img');
        img.src = `${initialTourData.picturePath}${i}.jpg`;
        img.classList.add('tourPic');
        listItem.appendChild(img);
        pictureGallery.appendChild(listItem);
    }

    initialized = true;
    popupBackground.style.display = 'none';

  // paste tour Informations for report-card by click
  getReportElements.forEach(function(reportCard) {
    reportCard.addEventListener('click', function(event) {

      event.preventDefault();
      const reportCardId = reportCard.id;
      const tourData = tours.find(tour => tour.tourId === reportCardId); // get tour Id from report-card

      if (tourData) {

        // update popup content only if not initialized or IDs does not match
        if (!initialized || popupTitle.textContent !== tourData.title) {
          popupTitle.textContent = tourData.title;
          popupText.textContent = tourData.text;

          // check if video needs to be updated
          if (popupVideo.src !== tourData.videoId) {
            popupVideo.src = tourData.videoId;
          }

          // update the picture gallery by ID
          pictureGallery.innerHTML = '';
          for (let i = 1; i <= 8; i++) {
            const listItem = document.createElement('li');
            const img = document.createElement('img');
            img.src = `${tourData.picturePath}${i}.jpg`;
            img.classList.add('tourPic');
            listItem.appendChild(img);
            pictureGallery.appendChild(listItem);
          }

          initialized = true;
        }

        // Show the popup
        popupBackground.style.display = 'flex';
        setTimeout(() => {
            document.documentElement.style.overflow = 'hidden';
            popupBackground.style.opacity = '1';
            popupBackground.style.transition = 'opacity 0.4s ease';
          }, 10);
      }

    });
  });

  // Close popup with button close
  closeButton.addEventListener('click', function() {

        popupBackground.style.opacity = '0';
        document.documentElement.style.overflow = 'auto';
        setTimeout(() => {
          popupBackground.style.display = 'none';
        }, 200);
  });

  // every button ".generalBtn" resets Popup
  const generalBtn = document.querySelectorAll('.generalBtn');

  generalBtn.forEach(button => {
    button.addEventListener('click', function() {
        popupBackground.style.opacity = '0';
        document.documentElement.style.overflow = 'auto';
        setTimeout(() => {
          popupBackground.style.display = 'none';
        }, 200);
    });
  });

});

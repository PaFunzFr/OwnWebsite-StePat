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


const hoveredItems = document.querySelectorAll('.report-item, .photos-item');

hoveredItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        const highlightedTexts = event.currentTarget.querySelector('.report-title, .photos-title');
        highlightedTexts.style.color = 'hsla(37, 65%, 62%, 1)';
        highlightedTexts.style.fontWeight = 'bolder';
    });

    item.addEventListener('mouseout', () => {
        const highlightedTexts = event.currentTarget.querySelector('.report-title, .photos-title');
        highlightedTexts.style.color = '';
        highlightedTexts.style.fontWeight = '';
    });
});


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
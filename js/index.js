import List from 'list.js';
import dayjs from 'dayjs'
import { gra, gri } from './util.js';

window.addEventListener('DOMContentLoaded', () => {
    const referenceList = document.querySelector(".references-container")
    const logo = document.querySelector(".site-logo")
    logo.style.left = `${gri(0, 30)}%`
    logo.style.top = `${gri(30, 80)}%`
    logo.setAttribute('src', `/assets/logo-${gri(0,3)}.png`)
    const options = {

        valueNames: [
            'reference-title',
            'reference-date',
            'reference-location',
            'reference-name',
            'tags-hidden'
        ]
    };
    let sortableList = new List(referenceList, options);

    const events = document.querySelectorAll('.event, .event-card')

    events.forEach(event => {
        const now = dayjs();
        const startDate = dayjs(event.getAttribute('data-start'));
        const endDate = dayjs(event.getAttribute('data-end'));
        console.log(startDate)
        if (startDate.isAfter(now)) {
            event.setAttribute('data-status', 'upcoming')
        } else if (startDate.isBefore(now) && endDate.isAfter(now)) {
            event.setAttribute('data-status', 'ongoing')
        } else {
            event.setAttribute('data-status', 'past')
        }
    })

    const footnotes = document.querySelectorAll(".fn")
    const fnModal = document.querySelector(".fn-modal")

    footnotes.forEach(fn => {
        fn.addEventListener('mouseover', () => {
            const box = fn.getBoundingClientRect();
            fnModal.innerHTML = fn.getAttribute('data-content')
            fnModal.classList.add('active')
            fnModal.style.left = `${box.left}px`;
            fnModal.style.top = `${box.top}px`;
        })
    })

    fnModal.addEventListener('mouseleave', () => {
        fnModal.classList.remove('active')
    })

    const inlineImages = document.querySelectorAll(".inline-image")
    const imageModal = document.querySelector(".image-modal")

    inlineImages.forEach(img => {
        img.addEventListener('mouseover', () => {
            console.log('hi')
            imageModal.classList.add('active')
            const imgEl = imageModal.querySelector('img')
            const imgCaption = imageModal.querySelector('figcaption')
            imgEl.setAttribute('src', img.getAttribute('src'))
            imgCaption.innerHTML = img.getAttribute('data-caption')
        })
    })

    imageModal.addEventListener('click', () => {
        imageModal.classList.remove('active')
    })

})
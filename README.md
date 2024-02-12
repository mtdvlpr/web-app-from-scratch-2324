# Web App From Scratch @cmda-minor-web 2023 - 2024                                   |             |)

## Description

This project is an assignment for the course Web App From Scratch. The goal of this course is to create a web application from scratch, without the use of frameworks or libraries. The project is built using vanilla HTML, CSS and JavaScript.

[View live demo](https://mtdvlpr.github.io/web-app-from-scratch-2324/)

## Log

### 09-02-2024

I wanted to add pagination to the application, so I made a previous and next button to increase/decrease the current page. I added listeners that would update the disabled state of the buttons:
![listeners](https://github.com/mtdvlpr/web-app-from-scratch-2324/assets/46671786/c0be195c-2947-4134-af8f-2179e447f5eb)

This didn't work. The previous button kept being disabled...

Eventually I figured out that I was only updating the previous button state when clicking the previous button and I should update both buttons when either button is clicked. I rewrote the code to the following:

![fixed](https://github.com/mtdvlpr/web-app-from-scratch-2324/assets/46671786/c412f890-ac84-48e7-843e-be0303fd6fc7)

Another bug I encountered was when I tried to go to the very last page. The following was displayed:

![bug](https://github.com/mtdvlpr/web-app-from-scratch-2324/assets/46671786/39ddbdf2-8510-42e3-b39f-e20c149325a0)

This was because I expected to get the same number of pokemon as the perPage variable that I use, but this is not the case for the last page. I fixed it by removing all remaining loading cards after all pokemon were loaded.

![loader_fix](https://github.com/mtdvlpr/web-app-from-scratch-2324/assets/46671786/3c41db89-ad65-45cf-b215-15f91e4cec50)

## Sources

- [Vite Setup](https://vitejs.dev/)
- [PokeAPI](https://pokeapi.co/)
- [Loading Indicator](https://loading.io/css/)
- [Accessible tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/)
- [Animation](https://erikmartinjordan.com/display-none-display-block)
- [Template tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
- [Skeleton loaders](https://www.freecodecamp.org/news/how-to-build-skeleton-screens-using-css-for-better-user-experience/)
- [Number input](https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/)

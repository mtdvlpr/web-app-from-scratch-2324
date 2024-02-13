# Changelog

## 05-02-2024

- Brainstormed ideas for the project as team and individually (see [IDEAS.md](./IDEAS.md))
  - I decided to stick with the Pokemon theme, because it's a topic I like and I know there's a nice API for it
- Created the project repository and set up the initial structure

## 06-02-2024

- Created a first draft (see [IDEAS.md](./IDEAS.md#drafts)) of the application which fetches data from a JSON file and from an external API
- I decided to use Vite for easy bundling and optimizing the build output

## 07-02-2024

- Added a stats and habitats article
- Improved mobile responsiveness

## 08-02-2024

- Removed Vite and replaced it with `<script type="importmap">`
  - I decided to move away from Vite to get a better understanding of how to use ES modules in vanilla JavaScript
- Added skeleton loaders instead of loading spinners for better UX
- Moved some HTML from render functions to actual index.html file for better SEO and in case JavaScript is disabled

## 09-02-2024

- Added pokedex section with pagination support
- Added aria labels for skeleton loaders to indicate loading state to screen readers

## 12-02-2024

- Added a per page input so the user can decide how many Pokemon to load per page

## 13-02-2024

- Added error states to every part of the application

# Project 4 - Veni Vici! (The Cat Edition 🐈)

Submitted by: **Izayah Rahming**

Time spent: **8 hours**

## Description

This is a web app, similar to StumbleUpon, that allows a user to discover new cat breeds. The user can click a button to fetch a new random cat image and see its breed, origin, and temperament. The user can "ban" specific breeds or origins by clicking on them, which adds them to a ban list and prevents them from appearing in future discoveries. The app also keeps a running history of all cats viewed during the session.

**Note:** This project was originally planned using the NASA APOD API. Due to a server-side outage (HTTP 504 Error) on NASA's end on the due date (10/22/2025), I successfully pivoted to **The Cat API** to complete all required and stretch features.

## GIF Walkthrough

Here's a complete walkthrough of all implemented features:
https://github.com/user-attachments/assets/c26dff40-b9a7-46bc-9a47-6ece62d23695

## Required User Stories

- [x] Application features a button that creates a new API fetch request on click.
- [x] Fetched data displays at least three attributes (Breed, Origin, Temperament) and an image.
- [x] The type of attribute displayed for each image is consistent across API calls.
- [x] Only one item (cat) from the API call response is viewable at a time.
- [x] Displayed attributes match the displayed image.
- [x] There is at least one image per API call.
- [x] API call response results appear random to the user.
- [x] Clicking on a displayed value for one attribute adds it to a displayed ban list.
- [x] Clicking on an attribute in the ban list immediately removes it from the ban list.
- [x] Attributes on the ban list prevent further images/API results with that attribute from being displayed.

## Stretch Features

- [x] **Multiple types of attributes are clickable** and can be added to the ban list. (User can ban both `Breed` and `Origin`).
- [x] **Users can see a stored history** of their previously displayed results from this session.
- [ ] Users can click on an item in their history to set it as the current displayed item.
- [ ] The app is deployed to Netlify.

## Notes

- The project was built using **React** and **Vite**.
- State is managed with `useState` hooks.
- Asynchronous API calls are handled with `async/await` and `fetch`.
- `DEMO_KEY` was replaced with a personal API key for The Cat API.
- Logic was successfully pivoted from the non-functional NASA API to The Cat API while preserving all required and stretch features.

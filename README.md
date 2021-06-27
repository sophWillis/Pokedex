# Pokédex

## Prototype

https://www.figma.com/file/dsLBR0Nzqx7nn2PvbqhOLQ/Pok%C3%A9dex?node-id=22%3A90

## Pages

### Home

20 pokémon are loaded initially. The user can load 20 more each time they click the 'load more' button at the bottom of the page.

<img width="374" alt="Screenshot 2021-06-27 at 21 32 18" src="https://user-images.githubusercontent.com/38283239/123558628-3ab27080-d78f-11eb-9065-c947ea38cf36.png">

At the moment, users can only search by pokémon name but I plan on adding more search filters. The search is only executed on Enter key, but this may not be intuative to every user so I plan to add a search button as well. When a match is found, the entire list is hidden and only the results are shown. When the input is emptied, the list is restored.

<img width="374" alt="Screenshot 2021-06-27 at 21 43 56" src="https://user-images.githubusercontent.com/38283239/123558940-10fa4900-d791-11eb-94be-5b2f720b2bef.png">

If no match is found, an error message is displayed.

<img width="374" alt="Screenshot 2021-06-27 at 22 09 52" src="https://user-images.githubusercontent.com/38283239/123559530-7439aa80-d794-11eb-9162-430b8baecb8d.png">

Whilst any promise from a fetch is waiting to be resolved, a loading animation is shown.

<img width="373" alt="Screenshot 2021-06-27 at 22 14 03" src="https://user-images.githubusercontent.com/38283239/123559644-2cffe980-d795-11eb-80a7-2eaacd2b4306.png">

### Pokemon

Each Pokémon has it's own details page. I plan on displaying more data from the API as well as adding a swipe within the page to navigate through each pokémon's evolutions (see prototype).

<img width="374" alt="Screenshot 2021-06-27 at 21 47 47" src="https://user-images.githubusercontent.com/38283239/123558988-5a4a9880-d791-11eb-99db-aa9deb2a0e5d.png">

I plan on using local storage with Redux to allow users to save and also remove pokémon to their favourites list - a feature only available for logged-in users.

<img width="372" alt="Screenshot 2021-06-27 at 22 03 32" src="https://user-images.githubusercontent.com/38283239/123559370-8bc46380-d793-11eb-9a44-91d8f88ae256.png">

### User Authentication

<img width="374" alt="Screenshot 2021-06-27 at 21 54 10" src="https://user-images.githubusercontent.com/38283239/123559343-620b3c80-d793-11eb-9e36-9547216b85de.png">
<img width="373" alt="Screenshot 2021-06-27 at 21 54 23" src="https://user-images.githubusercontent.com/38283239/123559344-63d50000-d793-11eb-9d15-46a22516c40a.png">
<img width="374" alt="Screenshot 2021-06-27 at 21 54 53" src="https://user-images.githubusercontent.com/38283239/123559346-659ec380-d793-11eb-9c06-2d8984855bd1.png">
<img width="374" alt="Screenshot 2021-06-27 at 22 04 35" src="https://user-images.githubusercontent.com/38283239/123559397-bca49880-d793-11eb-909d-605e95f8e110.png">
<img width="375" alt="Screenshot 2021-06-27 at 21 57 48" src="https://user-images.githubusercontent.com/38283239/123559353-69cae100-d793-11eb-8fd2-76962739bc5a.png">
<img width="373" alt="Screenshot 2021-06-27 at 22 01 43" src="https://user-images.githubusercontent.com/38283239/123559355-6b94a480-d793-11eb-9515-9ddb62cc9d45.png">

## Installation

```
npm install
npm start
```

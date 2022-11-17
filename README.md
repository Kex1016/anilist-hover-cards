# AniList Hover Cards

A small userscript I made for fun. It only adds a hover card for a user when you hover over their avatar.

# Installation

- Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/) for your browser.
- Then install the script from `(link to be added)`.
- ???
- Profit!

# Screenshots

There will be screenshots here soon.

# Building

**Requirements:**

- cp, sed, rm, mkdir, date, m4 (essentially Linux or WSL)
- Node.js

**Steps:**

1. Clone the repository.
2. Run `npm install --global sass` to install Sass.
3. Go in the `src` directory.
4. Run `make` to build the script.
5. The script will be in the `src/build` directory as `al-profile-cards.user.js`.

# Credits

- [AniList](https://anilist.co/) for the API.
- [hohMiyazawa/Automail](https://github.com/hohMiyazawa/Automail) for making me realize that I can just make a template and build into that instead of doing framework shenanigans.

# License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details

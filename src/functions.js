function getAnilistID(username) {
    return fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query ($username: String) {
              User(name: $username) {
                id
              }
            }
        `,
            variables: {
                username
            }
        })
    })
        .then(r => r.json())
        .then(data => data.data.User)
}

function getAnilistUser(id) {
    return fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query ($id: Int) {
              User(id: $id) {
                name
                avatar {
                  large
                }
                bannerImage
                statistics {
                  anime {count}
                  manga {count}
                }
                options {
                  profileColor
                }
              }
            }
        `,
            variables: {
                id
            }
        })
    })
        .then(r => r.json())
        .then(data => data.data.User)
}

const loadingHTML = `
<div class="cakes_loading">
    <div class="cakes_loading__dot"></div>
    <div class="cakes_loading__dot"></div>
    <div class="cakes_loading__dot"></div>
</div>
`

const getCardContent = async (user) => {
    return `<div class="cakes_card__avatar" style="background-image: url('${user.avatar.large}')"></div>
    <div class="cakes_card__info">
        <h1 class="cakes_card__info__name">${user.name}</h1>
        <div class="cakes_card__info__stats">
            <div class="cakes_card__info__stats__anime">
                <h2>${user.statistics.anime.count}</h2>
                <div>Anime</div>
            </div>
            <div class="cakes_card__info__stats__manga">
                <h2>${user.statistics.manga.count}</h2>
                <div>Manga</div>
            </div>
        </div>
    </div>
    `
}

function makeCard() {
    const card = document.createElement('div')
    card.classList.add('cakes_card')
    return card;
}

async function retrieveUser(userid) {
    let user = localStorage.getItem('cakes_user');
    if (!user) {
        user = {};
        user[userid] = await getAnilistUser(userid);
    } else {
        user = JSON.parse(user);
    }

    if (user[userid]) {
        let userObj = user[userid];
        if (userObj.expires > Date.now()) {
            return userObj;
        }

        // if expired, delete it
        delete user[userid];

        let seen = [];
        localStorage.setItem('cakes_user', JSON.stringify(user, function (key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }));

        user[userid] = await getAnilistUser(userid);
        return user[userid];
    } else {
        let userObj = await getAnilistUser(userid);
        userObj.expires = Date.now() + 1000 * 60 * 60 * 0.5; // 30 minutes
        user[userid] = userObj;

        let seen = [];
        localStorage.setItem('cakes_user', JSON.stringify(user, function (key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }));

        return userObj;
    }
}

function renderCard(el, parent) { // parent is basically just here in case we ever need it
    // Give it a good old mouse enter
    el.addEventListener("mouseenter", async (e) => {
        let url = el.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
        let uid = url.split("/").pop().split("-")[0].slice(1);

        if (!uid) return;

        const card = makeCard();
        card.innerHTML = loadingHTML;
        setTimeout(() => card.classList.add("cakes_card--show"), 100);
        el.appendChild(card);

        // if still hovered
        if (el.matches(":hover")) {
            let user = await retrieveUser(uid);
            card.innerHTML = await getCardContent(user);
            card.style.backgroundColor = user.options.profileColor;
            card.style.backgroundImage = `url(${user.bannerImage})`;
        }
    });

    // Give it a good old mouse leave
    el.addEventListener("mouseleave", async (e) => {
        const card = el.querySelector(".cakes_card");
        if (card) {
            card.classList.add("cakes_card--hide");
            setTimeout(() => card.remove(), 300);
        }
    });
}

async function getUser(element) {
    const classes = [ // The classes that should trigger the check for possible card placement
        "activity-entry",
        "thread-card",
        "forum-thread"
    ];
    if (!element.classList) return;
    if (classes.some(c => element.classList.contains(c))) {
        // If the element has the class that should
        // trigger the check for possible card placement
        const avatar = element.querySelector(".avatar");
        if (avatar) {
            await renderCard(avatar, element);
        }
    }
}


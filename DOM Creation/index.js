const appList = [
    {
        name: "Netflix",
        source: "images/netflix-logo.png"
    },
    {
        name:"Amazon Prime",
        source: "images/logo-prime-video-logo-amazon.png"
    },
    {
        name:"Hotstar",
        source:"images/disneyplus-hotstar-logo.png"
    },
    {
        name:"Hulu",
        source:"images/hulu.png"
    }
];
window.addEventListener("load", ()=>{
    const listEle = document.getElementById('apps');
    console.log(listEle);
    for (const app of appList) {
        let listItem = document.createElement('li');
        let listItemContainer = document.createElement('span');
        let companyLogo = document.createElement('img');
        let companyName = document.createTextNode(app.name); 
        companyLogo.src = app.source;
        listItemContainer.classList.add('flex-container');
        listItemContainer.append(companyLogo);
        listItemContainer.append(companyName);
        listItem.appendChild(listItemContainer);
        listEle.appendChild(listItem);
    }
})

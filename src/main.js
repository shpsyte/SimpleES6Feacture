console.clear();
import api from './api';

// async function getUserFromGithub(user) {
//     try {
//       const response = await axios.get(`https://api.github.com/users/${user}`);

//       console.log(response.data);
//     } catch (err) {
//       console.log("Usuário não existe");
//     }
//   }

//   getUserFromGithub("diego3g");
//   getUserFromGithub("diego3g124123");

class App {
    constructor() {
        this.repositories = [];
        this.formEl = document.querySelector("#repo-form");
        this.inputEl = document.querySelector("#repo-form input[name=repository]");
        this.listEL = document.querySelector("#repo-list");
        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.addEventListener("submit", e => this.addRepository(e));
    }

    setLoading(loading = true){

        if (loading){
            let loadingEl = document.createElement("span");
            loadingEl.appendChild(document.createTextNode("Carregando"));
            loadingEl.setAttribute("id","loading");

            this.formEl.appendChild(loadingEl);
        }else
        {
            document.getElementById("loading").remove();
        }

    }

    async addRepository(e) {
        e.preventDefault();



        const repoInput = this.inputEl.value;

        if (repoInput.length === 0)
            return;

            this.setLoading();


        try {
            const response = await api.get(`https://api.github.com/repos/${repoInput}`);



            console.log('Data', response.data);

            const {
                name,
                description,
                html_url,
                owner: {
                    avatar_url
                }
            } = response.data;


            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            this.inputEl.value = "";

            this.render();
        } catch (error) {
            alert('Repositório não existe');

        }

        this.setLoading(false);
    }

    render() {
        this.listEL.innerHTML = "";

        this.repositories.forEach(repo => {
            let imgEl = document.createElement("img");
            imgEl.setAttribute("src", repo.avatar_url);

            let titleEl = document.createElement("strong");
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement("p");
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement("a");
            linkEl.setAttribute("target", "_blank");
            linkEl.setAttribute("href", repo.html_url);
            linkEl.appendChild(document.createTextNode("Acessar"));


            let listItemEl = document.createElement("li");

            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEL.appendChild(listItemEl);


        });
    }
}


new App();
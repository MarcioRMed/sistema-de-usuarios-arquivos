class UserController {
    constructor() {

        this.addEventBtns();
        this.users = {}
        this.start()

    }

    start() {
        let user = new User(0, 'teste', ' img/icon.jpg', 'teste@teste', '11 912922299', true, '123');


        let user2 = new User(1, 'teste2', ' img/icon.jpg', 'teste@teste', '11 912922299', true, '123');

        this.addLine(user)
        this.addLine(user2)

    }


    //metodos
    addLine(user) {

        let tr = document.createElement('tr');
        tr.dataset.user = JSON.stringify(user)
        tr.innerHTML = `

            <td class='table-id'>${user.getId()}</td>
            <td class='table-icon'>${user.getPhoto()}<img src='img/icon.jpg' alt='Ícone'></td>
            <td class='table-name'>${user.getName()}</td>
            <td class='table-email'>${user.getEmail()} </td>
            <td class='table-phone'> ${user.getPhone()} </td>
            <td class='table-date'> ${user.getDate()}  </td>`;

        if (user.getAdmin()) {
            tr.innerHTML += `<td class='table-admin'> Sim </td>`

        } else {
            tr.innerHTML += `<td class='table-admin'> Não </td>`

        }

        tr.innerHTML += `
                 <td class='table-actions'>
                      <span class="material-icons-sharp edit-btn">edit</span>
                      <span class="material-icons-sharp delete-btn">delete</span>
                </td> `;

        document.querySelector('.users tbody').appendChild(tr);

    }


    readPhoto(data) {

        return new Promise((resolve, reject) => {
            let fr = new FileReader();
            fr.addEventListener('load', () => {
                resolve(fr.result);
            });
            fr.addEventListener('error', (e) => {
                reject(e)
            })

            fr.readAsDataURL(data);
        })
    }


    register() {
        let formEl = document.querySelector('.register');

        let elements = formEl.elements; // elements de input

        let user;

        let registerData = {};

        //metodo spreed - transforma HTMLform - em uma array comum
        [...elements].forEach((v) => {

            switch (v.type) {
                case 'checkbox':
                    registerData.admin = v.checked
                    break;

                case 'file':

                    break;

                default:
                    registerData[v.name] = v.value
                    break;

            }
        })


        if (JSON.stringify(this.users) == JSON.stringify({})) {

            user = new User(0, registerData.name, '', registerData.email, registerData.phone, registerData.admin, registerData.password);

        } else {

            //definir lista de usuário

            let lastUser = Object.values(this.users)[Object.values(this.user).length - 1];

            user = new User(lastUser.getId()+1, registerData.name, '', registerData.email, registerData.phone, registerData.admin, registerData.password);

        }

        let fileEl = elements.photo;

        if (fileEl.files.length == 0) {
            user.setPhoto('img/icon.jpg');
            this.user[user.getId()] = user ;

            this.addLine(user)

            this.closeForm(document.querySelector('.form-add'), document.querySelector('.form-add'))
            
            // formEl.reset()
        } else {

            this.readPhoto(fileEl.files[0]).then((result) => {

                user.setPhoto(result)
                this.user[user.getId()] = user;
                this.addLine(user)
                this.closeForm(document.querySelector('.form-add'), document.querySelector('.form-add'))             
                

            }, (e) => {
                console.error(e)
            })
        }

        // this.addLine(user)    
    }

    closeForm(form, formContainer) {
        form.reset();
        formContainer.style.display = 'none'
    }


    //erro no mintuo do video 19
    //erro em 22:50min


    addEventBtns() {

        //abre formulário de cadastro
        document.querySelector('.add').addEventListener('click', () => {
            document.querySelector('.form-add').style.display = 'flex'

        })

        //fecha o formulário de cadastro
        document.querySelectorAll('.close')[0].addEventListener('click', () => {
            this.closeForm(document.querySelector('.form.register'), document.querySelector('.form-add'))
        })

        document.querySelectorAll('.check')[0].addEventListener('click', () => {
            this.register();
        })

        document.querySelectorAll('.close')[1].addEventListener('click', () => {
            this.closeForm(document.querySelector('.form.edit'), document.querySelector('.form-edit'))

        })

        document.querySelectorAll('.check')[1].addEvenListener('click', () => {
            this.edit();
        })

    }
}











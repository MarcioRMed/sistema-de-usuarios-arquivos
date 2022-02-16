//programação orientada a objeto



class User{
    constructor(id, name, photo, email, phone, admin, password){
      this._id = id //propriedades da classe
      this._name = name
      this._photo = photo
      this._email = email
      this._phone = phone
      this._admin = admin
      this._password = password
      let date = new Date()
      this._date = date.toLocaleDateString('pt-BR')+'   '+ date.toLocaleTimeString('pt-Br').slice(0,5); //inicia o corte da data 0 e vai ate 5 caracteres
    }

    getId(){
        return this._id;    
    }

    getName(){
    return this._name;
    }

    getPhoto(){
        return this._photo;
    }

    getEmail(){
        return this._email;
    }

    getPhone(){
        return this._phone;
    }

    getAdmin(){
        return this._admin;
    }

    getPassword(password){
        if(password === 'Senha do Moderador'){        
            return this._password;
        }else{
            return 'Senha do Moderador incorreta'
         }
    }

    getDate(){
        return this._date;
    }   

    setPhoto(photo){
        this._photo = photo;
    }

}




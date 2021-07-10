class Player{
    constructor(){

    }

    getPlayerId(){
        return this.playerId
    }

    getUsername(){
        return this.username
    }

    getCountry(){
        return this.country
    }

    getMoney(){
        return this.money
    }

    fromJson(json){
        this.playerId = json.playerId;
        this.username = json.username;
        this.country = json.country;
        this.money = json.money;
    }
}


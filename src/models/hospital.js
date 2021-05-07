export default class Hospital {
    constructor(name, address, city, country, phone_number, available_doses, username, email, password) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phone_number = phone_number;
        this.available_doses = available_doses;
        this.username = username;

        this.email = email;
        this.password = password;
    }
}
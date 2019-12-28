export class User{
    constructor(
        public _id : number,
        public nombre : string,
        public apellidos: string,
        public email : string,
        public role : string,
        public password : string,
        public imagen : string,
    ){

    }
}
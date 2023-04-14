
export class ClientData {
    //public static readonly WEB_URL: string = "http://localhost:4200";
    public static readonly WEB_URL: string = "https://portfolioweb-argprog.web.app"; //FireBase
}
export class ApiServerUrl {
    //public static readonly API_SERVER: string = "http://localhost:8080/api/";
    //public static readonly API_SERVER: string = "https://portfolio-backend-vu6y.onrender.com/api/"; //Render
    public static readonly API_SERVER: string = "https://app-bdd5138d-b5b9-4ffa-ae05-7e0bfe908321.cleverapps.io/api/"; //CleverCLoud
    public static readonly API_SERVER_GET: string = `${this.API_SERVER}get/`;
    public static readonly API_SERVER_DELETE: string = `${this.API_SERVER}delete/`;
    public static readonly API_SERVER_NEW: string = `${this.API_SERVER}new/`;
    public static readonly API_SERVER_REGISTER: string = `${this.API_SERVER}auth/register`;
    public static readonly API_SERVER_LOGIN: string = `${this.API_SERVER}auth/authenticate`;
    public static readonly API_SERVER_LOGOUT: string = `${this.API_SERVER}auth/logout`;

}

export class IsLogin {
    public static readonly IS_LOGIN: boolean = (localStorage.getItem('token') != undefined); 
}
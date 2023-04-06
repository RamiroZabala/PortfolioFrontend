export class ApiServerUrl {

    public static readonly API_SERVER: string = "http://localhost:8080/api/";
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
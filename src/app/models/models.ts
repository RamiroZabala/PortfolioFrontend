export interface Person{
    id: Number;
    name:string;
    lastname:string;
    long_description:string;
    short_description:string;
    title:string;
    nationality:string;
    birthdate:string;
    img_profile:string;
    img_banner:string;
    email:string;
    phone:string;
    facebook_id:string;
    instagram_id:string;
    twitter_id:string;
}
export interface Education {
    id: Number;
    title: string;
    description: string;
    period: string;
    img_icon: string;
}
export interface Skill {
    id: Number;
    skillname: string;
    category: string;
    value: string;
}
export interface WorkProject {
    id: Number;
    title: string;
    description: string;
    period: string;
    img: string;
    url: string;
}
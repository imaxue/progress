export class session{
    static set(key:string, value:any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    static get(key:string) {
        var d = sessionStorage.getItem(key);
        if (!d) return d;
        return JSON.parse(d);
    }

    static remove(key:string) {
        sessionStorage.removeItem(key);
    }

    static clear() {
        sessionStorage.clear();
    } 
    //如果设置为length，转为js时会报错
    static count(){
        return sessionStorage.length;
    } 

}
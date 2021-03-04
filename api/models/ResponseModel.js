class ResponseModel{
    constructor(status,header,body){
        this.status = status;
        this.header = header;
        this.body = body;
    }
    static ok(){
        return new ResponseModel(200,"Tamam","Herşey yolunda");
    }
    static unAuthorized(){
        return new ResponseModel(401,"Giriş yapılmamış","Sisteme devam etmek için giriş yapmanız gerekmektedir!");
    }
    static internalServerError(){
        return new ResponseModel(500,"Sunucu hatası","Sunucuda sebebi bilinmeyen bir hata meydana geldi!");
    }
}

module.exports = ResponseModel;
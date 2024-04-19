import * as CryptoJs from 'crypto-js';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';


//funcao para gravar dados do usuario autenticado na local storage do navegador
export function singIn(data: any): void {
    //criptografar os dados
    const content = CryptoJs.AES.encrypt(JSON.stringify(data), environment.chaveCriptografia)
        .toString();

    //gravar dados na localstorage
    localStorage.setItem(environment.usuarioAutenticado, content);

}

//funcao para ler dados da local storage
export function getUserData(): any | null {
    //ler dados gravados na local store
    const content = localStorage.getItem(environment.usuarioAutenticado);
    //verificar se algum conteudo foi encontrado
    if (content != null) {
        //descriptografar os dados
        const data = CryptoJs.AES.decrypt(content, environment.chaveCriptografia)
            .toString(CryptoJs.enc.Utf8);

        //retornar os dados do usuario
        return JSON.parse(data);
    }
    return null;
}


//funcao para apagar os dados gravados 
export function signOut(): void {
    //apagar dados
    localStorage.removeItem(environment.usuarioAutenticado);
}

//funcao para retornar HEADRE HTT contendo a autorização do usuario (bearer token)

/*
    Função para retornar um HEADER HTTP contendo
    a autorização de acesso do usuário (bearer token)
*/
export function getAuthorization(): HttpHeaders {


    //capturando os dados do usuário autenticado
    const usuario = getUserData();


    //criando o cabeçalho HTTP com a autorização
    const httpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + usuario?.token
    });


    //retorno o HttpHeaders
    return httpHeaders;
}



import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { getAuthorization } from '../../../helpers/auth.helpers';

@Component({
  selector: 'app-consulta-fornecedores',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consulta-fornecedores.component.html',
  styleUrl: './consulta-fornecedores.component.css'
})
export class ConsultaFornecedoresComponent implements OnInit {

  //atributos
  fornecedores: any[] = []; //array de objetos


  //metodo construtor
  constructor(
    private httpClient: HttpClient
  ) {

  }


  //funcao execultada quando o componente é aberto
  ngOnInit(): void {

    //fazer uma requisiçaõ GET para API
    this.httpClient.get(`${environment.apiProdutos}/fornecedores`, { headers: getAuthorization()} )
      .subscribe( //capturar o retorno da API
        {
          //capturando o retorno de SUCESSO da API
          next: (data) => {
            //armazenae os dados obtidos da API no atributo da classe
            this.fornecedores = data as any[];
          },
          //capturar o retorno de ERRO da api
          error: (e) => {
            console.log(e.error);
          }
        }
      )
  }

}

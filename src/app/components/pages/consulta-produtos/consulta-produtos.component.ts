import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent implements OnInit {

  //atributo
  produtos: any[] = [];
  mensagem: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient
  ){
  }


  //função executado no momento em que a página é aberta
  ngOnInit(): void {
   
    //fazendo uma requisição para o serviço de consulta de produtos da API
    this.httpClient.get(`${environment.apiProdutos}/produtos`)
      .subscribe(
        {
          next: (data) => {
            this.produtos = data as any[]
          },
          error: (e) => {
            console.log(e.error);
          }
        }
      );
  }
  
  //funcao executada ao clicar no botao de exclusao
  onDelete(id: number): void{
   if(confirm('Deseja realmente EXCLUIR o produto Selecionado ?')){
    //fazendo uma requisição para excluir produto na API
    this.httpClient.delete(`${environment.apiProdutos}/produtos/${id}`,
     {responseType: 'text'})
    .subscribe(
      {
        next: (data) => {
          this.mensagem = data;
          this.ngOnInit();
        },
        error: (e) =>{
          console.log(e.error);
        }
      });
   }
  }
}






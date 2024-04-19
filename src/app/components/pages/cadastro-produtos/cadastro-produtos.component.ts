import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getAuthorization } from '../../../helpers/auth.helpers';

@Component({
  selector: 'app-cadastro-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent implements OnInit {


  //atributos
  fornecedores: any[] = [];
  mensagem: string= "";

  //metodo contrutor
  constructor(
    private httpClient: HttpClient
  ) { }

  //criando objeto para capturar o formulario
  form = new FormGroup({
    //campo nome
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),

    preco: new FormControl('',[Validators.required, Validators.min(1)]),

    quantidade: new FormControl('',[Validators.required, Validators.min(0)]),

    fornecedorId: new FormControl('', [Validators.required])

  });

  //funcao utilizada para verificar o estado de cada campo do formulario
  get f(){
    return this.form.controls;
  }


  //evento executado ao clicarmos no SUBMIT do formulario
  onSubmit(): void{
   
    //fazendo requisicao POST para o endpoint de cadastro de produtos
    this.httpClient.post(`${environment.apiProdutos}/produtos`,
    this.form.value, {responseType: 'text', headers: getAuthorization()})
    .subscribe({
      next: (data) => {
       //capturando a mensagem obtida da api
       this.mensagem = data;
       //limpar formulario
       this.form.reset();
      },
      error: (e) => {
        console.log(e.error);
      }
    });
  }



  //funcao execultada quando o componente é aberto
  ngOnInit(): void {

    //fazer uma requisiçaõ GET para API
    this.httpClient.get(`${environment.apiProdutos}/fornecedores`, 
    { headers: getAuthorization()})
      .subscribe({ //capturar o retorno da API

        //capturando o retorno de SUCESSO da API
        next: (data) => {
          this.fornecedores = data as any[];
        },
        //capturar o retorno de ERRO da api
        error: (e) => {
          console.log(e.error)
        }
      })
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getAuthorization } from '../../../helpers/auth.helpers';


@Component({
  selector: 'app-edicao-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent implements OnInit {


  //atributos
  fornecedores: any[] = [];
  mensagem: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}


  //criando um objeto para capturar o formulário
  form = new FormGroup({
    /* campo 'id' */
    id: new FormControl(''),
    /* campo 'nome' */
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    /* campo 'preco' */
    preco: new FormControl('', [Validators.required, Validators.min(1)]),
    /* campo 'quantidade' */
    quantidade: new FormControl('', [Validators.required, Validators.min(0)]),
    /* campo 'fornecedorId' */
    fornecedorId: new FormControl('', [Validators.required])
  });
 
  //função utilizada para verificar o estado de cada campo do formulário
  get f() {
    return this.form.controls;
  }


  //método executado quando o componente é aberto
  ngOnInit(): void {
   
    //capturar o id passado na URL (rota)
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
       
    //consultando os dados do produto na API
    this.httpClient.get(`${environment.apiProdutos}/produtos/${id}`, { headers: getAuthorization()})
      .subscribe({
          next: (data: any) => {
           
            //preenchendo o formulário com os dados do produto..
            this.form.controls['id'].setValue(data.id);
            this.form.controls['nome'].setValue(data.nome);
            this.form.controls['preco'].setValue(data.preco);
            this.form.controls['quantidade'].setValue(data.quantidade);
            this.form.controls['fornecedorId'].setValue(data.fornecedor.id);
          },
          error: (e) => {
            console.log(e.error);
          }
      });  
     
    //fazendo uma chamada GET para consulta de fornecedores na API
    this.httpClient.get(`${environment.apiProdutos}/fornecedores`, { headers: getAuthorization()})
      .subscribe({
        next: (data) => {
          this.fornecedores = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }


  //evento executado ao clicarmos no SUBMIT do formulario
  onSubmit(): void{
   
    //fazendo requisicao POST para o endpoint de cadastro de produtos
    this.httpClient.put(`${environment.apiProdutos}/produtos`,
    this.form.value, {responseType: 'text', headers: getAuthorization()})
    .subscribe({
      next: (data) => {
       //capturando a mensagem obtida da api
       this.mensagem = data;
      },
      error: (e) => {
        console.log(e.error);
      }
    });
  }
 

}






import { Routes } from '@angular/router';
import { ConsultaFornecedoresComponent } from './components/pages/consulta-fornecedores/consulta-fornecedores.component';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './components/pages/consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './components/pages/edicao-produtos/edicao-produtos.component';

export const routes: Routes = [
    {
        path: 'pages/consulta-fornecedores',
        component: ConsultaFornecedoresComponent
    },

    {
        path: 'pages/cadastro-produtos',
        component: CadastroProdutosComponent
    },

    {
        path: 'pages/consulta-produtos',
        component: ConsultaProdutosComponent
    },

    {
        path: 'pages/edicao-produtos/:id',
        component: EdicaoProdutosComponent
    },
    {
        path:  "", //URL RAIZ DO PROJETO
        pathMatch: "full",
        redirectTo: "/pages/consulta-produtos"
    },
    {
        path: '**',
        redirectTo: '/pages/consulta-produtos'
    }
];

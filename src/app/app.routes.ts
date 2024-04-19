import { Routes } from '@angular/router';
import { ConsultaFornecedoresComponent } from './components/pages/consulta-fornecedores/consulta-fornecedores.component';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './components/pages/consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './components/pages/edicao-produtos/edicao-produtos.component';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { CriarUsuarioComponent } from './components/pages/criar-usuario/criar-usuario.component';
import { UnAuthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent,
        canActivate: [UnAuthGuard]
    },

    {
        path: 'pages/criar-usuario',
        component: CriarUsuarioComponent,
        canActivate: [UnAuthGuard]
    },
   
    {
        path: 'pages/consulta-fornecedores',
        component: ConsultaFornecedoresComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'pages/cadastro-produtos',
        component: CadastroProdutosComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'pages/consulta-produtos',
        component: ConsultaProdutosComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'pages/edicao-produtos/:id',
        component: EdicaoProdutosComponent,
        canActivate: [AuthGuard]
    },

    {
        path:  "", //URL RAIZ DO PROJETO
        pathMatch: "full",
        redirectTo: "/pages/autenticar-usuario"
    },

    {
        path: '**',
        redirectTo: '/pages/consulta-produtos'
    }

];

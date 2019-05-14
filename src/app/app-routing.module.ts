import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ProductCardComponent } from './components/product-card/product-card.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductCardComponent
  },
  {
    path: '**',
    component: ProductCardComponent
  }
];
const config: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};


@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

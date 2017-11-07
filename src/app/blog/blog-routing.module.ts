import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import {DeleteBlogComponent} from './delete-blog/delete-blog.component';
import {AuthGuard} from '../user/auth-guard.service';

const routes: Routes = [
  { path: 'blog', canActivate: [ AuthGuard], component: BlogComponent },
  { path: 'edit-blog/:id', canActivate: [ AuthGuard], component: EditBlogComponent },
  { path: 'delete-blog/:id', canActivate: [ AuthGuard], component: DeleteBlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}

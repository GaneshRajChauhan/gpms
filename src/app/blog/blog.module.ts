import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { AuthGuard } from '../user/auth-guard.service';
import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BlogRoutingModule,
   CommonModule,
  ],
  declarations: [
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent 
  ],
  providers: [
    DatePipe,
    BlogService
  ]
})
export class BlogModule {}
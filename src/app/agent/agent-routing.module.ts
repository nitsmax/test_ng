import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UsersComponent } from './users/users.component';
import {UserComponent} from './user/user.component';
import {EmojisComponent } from './emojis/emojis.component';
import {EmojiComponent} from './emoji/emoji.component';
import {CategoriesComponent } from './categories/categories.component';
import {CategoryComponent} from './category/category.component';
import {SettingsComponent} from './settings/settings.component';
import {UserResolverService} from '../services/user-resolver.service';
import {EmojiResolverService} from '../services/emoji-resolver.service';
import {CategoryResolverService} from '../services/category-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'emojis'},  
  {
    path: 'users', component: UsersComponent,
  },
  {
    path: 'create-user', component: UserComponent,
  },
  {
    resolve: {
      story: UserResolverService,
    },
    path: 'edit-user/:user_id', component: UserComponent,
  },
  {
    path: 'emojis', component: EmojisComponent,
  },
  {
    path: 'create-emoji', component: EmojiComponent,
  },
  {
    resolve: {
      story: EmojiResolverService,
    },
    path: 'edit-emoji/:emoji_id', component: EmojiComponent,
  },
  {
    path: 'categories', component: CategoriesComponent,
  },
  {
    path: 'create-category', component: CategoryComponent,
  },
  {
    resolve: {
      story: CategoryResolverService,
    },
    path: 'edit-category/:category_id', component: CategoryComponent,
  },
  {
    path: 'settings', component: SettingsComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }

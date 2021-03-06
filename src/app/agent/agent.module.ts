import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgentRoutingModule } from './agent-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { EmojisComponent } from './emojis/emojis.component';
import { EmojiComponent } from './emoji/emoji.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { CountryComponent} from './country/country.component';
import { CountriesComponent } from './countries/countries.component';
import {VoucherComponent} from './voucher/voucher.component';
import {VouchersComponent } from './vouchers/vouchers.component';
import { SettingsComponent } from './settings/settings.component';



/* Material UI imports begins here */
import {MatIconModule,MatCardModule,MatInputModule,
MatOptionModule,MatSelectModule,MatCheckboxModule,MatButtonModule,MatPaginatorModule,MatSortModule,MatTableModule,MatNativeDateModule,MatDatepickerModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

/* Material UI imports ends here */


/* Services imports begins here */
import { UserService } from '../services/user.service';
import {UserResolverService} from '../services/user-resolver.service';
import { EmojiService } from '../services/emoji.service';
import {EmojiResolverService} from '../services/emoji-resolver.service';
import { CategoryService } from '../services/category.service';
import {CategoryResolverService} from '../services/category-resolver.service';
import {CountryService} from '../services/country.service';
import {CountryResolverService} from '../services/country-resolver.service';
import {VoucherService} from '../services/voucher.service';
import {VoucherResolverService} from '../services/voucher-resolver.service';
/* Services imports ends here */

import { AutofocusDirective } from '../directives/autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    
    AgentRoutingModule,
    
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    MatSliderModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule

  ],
  declarations: [UsersComponent,UserComponent,EmojisComponent,EmojiComponent,CategoriesComponent,CategoryComponent,CountriesComponent,CountryComponent,VouchersComponent,VoucherComponent,SettingsComponent,AutofocusDirective],
  providers:[UserService,UserResolverService,EmojiService,EmojiResolverService,CategoryService,CategoryResolverService,CountryService,CountryResolverService,VoucherService,VoucherResolverService]
})
export class AgentModule { }

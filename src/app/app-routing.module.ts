import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UserDetailsComponent } from "./users/user-details/user-details.component";
import { UserListComponent } from "./users/user-list/user-list.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    children: [
      {
        path: "users",
        component: UserListComponent,
      },
      {
        path: "users/:id",
        component: UserDetailsComponent,
      },
    ],
  },
  { path: "**", component: NotFoundComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

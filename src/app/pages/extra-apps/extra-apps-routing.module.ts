import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/layout/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// Extra apps
import { GithubExploreComponent } from 'src/app/pages/extra-apps/github-explore/github-explore.component'
import { GithubDiscussComponent } from 'src/app/pages/extra-apps/github-discuss/github-discuss.component'
import { JiraDashboardComponent } from 'src/app/pages/extra-apps/jira-dashboard/jira-dashboard.component'
import { JiraAgileBoardComponent } from 'src/app/pages/extra-apps/jira-agile-board/jira-agile-board.component'
import { TodoistListComponent } from 'src/app/pages/extra-apps/todoist-list/todoist-list.component'
import { DigitaloceanDropletsComponent } from 'src/app/pages/extra-apps/digitalocean-droplets/digitalocean-droplets.component'
import { DigitaloceanCreateComponent } from 'src/app/pages/extra-apps/digitalocean-create/digitalocean-create.component'
import { GoogleAnalyticsComponent } from 'src/app/pages/extra-apps/google-analytics/google-analytics.component'
import { HelpdeskDashboardComponent } from 'src/app/pages/extra-apps/helpdesk-dashboard/helpdesk-dashboard.component'
import { WordpressPostComponent } from 'src/app/pages/extra-apps/wordpress-post/wordpress-post.component'
import { WordpressPostsComponent } from 'src/app/pages/extra-apps/wordpress-posts/wordpress-posts.component'
import { WordpressAddComponent } from 'src/app/pages/extra-apps/wordpress-add/wordpress-add.component'

const routes: Routes = [
  {
    path: 'github-explore',
    component: GithubExploreComponent,
    data: { title: 'Github Explore' },
    canActivate: [AuthGuard],
  },
  {
    path: 'github-discuss',
    component: GithubDiscussComponent,
    data: { title: 'Github Discuss' },
    canActivate: [AuthGuard],
  },
  {
    path: 'jira-dashboard',
    component: JiraDashboardComponent,
    data: { title: 'Jira Dashboard' },
    canActivate: [AuthGuard],
  },
  {
    path: 'jira-agile-board',
    component: JiraAgileBoardComponent,
    data: { title: 'Jira Agile Board' },
    canActivate: [AuthGuard],
  },
  {
    path: 'todoist-list',
    component: TodoistListComponent,
    data: { title: 'Todoist List' },
    canActivate: [AuthGuard],
  },
  {
    path: 'digitalocean-droplets',
    component: DigitaloceanDropletsComponent,
    data: { title: 'Digitalocean Droplets' },
    canActivate: [AuthGuard],
  },
  {
    path: 'digitalocean-create',
    component: DigitaloceanCreateComponent,
    data: { title: 'Digitalocean Create' },
    canActivate: [AuthGuard],
  },
  {
    path: 'google-analytics',
    component: GoogleAnalyticsComponent,
    data: { title: 'Google Analytics' },
    canActivate: [AuthGuard],
  },
  {
    path: 'helpdesk-dashboard',
    component: HelpdeskDashboardComponent,
    data: { title: 'Helpdesk Dashboard' },
    canActivate: [AuthGuard],
  },
  {
    path: 'wordpress-post',
    component: WordpressPostComponent,
    data: { title: 'Wordpress Post' },
    canActivate: [AuthGuard],
  },
  {
    path: 'wordpress-posts',
    component: WordpressPostsComponent,
    data: { title: 'Wordpress Posts' },
    canActivate: [AuthGuard],
  },
  {
    path: 'wordpress-add',
    component: WordpressAddComponent,
    data: { title: 'Wordpress Add' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class ExtraAppsRouterModule {}

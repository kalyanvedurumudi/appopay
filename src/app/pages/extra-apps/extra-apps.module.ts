import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { ExtraAppsRouterModule } from './extra-apps-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SortablejsModule } from 'ngx-sortablejs'
import { NestableModule } from 'ngx-nestable'

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

const COMPONENTS = [
  GithubExploreComponent,
  GithubDiscussComponent,
  JiraDashboardComponent,
  JiraAgileBoardComponent,
  TodoistListComponent,
  DigitaloceanDropletsComponent,
  DigitaloceanCreateComponent,
  GoogleAnalyticsComponent,
  HelpdeskDashboardComponent,
  WordpressPostComponent,
  WordpressPostsComponent,
  WordpressAddComponent,
]

@NgModule({
  imports: [
    SharedModule,
    ExtraAppsRouterModule,
    WidgetsComponentsModule,
    FormsModule,
  
    SortablejsModule,
    PerfectScrollbarModule,
    NestableModule,
  ],
  declarations: [...COMPONENTS],
})
export class ExtraAppsModule {}

export const getMenuData: any[] = [
  {
    category: true,
    title: 'Dashboards',
  },
  /*{
    title: 'Dashboards',
    key: 'dashboards',
    icon: 'fe fe-home',
    count: 6,
    children: [
      {
        title: 'Analytics',
        key: 'dashboardAnalytics',
        url: '/dashboard/analytics',
      },
      {
        title: 'Statistics',
        key: 'dashboardStatistics',
        url: '/dashboard/statistics',
      },
      {
        title: 'Ecommerce',
        key: 'dashboardEcommerce',
        url: '/dashboard/ecommerce',
      },
      {
        title: 'Crypto',
        key: 'dashboardCrypto',
        url: '/dashboard/crypto',
      },
      {
        title: 'Crypto Terminal',
        key: 'dashboardCryptoTerminal',
        url: '/dashboard/crypto-terminal',
      },
      {
        title: 'Jira',
        key: 'dashboardJira',
        url: '/dashboard/jira',
      },
      {
        title: 'Helpdesk',
        key: 'dashboardHelpdesk',
        url: '/dashboard/helpdesk',
      },
    ],
  },
  {
    category: true,
    title: 'Apps & Pages',
  },*/
  // {
  //   title: 'System Pages',
  //   key: 'system',
  //   icon: 'fe fe-user',
  //   children: [
  //     {
  //       title: 'Login',
  //       key: 'systemLogin',
  //       url: '/system/login',
  //     },
  //     {
  //       title: 'Forgot Password',
  //       key: 'systemForgotPassword',
  //       url: '/system/forgot-password',
  //     },
  //     {
  //       title: 'Register',
  //       key: 'systemRegister',
  //       url: '/system/register',
  //     },
  //     {
  //       title: 'Lockscreen',
  //       key: 'systemLockscreen',
  //       url: '/system/lockscreen',
  //     },
  //     {
  //       title: 'Page 404',
  //       key: 'system404',
  //       url: '/system/404',
  //     },
  //     {
  //       title: 'Page 500',
  //       key: 'system500',
  //       url: '/system/500',
  //     },
  //   ],
  // },


  {
    title: 'My Cards',
    key: 'mycards',
    icon: 'fe fe-shopping-cart',
    children: [
      {
        title: 'All Cards',
        key: 'allcards',
        url: '/customers/allcards',
      },

    ],
  },
  {
    title: 'Add Fund',
    key: 'addfund',
    icon: 'fe fe-user',
    children: [
      {
        title: 'Claim Request',
        key: 'claimRequest',
        url: '/customers/claimrequest',
      },
      {
        title: 'Bank',
        key: 'basecurrency',
        url: '/customers/basecurrency',
      },
      {
        title: 'Card',
        key: 'cardbasecurrency',
        url: '/customers/cardbasecurrency',
      },
      {
        title: 'CK Editor',
        key: 'CKEditor',
        url: '/customers/ckeditor',
      }

    ],
  },

  {
    title: 'Payments',
    key: 'payments',
    icon: 'fe fe-shopping-cart',
    children: [
      {
        title: 'Pay Bills',
        key: 'payBills',
        url: '/customers/paybills',
      },
      {
        title: 'Topup Airtime',
        key: 'topupAirtime',
        url: '/customers/topupairtime',
      },


    ],
  },


  {
    title: 'Transfers',
    key: 'transfers',
    icon: 'fe fe-shopping-cart',
    children: [
      {
        title: 'E-Transfers',
        key: 'etransfers',
        url: '/customers/etransfers',
      },
      {
        title: 'Bank Deposits',
        key: 'bankDeposits',
        url: '/customers/bankdeposits',
      },

      {
        title: 'Intra Account Transfers',
        key: 'intraaccountTransfers',
        url: '/customers/intraaccounttransfers',
      },

      {
        title: 'Account Transfers',
        key: 'accountTransfers',
        url: '/customers/accounttransfers',
      },
    ],
  },

  {
    title: 'Money Transfer',
    key: 'moneyTransfer',
    icon: 'fe fe-shopping-cart',
    children: [
      {
        title: 'Send Money',
        key: 'sendMoney',
        url: '/customers/sendmoney',
      },
      {
        title: 'Transfer Status',
        key: 'transferStatus',
        url: '/customers/transferstatus',
      },
    ],
  },

  {
    title: 'Customer Support',
    key: 'customersupport',
    icon: 'fe fe-shopping-cart',
    url: '/customers/customersupport',
  },

  {
    title: 'Bank Jet',
    key: 'bankjet',
    icon: 'fe fe-shopping-cart',
    children: [
      {
        title: 'Start Enrollment',
        key: 'startenrollment',
        url: '/customers/startenrollment',
      },
      {
        title: 'Complete Enrollment',
        key: 'completeenrollment',
        url: '/customers/completeenrollment',
      },
      {
        title: 'Account Settings',
        key: 'accountsettings',
        url: '/customers/accountsettings',
      },
      {
        title: 'Status & Activation Of Card',
        key: 'statusactivationcard',
        url: '/customers/statusactivationcard',
      },
      {
        title: 'Quick Switch',
        key: 'quickswitch',
        url: '/customers/quickswitch',
      },
      {
        title: 'Balance Transaction',
        key: 'balancetransaction',
        url: '/customers/balancetransaction',
      },
      {
        title: 'Bank To Bank(ACH) Transfer',
        key: 'banktobanktransfer',
        url: '/customers/banktobanktransfer',
      },
      {
        title: 'Direct Payment',
        key: 'directpayment',
        url: '/customers/directpayment',
      },
    ],
  },

  /*{
    title: 'Ecommerce',
    key: 'ecommerce',
    icon: 'fe fe-shopping-cart',
    children: [
      {
        title: 'Dashboard',
        key: 'ecommerceDashboard',
        url: '/ecommerce/dashboard',
      },
      {
        title: 'Orders',
        key: 'ecommerceOrders',
        url: '/ecommerce/orders',
      },
      {
        title: 'Propduct Catalog',
        key: 'ecommerceProductCatalog',
        url: '/ecommerce/product-catalog',
      },
      {
        title: 'Product Details',
        key: 'ecommerceProductDetails',
        url: '/ecommerce/product-details',
      },
      {
        title: 'Cart',
        key: 'ecommerceCart',
        url: '/ecommerce/cart',
      },
    ],
  },
  {
    title: 'Apps',
    key: 'apps',
    icon: 'fe fe-database',
    children: [
      {
        title: 'Messaging',
        key: 'appsCart',
        url: '/apps/messaging',
      },
      {
        title: 'Calendar',
        key: 'appsCalendar',
        url: '/apps/calendar',
      },
      {
        title: 'Mail',
        key: 'appsMail',
        url: '/apps/mail',
      },
      {
        title: 'Profile',
        key: 'appsProfile',
        url: '/apps/profile',
      },
      {
        title: 'Gallery',
        key: 'appsGallery',
        url: '/apps/gallery',
      },
    ],
  },
  {
    title: 'Extra Apps',
    key: 'extraApps',
    icon: 'fe fe-hard-drive',
    children: [
      {
        title: 'Github Explore',
        key: 'extraAppsGithubExplore',
        url: '/extra-apps/github-explore',
      },
      {
        title: 'Github Discuss',
        key: 'extraAppsGithubDiscuss',
        url: '/extra-apps/github-discuss',
      },
      {
        title: 'Digitalocean Droplets',
        key: 'extraAppsDigitaloceanDroplets',
        url: '/extra-apps/digitalocean-droplets',
      },
      {
        title: 'Digitalocean Create',
        key: 'extraAppsDigitaloceanCreate',
        url: '/extra-apps/digitalocean-create',
      },
      {
        title: 'Google Analytics',
        key: 'extraAppsGoogleAnalytis',
        url: '/extra-apps/google-analytics',
      },
      {
        title: 'Wordpress Post',
        key: 'extraAppsWordpressPost',
        url: '/extra-apps/wordpress-post',
      },
      {
        title: 'Wordpress Posts',
        key: 'extraAppsWordpressPosts',
        url: '/extra-apps/wordpress-posts',
      },
      {
        title: 'Wordpress Add',
        key: 'extraAppsWordpressAdd',
        url: '/extra-apps/wordpress-add',
      },
      {
        title: 'Todoist List',
        key: 'extraAppsTodoistList',
        url: '/extra-apps/todoist-list',
      },
      {
        title: 'Jira Dashboard',
        key: 'extraAppsJiraDashboard',
        url: '/extra-apps/jira-dashboard',
      },
      {
        title: 'Jira Agile Board',
        key: 'extraAppsJiraAgileBoard',
        url: '/extra-apps/jira-agile-board',
      },
      {
        title: 'Helpdesk Dashboard',
        key: 'extraAppsHelpdeskDashboard',
        url: '/extra-apps/helpdesk-dashboard',
      },
    ],
  },
  {
    category: true,
    title: 'Components',
  },
  {
    title: 'Bootstrap',
    key: 'bootstrap',
    icon: 'fe fe-bookmark',
    url: '/ui-kits/bootstrap',
  },
  {
    title: 'Ant Design',
    key: 'antDesign',
    icon: 'fe fe-bookmark',
    url: '/ui-kits/antd',
  },
  {
    title: 'Widgets',
    key: 'widgets',
    icon: 'fe fe-image',
    count: 47,
    children: [
      {
        title: 'General',
        key: 'widgetsGeneral',
        url: '/widgets/general',
      },
      {
        title: 'Lists',
        key: 'widgetsLists',
        url: '/widgets/lists',
      },
      {
        title: 'Tables',
        key: 'widgetsTables',
        url: '/widgets/tables',
      },
      {
        title: 'Charts',
        key: 'widgetsCharts',
        url: '/widgets/charts',
      },
    ],
  },
  {
    title: 'Cards',
    key: 'cards',
    icon: 'fe fe-credit-card',
    children: [
      {
        title: 'Basic Cards',
        key: 'cardsBasicCards',
        url: '/cards/basic-cards',
      },
      {
        title: 'Tabbed Cards',
        key: 'cardsTabbedCards',
        url: '/cards/tabbed-cards',
      },
    ],
  },
  {
    title: 'Tables',
    key: 'tables',
    icon: 'fe fe-pie-chart',
    children: [
      {
        title: 'Bootstrap',
        key: 'tablesBootstrap',
        url: '/tables/bootstrap',
      },
      {
        title: 'Ant Design',
        key: 'tablesAntd',
        url: '/tables/antd',
      },
    ],
  },
  {
    title: 'Charts',
    key: 'charts',
    icon: 'fe fe-home',
    children: [
      {
        title: 'Chartist.js',
        key: 'chartsChartistjs',
        url: '/charts/chartistjs',
      },
      {
        title: 'Chart.js',
        key: 'chartsChartjs',
        url: '/charts/chartjs',
      },
      {
        title: 'C3',
        key: 'chartsC3',
        url: '/charts/c3',
      },
    ],
  },
  {
    title: 'Icons',
    key: 'icons',
    icon: 'fe fe-star',
    children: [
      {
        title: 'Feather Icons',
        key: 'iconsFeatherIcons',
        url: '/icons/feather-icons',
      },
      {
        title: 'Fontawesome',
        key: 'iconsFontawesome',
        url: '/icons/fontawesome',
      },
      {
        title: 'Linearicons Free',
        key: 'iconsLineariconsFree',
        url: '/icons/linearicons-free',
      },
      {
        title: 'Icomoon Free',
        key: 'iconsIcomoonFree',
        url: '/icons/icomoon-free',
      },
    ],
  },
  {
    category: true,
    title: 'Advanced',
  },
  {
    title: 'Form Examples',
    key: 'formExamples',
    icon: 'fe fe-menu',
    url: '/advanced/form-examples',
  },
  {
    title: 'Email Templates',
    key: 'emailTemplates',
    icon: 'fe fe-mail',
    url: '/advanced/email-templates',
  },
  {
    title: 'Pricing Tables',
    key: 'pricingTables',
    icon: 'fe fe-command',
    url: '/advanced/pricing-tables',
  },
  {
    title: 'Invoice',
    key: 'invoice',
    icon: 'fe fe-file-text',
    url: '/advanced/invoice',
  },
  {
    title: 'Utilities',
    key: 'utilities',
    icon: 'fe fe-inbox',
    url: '/advanced/utilities',
  },
  {
    title: 'Grid',
    key: 'grid',
    icon: 'fe fe-grid',
    url: '/advanced/grid',
  },
  {
    title: 'Typography',
    key: 'typography',
    icon: 'fe fe-type',
    url: '/advanced/typography',
  },
     {
     title: 'Profile ',
    key: 'profile',
    icon: 'fe fe-shopping-cart',
        url: '/customers/profile',
      },*/

]

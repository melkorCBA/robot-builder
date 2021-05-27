import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../part/PartInfo.vue';
import BrowseParts from '../part/BrowseParts.vue';
import RobotHeads from '../part/RobotHeads.vue';
import RobotArms from '../part/RobotArms.vue';
import RobotTorsos from '../part/RobotTorsos.vue';
import RobotBases from '../part/RobotBases.vue';
import Sidebar from '../sidebars/Sidebar.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';
import Cart from '../cart/Cart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: HomePage,
        sidebar: Sidebar,
      },
    },
    {
      path: '/build',
      name: 'Build',
      components: {
        default: RobotBuilder,
        sidebar: SidebarBuild,
      },
    },
    {
      path: '/part/browse',
      name: 'BrowseParts',
      component: BrowseParts,
      children: [
        {
          path: 'heads',
          name: 'Heads',
          component: RobotHeads,
        },
        {
          path: 'arms',
          name: 'Arms',
          component: RobotArms,
        },
        {
          path: 'torsos',
          name: 'Torsos',
          component: RobotTorsos,
        },
        {
          path: 'bases',
          name: 'Bases',
          component: RobotBases,
        },
      ],
    },
    {
      path: '/part/:type/:id',
      name: 'Part',
      component: PartInfo,
      props: true,
      beforeEnter(to, from, next) {
        next(Number.isInteger(Number(to.params.id)));
      },
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
  ],
});

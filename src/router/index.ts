import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import createRouter from 'brdgm-commons/src/util/router/createRouter'
import { name } from '@/../package.json'
import SetupGame from '@/views/SetupGame.vue'
import SetupBot from '@/views/SetupBot.vue'
import CycleIncome from '@/views/CycleIncome.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import TurnBot from '@/views/TurnBot.vue'
import CycleEnd from '@/views/CycleEnd.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/cycle/:cycle/income',
    name: 'CycleIncome',
    component: CycleIncome
  },
  {
    path: '/cycle/:cycle/turn/:turn/player/:player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/cycle/:cycle/turn/:turn/bot/:bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/cycle/:cycle/end',
    name: 'EndOfRound',
    component: CycleEnd
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')
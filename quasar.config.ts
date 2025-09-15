import { quasar } from '@quasar/vite-plugin'

export default {
  framework: {
    config: {},
    components: 'all',
    directives: 'all',
    plugins: ['Notify', 'Dialog']
  }
}

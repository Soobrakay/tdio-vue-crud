import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '../../src/App.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('App', () => {
  it('renders sub-components when created', () => {
    const wrapper = shallowMount(App, { localVue, router })

    expect(wrapper.name()).toMatch('App')
    expect(wrapper.findAll('.header-title').exists()).toBeTruthy()
    expect(wrapper.findAll('.navigation-links').exists()).toBeTruthy()
    expect(wrapper.findAll('.data-content').exists()).toBeTruthy()
    expect(wrapper.findAll('.footer').exists()).toBeTruthy()
  })
})

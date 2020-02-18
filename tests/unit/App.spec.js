import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('renders sub-components when created', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.name()).toMatch('App')
    expect(wrapper.findAll('.header-title').exists()).toBeTruthy()
    expect(wrapper.findAll('.navigation-links').exists()).toBeTruthy()
    expect(wrapper.findAll('.data-content').exists()).toBeTruthy()
    expect(wrapper.findAll('.footer').exists()).toBeTruthy()
  })
})

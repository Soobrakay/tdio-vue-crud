import { shallowMount } from '@vue/test-utils'
import Footer from '../../../src/components/Footer.vue'

describe('Footer', () => {
  it('renders message when created', () => {
    const wrapper = shallowMount(Footer, {
      propsData: { message: 'testdriven.io 2019' }
    })
    expect(wrapper.name()).toMatch('Footer')
    expect(wrapper.text()).toMatch('testdriven.io 2019')
  })
})

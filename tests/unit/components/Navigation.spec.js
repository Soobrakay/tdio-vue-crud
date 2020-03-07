import { shallowMount, createLocalVue } from '@vue/test-utils'
import Navigation from '../../../src/components/Navigation.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('Navigation', () => {
  it('renders navigation links when created', () => {
    const wrapper = shallowMount(Navigation, { localVue, router })
    expect(wrapper.name()).toMatch('Navigation')

    expect(wrapper.findAll('li').length).toEqual(3)
    expect(wrapper.findAll('li').at(0).text()).toMatch('Home')
    expect(wrapper.findAll('li').at(1).text()).toMatch('About')
    expect(wrapper.findAll('li').at(2).text()).toMatch('Blog')
  })
})

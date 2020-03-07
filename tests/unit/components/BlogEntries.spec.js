import { shallowMount } from '@vue/test-utils'
import BlogEntries from '../../../src/components/BlogEntries.vue'

describe('BlogEntries.vue Test', () => {
  it('renders three blog posts when component is created', () => {
    const wrapper = shallowMount(BlogEntries)

    expect(wrapper.name()).toMatch('BlogEntries')

    expect(wrapper.findAll('h2').length).toEqual(3)
    expect(wrapper.findAll('h2').at(0).text())
      .toMatch('My Favorite Aspects of Vue')
    expect(wrapper.findAll('h2').at(1).text())
      .toMatch('How to Use Components to Build Complex Web Applications')
    expect(wrapper.findAll('h2').at(2).text())
      .toMatch('Unit Testing a Vuex Store')
  })
})

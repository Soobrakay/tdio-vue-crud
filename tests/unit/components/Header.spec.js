import { shallowMount } from '@vue/test-utils'
import Header from '../../../src/components/Header.vue'

describe('Header', () => {
  it('renders message when created', () => {
    const wrapper = shallowMount(Header, { propsData: { title: 'Zombies' } })
    expect(wrapper.name()).toMatch('Header')
    expect(wrapper.text()).toMatch('Zombies')
  })
})

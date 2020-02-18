import { shallowMount } from '@vue/test-utils'
import ListUsers from '@/components/ListUsers.vue'

describe('ListUsers', () => {
  it('renders a table of users when created', () => {
    const wrapper = shallowMount(ListUsers, {
      propsData: {
        users: [
          {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com'
          },
          {
            id: 2,
            name: 'Test User #2',
            username: 'user_2',
            email: 'test2@gmail.com'
          }
        ]
      }
    })
    expect(wrapper.name()).toMatch('ListUsers')
    expect(wrapper.findAll('h1').length).toEqual(1)
    expect(wrapper.findAll('h1').at(0).text()).toMatch('List of Users:')

    expect(wrapper.findAll('th').length).toEqual(4)
    expect(wrapper.findAll('th').at(0).text()).toMatch('User ID')
    expect(wrapper.findAll('th').at(1).text()).toMatch('Name')
    expect(wrapper.findAll('th').at(2).text()).toMatch('Username')
    expect(wrapper.findAll('th').at(3).text()).toMatch('Email')

    expect(wrapper.findAll('td').length).toEqual(8)
    expect(wrapper.findAll('td').at(0).text()).toMatch('1')
    expect(wrapper.findAll('td').at(1).text()).toMatch('Test User #1')
    expect(wrapper.findAll('td').at(2).text()).toMatch('user_1')
    expect(wrapper.findAll('td').at(3).text()).toMatch('test1@gmail.com')
    expect(wrapper.findAll('td').at(4).text()).toMatch('2')
    expect(wrapper.findAll('td').at(5).text()).toMatch('Test User #2')
    expect(wrapper.findAll('td').at(6).text()).toMatch('user_2')
    expect(wrapper.findAll('td').at(7).text()).toMatch('test2@gmail.com')
  })
})

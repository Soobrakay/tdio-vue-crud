import { shallowMount } from '@vue/test-utils'
import Banner from '@/components/Banner.vue'

describe('Banner', () => {
  let wrapper = null

  afterEach(() => {
    wrapper.destroy()
  })

  it('it initializes with error message', () => {
    wrapper = shallowMount(Banner, {
      propsData: {
        message: 'Message 123',
        status: 'Error'
      }
    })

    expect(wrapper.vm.message).toMatch('Message 123')
    expect(wrapper.vm.status).toMatch('Error')
    expect(wrapper.vm.color).toMatch('red')
  })

  it('it initializes with success message', () => {
    wrapper = shallowMount(Banner, {
      propsData: {
        message: 'Zombies!',
        status: 'Success'
      }
    })

    expect(wrapper.vm.message).toMatch('Zombies!')
    expect(wrapper.vm.status).toMatch('Success')
    expect(wrapper.vm.color).toMatch('green')
  })

  it('it initializes with info message', () => {
    wrapper = shallowMount(Banner, {
      propsData: {
        message: 'Powah!',
        status: 'Info'
      }
    })

    expect(wrapper.vm.message).toMatch('Powah!')
    expect(wrapper.vm.status).toMatch('Info')
    expect(wrapper.vm.color).toMatch('blue')
  })

  it('initializes as blue (info) without status', () => {
    wrapper = shallowMount(Banner, { propsData: { message: 'Powah!' } })
    expect(wrapper.vm.color).toMatch('blue')
  })

  it('emits clear-banner when clear is clicked', () => {
    wrapper = shallowMount(Banner, {
      propsData: {
        message: 'Zombies!',
        status: 'Success'
      }
    })

    wrapper.find('span').trigger('click')
    expect(wrapper.emitted('clear-banner')).toBeTruthy()
    expect(wrapper.emitted('clear-banner').length).toEqual(1)
  })
})

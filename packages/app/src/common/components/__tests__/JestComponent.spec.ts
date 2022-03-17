import { render } from '@testing-library/vue'
import DemoComponent from '../JestDemoComponent.vue'

describe('Demo', () => {
  test('it should have message text "hi"', async () => {
    const user = render(DemoComponent, {
      propsData: {
        message: 'hi',
      },
    })
  
    expect(await user.findByText('hi')).toBeTruthy()
  })
})
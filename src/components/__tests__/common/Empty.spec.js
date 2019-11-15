import { shallowMount } from '@vue/test-utils';

import Empty from '@/components/common/Empty';

describe('Empty.vue', () => {
  it('renders title', () => {
    const wrapper = shallowMount(Empty);
    expect(wrapper.find('h2').element.textContent).toBe('Oops');
  });
});

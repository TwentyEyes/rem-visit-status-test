import RemVisitStatusTest from './rem-visit-status-test.vue'

export default {
	title: 'reminStore/Visit Status',
	component: RemVisitStatusTest,
  argTypes: {
    progressBarColor: { control: 'color' },
    name: { control: 'text'}
  },
}

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { RemVisitStatusTest },
	template: `<div style="maxWidth: 400px; margin: 0 auto;">
  <rem-visit-status-test v-bind="$props" />
  </div>
  `
})

export const VisitBox = Template.bind({})
VisitBox.storyName = 'TEST STORY'
VisitBox.args = {
  ...VisitBox.args,
	name: 'SAMPLE VISIT STATUS BOX',
	completedValue: 20,
	totalValue: 100,
	fontSize: '30px',
	progress: 20,
	progressBarColor: '#fef9d7',
	FontSizeValue: '50px',
	boxColor: {
		backgroundColor: '#c3cfe2'
	}
}





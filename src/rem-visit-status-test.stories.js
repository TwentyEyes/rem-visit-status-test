import RemVisitStatusTest from './rem-visit-status-test.vue'

export default {
	title: 'reminStore/Visit Status',
	component: RemVisitStatusTest,
	argTypes: {
		progressBarColor: { control: false },
		name: { control: 'text' },
		boxColor: { control: 'color' },
    completedValue: { control: 'text' },
    totalValue: { control: 'text' },
    progress: { control: 'number' },
    FontSizeValue: { control: 'text' },
    fontSize: { control: 'text' },
    active: { control: 'boolean' }
	}
}

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { RemVisitStatusTest },
	template: `<div style="maxWidth: 400px; margin: 0 auto;">
  <rem-visit-status-test v-bind="$props" />
  </div>
  `
})

export const Default = Template.bind({})
Default.storyName = 'Default'
Default.args = {
	...Default.args,
	name: 'VISIT STATUS BOX',
	completedValue: 20,
	totalValue: 100,
	fontSize: '30px',
	FontSizeValue: '50px',
	boxColor: '#c3cfe2',
}

export const Active = Template.bind({})
Active.storyName = 'Active'
Active.args = {
	...Active.args,
	name: 'VISIT STATUS BOX',
	completedValue: 20,
	totalValue: 100,
	fontSize: '30px',
	FontSizeValue: '50px',
	boxColor: '#c3cfe2',
  active: true
}

export const Progress = Template.bind({})
Progress.storyName = 'Progress'
Progress.args = {
	...Progress.args,
	name: 'VISIT STATUS BOX',
	completedValue: 20,
	totalValue: 100,
	fontSize: '30px',
	progress: 20,
	progressBarColor: '#fef9d7',
	FontSizeValue: '50px',
	boxColor: '#c3cfe2',
}
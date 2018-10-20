import React, { Fragment } from 'react'
import PageHelmet from '@/components/elements/PageHelmet'
import Section from '@/components/elements/Section'

const Error404 = () => {
	return (
		<Fragment>
			<PageHelmet page="404" />
			<Section>
				<h1 className="title">Page Not Found</h1>
			</Section>
		</Fragment>
	)
}

export default Error404
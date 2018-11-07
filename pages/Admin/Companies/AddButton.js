import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Toggle from '@/components/HOCs/Toggle'
import Icon from '@/components/Elements/Icon'
import Modal from '@/components/Elements/Modal'
import AddModal from './AddModal'

const AddButton = () => {
	return (
		<Toggle>
			{({ on, toggle }) => (
				<Fragment>
					<button className="button is-primary is-outlined" onClick={toggle}>
						<Icon icon={['fas', 'plus']} />
						<span>Добавить</span>
					</button>
					{on &&
						<Modal title="Добавить кампанию" onClose={toggle}>
							<AddModal onClose={toggle} />
						</Modal>
					}
				</Fragment>
			)}
		</Toggle>
	)
}

AddButton.propTypes = {
	
}

export default AddButton
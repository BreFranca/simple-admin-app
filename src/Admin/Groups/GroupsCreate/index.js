import React from "react"
import { required } from "../../../helpers/validation"

import { compose } from "redux"
import { connect } from "react-redux"

import * as actions from "../../../store/actions"

import { Flex, Content, Slice } from "./styles"

import Card from "../../../components/atoms/Card"
import { Button } from "../../../components/Button"
import { Input } from "../../../components/Input"
import PaymentSlice from '../../Payment/PaymentSlice'
import ButtonCreateGroup from "../ButtonCreateGroup"

class GroupsCreate extends React.Component {
	state = {
		groupInfo: {
			name: '',
			preset: null
		},
		defaultValue: 0,
		value: 0
	}

	componentDidMount = () => {
		this.getPlans()
	}

	getPlans = () => {
		this.props.getPlans()
		.then(response => {
			this.setState({
				plans: response,
				maxValue: response.length,
			})

			let value = this.state.plans.findIndex(plan => plan._id === 0)
			value = value + 1

			this.setState({
				defaultValue: value,
				value: value,
			})
		})
	}

	handleSlice = (value) => {
		const plan = this.state.plans[value - 1]
		this.setState((prevState) => ({
			value: value,
			plan: plan,
			groupInfo: {
				...prevState.groupInfo,
				plan: plan
			}
		}))
	}

	handleSubmit = () => {
		this.props.createNewGroup(this.state.groupInfo, () => this.props.history.push("/admin/groups/create/method"))
		.catch(error => this.props.setAlert(error.response.data.details.message, 'danger'))
	}

	handleChangePreset = event => {
		const preset = event.target.value
		this.setState((prevState) => ({
		groupInfo: {
			...prevState.groupInfo,
			preset: preset
		}
		}))
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState((prevState) => ({
			groupInfo: {
				...prevState.groupInfo,
				[name]: value
			}
		}))
	}

	disabled() {
		return (this.state.value === 0 || this.state.groupInfo.name === '')
	}

	render() {
		//TODO olhar o shouldComponentUpdate
		const { plansData } = this.props
		const { groupInfo, plan } = this.state

		return (
			<Card title="Novo Grupo">
				<Content>
					<p>Selecione a categoria de grupo que deseja:</p>
					<Flex>
						{/* <ButtonCreateGroup active={groupInfo.preset} onClick={this.handleChangePreset} value="casual" icon="casual" name="Família" /> */}
						<ButtonCreateGroup active={groupInfo.preset} onClick={this.handleChangePreset} value="condominium" icon="condominium" name="Condomínio" />
						<ButtonCreateGroup active={groupInfo.preset} onClick={this.handleChangePreset} icon="company" value="company" name="Empresa" />
						<ButtonCreateGroup active={groupInfo.preset} onClick={this.handleChangePreset} icon="syndicate" value="syndicate" name="Sindicato" />
					</Flex>
					{groupInfo.preset ?
						<React.Fragment>
							{plansData ?
								<Slice>
									<PaymentSlice
										label="Selecione a quantidade de membros:"
										maxValue={plansData.length === 0 ? 1 : plansData.length }
										value={this.state.value}
										onChange={this.value = this.handleSlice}
										members={plan ? plan.max_members : null}
										amount={plan ? plan.amount : null}
									/>
								</Slice>
							: null}
							<div className="input-group-container">
								<Input
									idName="name"
									name="name"
									type="text"
									label="Dê um nome ao seu grupo:"
									validate={required}
									maxlength="40"
									value={groupInfo.name}
									onChange={this.handleChange}
								/>
							</div>
							<div className="btn-group">
								<Button disabled={this.disabled()} onClick={this.handleSubmit} className="button">
									Continuar Compra
								</Button>
							</div>
						</React.Fragment>
					: null}
				</Content>
			</Card>
		)
	}
}

function mapStateToProps(state) {
    return {
        plansData: state.payments.plansData,
        alert: state.ui.alert
    }
}

export default compose(
	connect(
		mapStateToProps,
		actions
	)
)(GroupsCreate)

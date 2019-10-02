import React from 'react'

import arrow from '../../../_assets/images/arrow-right.png'

import { compose } from "redux"
import { connect } from "react-redux"

import * as actions from "../../../store/actions"

import { Button } from "../../../components/atoms/Button"

import PaymentCardPackage from '../PaymentCardPackage'
import PaymentCard from '../PaymentCard'
import PaymentCardHeader from '../PaymentCardHeader'
import PaymentSlice from '../PaymentSlice'

import { Container } from './styles'

class PaymentUpgrade extends React.Component {
    state = {
        defaultValue: null,
        value: 0,
        maxValue: 1,
        plans: [],
        plan: null,
        actualDiscount: null,
        actualValuePerMember: 0,
        newDiscount: null,
        newValuePerMember: 0
    }
    componentDidMount = () => {
      this.props.loadGroup(this.props.match.params.idGroup)
        .then(response => {
            const { data } = response
            this.setState({
                plan: data.plan,
            })
            this.getPlans()
        })
    }

    componentDidUpdate = prevProps => {
        if (this.props.match.params.idGroup !== prevProps.match.params.idGroup) {
            this.props.loadGroup(this.props.match.params.idGroup)
            .then(response => {
                const { data } = response
                this.setState({
                    plan: data.plan,
                })
                this.getPlans()
            })
        }
    }

    getPlans = () => {
        this.props.getPlans()
        .then(response => {
            this.setState({
                plans: response,
                maxValue: response.length,
            })

            let value
            if(this.state.plan) {
                value = this.state.plans.findIndex(plan => plan._id === this.state.plan._id)
            } else {
                value = this.state.plans.findIndex(plan => plan._id === 0)
            }

            value = value + 1
            this.setState({
                defaultValue: value,
                value: value,
                actualDiscount: this.getDiscount(value),
                newDiscount: this.getDiscount(value),
            })
        })
    }

    getDiscount = (value) => {
        let discount;
        switch(value) {
            case 3:
                discount = 1
                break
            case 4:
                discount = 2
                break
            case 5:
                discount = 3
                break
            case 6:
                discount = 3.7
                break
            case 7:
                discount = 5
                break
            case 8:
                discount = 10
                break
            case 9:
                discount = 26.67
                break
            default:
                discount = null
                break
        }
        return discount
    }

    handleSlice = (value) => {
        if(this.state.defaultValue <= value) {
            const plan = this.state.plans[value - 1]
            this.setState({
                value: value,
                plan: plan,
                newDiscount: this.getDiscount(value),
            })
        } else {
            this.props.setAlert('Você não pode selecionar um plano menor', 'danger')
        }
    }

    handleSubmit = () => {
        if(JSON.stringify(this.state.plan) === JSON.stringify(this.props.groupData.plan)) {
            this.props.setAlert('Este plano é igual ao seu', 'warning')
        } else {
            this.props.setNewPlan(this.state.plan,
                () => this.props.history.push(`/admin/payments/${this.props.match.params.idGroup}/choose`))
        }
    }

    render() {
        const { groupData, plansData } = this.props
        const { plan, plans, actualDiscount, newDiscount } = this.state
        return(
            <Container>
                <PaymentCard>
                    <PaymentCardHeader title="Upgrade" name={groupData.name} />
                    <div className="infos">
                        {groupData.plan ?
                            <PaymentCardPackage
                                title="Pacote Atual"
                                type="current"
                                members={groupData.plan.max_members}
                                total={groupData.plan.amount}
                                discount={actualDiscount}
                            />
                        : null}
                        {this.state.plan != null ?
                            <React.Fragment>
                                <img src={arrow} alt="Arrow" />
                                <PaymentCardPackage
                                    title="Novo Pacote"
                                    members={plan.max_members}
                                    total={plan.amount}
                                    discount={newDiscount}
                                />
                            </React.Fragment>
                        : null}
                    </div>
                    {plansData ?
                        <div className="slice">
                            <PaymentSlice
                                label="Selecione a quantidade de membros:"
                                maxValue={plansData.length === 0 ? 1 : plansData.length }
                                value={this.state.value}
                                onChange={this.value = this.handleSlice}
                                members={plan ? plan.max_members : null}
                                amount={plan ? plan.amount : null}
                            />
                        </div>
                    : null}
                    {plans ?
                        plan ?
                            <div className="btns">
                                <Button onClick={this.handleSubmit}>Continuar Compra</Button>
                            </div>
                        : null
                    : null}
                </PaymentCard>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        plansData: state.payments.plansData,
        groupSubscriptions: state.groups.groupSubscriptions,
        groupData: state.groups.groupData,
        alert: state.ui.alert
    }
  }

export default compose(
    connect(
      mapStateToProps,
      actions
    )
  )(PaymentUpgrade)
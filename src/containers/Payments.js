import React, {Component} from "react"

import { compose } from "redux"
import { connect } from "react-redux"

import moment from 'moment'

import * as actions from "../store/actions"

import Modal from "../components/Modal"
import { Button } from "../components/Button"

import PaymentCardHeader from '../Admin/Payment/PaymentCardHeader'
import PaymentItemHeader from '../Admin/Payment/PaymentItemHeader'
import PaymentItem from '../Admin/Payment/PaymentItem'
import PaymentItemSubscription from '../Admin/Payment/PaymentItemSubscription'
import PaymentCard from '../Admin/Payment/PaymentCard'

class Payments extends Component {
  componentDidMount = () => {
    this.props.loadgroupSubscriptions(this.props.match.params.idGroup)
    this.props.loadGroup(this.props.match.params.idGroup)
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.idGroup !== prevProps.match.params.idGroup) {
      this.props.loadgroupSubscriptions(this.props.match.params.idGroup)
      this.props.loadGroup(this.props.match.params.idGroup)
    }
  }

  // getCustomer = (idCustomer) => {
  //   this.props.getCustomer(idCustomer)
  //     .then(response => {
  //       return response.name
  //     })
  // }

  getGroupPlanName = (idGroup) => {

  }

  handleCancelModal = () => {
    this.props.handleModal("modalShow")
  }

  handleCancel = () => {
    const { groupSubscriptions } = this.props
    const props = {
      subscriptionId: groupSubscriptions[0].subscription_id
    }
    this.props.cancelSubscription(props)
    .then(response => {
      this.props.setAlert('Assinatura Cancelada com sucesso', 'success')
    })
  }

  render() {
    const { idGroup } = this.props.match.params
    const { groupSubscriptions, groupSubscription, groupData } = this.props
    return (
      <div>
        <PaymentCard>
          <PaymentCardHeader
            status={groupData.status}
            title="Histórico de Pagamento do Grupo"
            name={groupData.name}
            header={true}
            signatureHeader={false}
            type="extract"
            idGroup={idGroup}
            // category={groupData.preset}
          />
          {groupSubscriptions.length > 0 ?
          <React.Fragment>
            <PaymentItemHeader />
            {groupSubscriptions.map((signature, index) => 
              <PaymentItem
                key={index}
                status={signature.status}
                boleto_url={signature.boleto_url}
                cod={signature.id}
                payment_method={signature.payment_method === "credit_card" ? "Cartão de crédito" : "Boleto"}
                date={new Date(signature.date_updated).toLocaleString()}
                payer={signature ? this.props.getCustomer(signature.metadata.payerCustomerId) : null}
              />
            )}
            </React.Fragment>
          : 
            <PaymentItem
              notFound={"Não há pagamentos"}
            />
          }
        </PaymentCard>
        <PaymentCard>
          <PaymentCardHeader
              title="Assinatura do Grupo"
              header={true}
              signatureHeader={true}
              idGroup={idGroup}
              type="subscription"
              plan={groupData.plan ? groupData.plan.name : null}
              signatureStatus={groupSubscription.status}
              subscription={groupSubscriptions.length > 0 ? true : false}
              onClickCancel={this.handleCancelModal}
            />
          {groupSubscriptions.length > 0 ?
            groupSubscriptions.slice(0, 1).map((signature, index) => 
              <PaymentItemSubscription
                key={index}
                payment_method={groupSubscription.payment_method}
                card_last_digits={groupSubscription.payment_method === "credit_card" ? groupSubscription.card.last_digits : null}
                expiration_date={groupSubscription.payment_method === "credit_card" ? groupSubscription.card.expiration_date : null}
                holder_name={groupSubscription.payment_method === "credit_card" ? groupSubscription.card.holder_name : null}
              />
            )
          : <PaymentItemSubscription notFound="Não há Assinatura" />
          }
        </PaymentCard>
        <Modal className="center">
            <h3>Atenção</h3>
            <p style={{margin: '10px 0px'}}>Sua assinatura será cancelada e não terá mais faturas geradas para o próximo mês.
            {
              groupSubscription.current_period_end ?
              <>
                <br />A assinatura será cancelada e o plano do grupo estará vigente até {moment(groupSubscription.current_period_end).format('LLL')}.
              </> :
              null
            }
            <br />Lembrando que depois do período vigente da assinatura, o grupo será congelado.</p>
          <Button color="grey" onClick={() => this.props.handleModal("modalHide")}>Voltar</Button>
          <Button onClick={this.handleCancel}>Sim, desejo continuar</Button>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    groupSubscriptions: state.groups.groupSubscriptions,
    groupSubscription: state.groups.groupSubscription,
    groupData: state.groups.groupData
  }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(Payments)
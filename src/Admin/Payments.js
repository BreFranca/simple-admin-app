import React, {Component} from "react"

import { compose } from "redux"
import { connect } from "react-redux"
import moment from 'moment'


import * as actions from "../store/actions"

import Modal from "../components/Modal"
import { Button } from "../components/Button"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import PaymentCardHeader from '../Admin/Payment/PaymentCardHeader'
import PaymentItemSubscription from '../Admin/Payment/PaymentItemSubscription'
import PaymentItem from '../Admin/Payment/PaymentItem'
import PaymentCard from '../Admin/Payment/PaymentCard'
import PaymentSubscriptionCard from "./Payment/PaymentSubscriptionCard";

class Payments extends Component {
  
  componentDidMount = () => {
    if(this.props.userLogged) {
      this.props.getUserLogged()
        .then(
          this.props.getCustomerSubscription(this.props.userLogged._id)
        )
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.idGroup !== prevProps.match.params.idGroup) {
      if(this.props.userLogged) {
        this.props.getCustomerSubscription(this.props.userLogged._id)
      }
      this.props.loadgroupSubscriptions(this.props.match.params.idGroup)
      // this.props.loadGroup(this.props.match.params.idGroup)
    }
  }

  // getCustomer = (idCustomer) => {
  //   this.props.getCustomer(idCustomer)
  //     .then(response => {
  //       return response.name
  //     })
  // }

  getGroupPlanStatus = (idGroup) => {
    this.props.getGroupInfo(idGroup)
    .then(response => {
      const { data } = response
      const status = data.status
      return status
    })
    .then(response => {return response})
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
    const { groupSubscription, groupSubscriptions, customerSubscriptions } = this.props
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true
    }
    return (
      <div>
        <PaymentCard>
          <PaymentCardHeader title="Minhas Assinaturas" />
          {customerSubscriptions.length > 0 ?
            <Slider {...settings}>
              {customerSubscriptions.map((subscription, index) => 
                <PaymentSubscriptionCard
                  key={index}
                  title={subscription.metadata.groupName}
                  plan={subscription.plan.name}
                />
              )}
            </Slider>
          :
            <PaymentItem
              notFound={"Não há assinaturas"}
            />
          }
        </PaymentCard>
        <PaymentCard>
          <PaymentCardHeader
              title="Meus Pagamentos"
              header={true}
              signatureHeader={true}
              idGroup={idGroup}
              type="subscription"
              subscription={groupSubscriptions.length > 0 ? true : false}
              onClickCancel={this.handleCancelModal}
            />
          {groupSubscriptions.length > 0 ?
            groupSubscriptions.slice(0, 1).map((signature, index) => 
              <PaymentItemSubscription
                key={index}
                payment_method={signature.payment_method}
                card_last_digits={signature.payment_method === "credit_card" ? signature.card.last_digits : null}
                expiration_date={signature.payment_method === "credit_card" ? signature.card.expiration_date : null}
                holder_name={signature.payment_method === "credit_card" ? signature.card.holder_name : null}
              />
            )
          : <PaymentItemSubscription notFound="Não há pagamentos" />
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
    groupData: state.groups.groupData,
    userLogged: state.auth.userLogged,
    customerSubscriptions: state.payments.customerSubscriptions,
    customerTransactions: state.payments.customerTransactions
  }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(Payments)
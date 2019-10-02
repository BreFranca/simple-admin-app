import React, {Component} from "react"

import { compose } from "redux"
import { connect } from "react-redux"
import moment from 'moment'

import * as actions from "../store/actions"

import Modal from "react-responsive-modal"
import { Button } from "../components/Button"
import { LoadingComponent } from '../components/Loading/LoadingComponent'
import PaymentCardHeader from '../Admin/Payment/PaymentCardHeader'
import PaymentItemHeader from '../Admin/Payment/PaymentItemHeader'
import PaymentItem from '../Admin/Payment/PaymentItem'
import PaymentItemSubscription from '../Admin/Payment/PaymentItemSubscription'
import PaymentCard from '../Admin/Payment/PaymentCard'

class GroupPayment extends Component {

  constructor() {
    super()
    this.state = {
      modal: false,
      modalDelete: false,
      transferModal: false,
      transferCustomer: null,
      localLoading: false
    }
  }

  temp = []

  componentDidMount = () => {
    this.setState({localLoading: true})
    this.props.loadgroupSubscriptions(this.props.match.params.idGroup)
    this.props.loadGroup(this.props.match.params.idGroup)
  }

  componentDidUpdate = prevProps => {
    if (this.state.localLoading === true) {
      setTimeout(() => {
        this.checkUpdate()
      }, 500);
    }
    if (this.props.match.params.idGroup !== prevProps.match.params.idGroup) {
      this.setState({localLoading: true})
      this.props.loadgroupSubscriptions(this.props.match.params.idGroup)
      this.props.loadGroup(this.props.match.params.idGroup)
    }
  }

  componentWillUpdate() {
    if (this.state.localLoading === true) {
      this.temp.push({})
    }
  }

  checkUpdate() {
    this.temp.pop()
    if (this.temp.length === 0 && this.state.localLoading === true) {
      this.setState({localLoading: false})
    }
  }

  manageModal = (nameModal, visible) => {
    return this.setState({ [nameModal]: visible })
  }

  handleCancelModal = () => {
    this.manageModal("modal", true)
  }
  
  handleDelete = () => {
    this.manageModal('modalDelete', true)
  }

  confirmDeleteGroup = () => {
    this.props.deleteGroup(this.props.match.params.idGroup, () => {
    })
    .then(response => {
      const { data } = response
      if(response.status === 500) {
        this.props.setAlert(data.details, 'danger')
      } else if(response.status === 400) {
        this.props.setAlert(data.details, 'danger')
      } else {
        this.props.history.push("/admin/")
        this.props.setAlert('Grupo desativado com sucesso', 'success')
      }
      this.manageModal('modalDelete', false)
    })
  }

  handleCancel = () => {
    const { groupSubscriptions } = this.props
    const props = {
      subscriptionId: groupSubscriptions[0].subscription_id
    }
    this.props.cancelSubscription(props)
    .then(response => {
      this.props.setAlert('Assinatura Cancelada com sucesso', 'success')
      this.manageModal('modal', false)
    })
    .catch((e) => {
      this.props.setAlert("Internal Server Error", "danger")
      this.manageModal('modal', false)
    })
  }

  handleTransfer(event) {
    this.setState({transferCustomer: event.target.value})
  }

  handleTransferModal() {
    this.manageModal('transferModal', true)
  }

  transferGroup() {
    this.props.transferGroup(this.props.groupData._id, this.state.transferCustomer).then(() => {
      this.manageModal('transferModal', false)
      alert('Grupo transferido com sucesso')
    }).catch((error) => {
      alert(error)
    })
  }

  render() {
    const { idGroup } = this.props.match.params
    const { groupSubscriptions, groupSubscription, groupData } = this.props
    return (
      <>
      {
        this.state.localLoading === true ? <LoadingComponent /> :
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
              deleteGroup={groupSubscriptions.length === 0 ? () => this.handleDelete() : null}
              transfer={this.handleTransferModal.bind(this)}
              userLogged={this.props.userLogged ? this.props.userLogged._id : null}
              createdBy={this.props.groupData ? this.props.groupData.createdBy : null}
              plan={groupData.plan ? groupData.plan.name : null}
            />
            {groupSubscriptions.length > 0 ?
            <React.Fragment>
              <PaymentItemHeader />
              {groupSubscriptions.map((signature, index) => 
              <PaymentItem
                  key={index}
                  status={signature.status}
                  cod={signature.id}
                  boleto_url={signature.boleto_url}
                  payment_method={signature.payment_method === "credit_card" ? "Cartão de crédito" : "Boleto"}
                  plan={groupData.plan ? groupData.plan.name : null}
                  date={signature.payment_method === "credit_card" ? '' : new Date(signature.boleto_expiration_date).toLocaleString()}
                  paid_date={signature.status === 'paid' || signature.status === 'authorized' ? new Date(signature.date_updated).toLocaleString() : ''}
                  payer={signature.customer ? signature.customer.name ? signature.customer.name : signature.customer.email : null}
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
                modify={groupData.status === 'deactivated' ? false : true}
                cancel={groupSubscription !== 'canceled' ? true : false}
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
          <Modal
            open={this.state.transferModal}
            onClose={() => this.manageModal('transferModal', false)}
            center
          >
            <div style={{textAlign: 'center'}}>
              <br />
              <h3>Selecione um membro para transferir o grupo</h3>
              <div onChange={this.handleTransfer.bind(this)} className="opa" style={{display: 'flex', margin: '15px 0px', flexDirection: 'column', alignItems: 'start'}}>
                {
                  this.props.groupData && this.props.groupData.members.map((member) => {
                    if (member._id === this.props.userLogged._id) {
                      return null
                    }
                    return (
                      <div key={member._id}>
                        <input type="radio" value={member._id} /> {member.name}
                      </div>
                    )
                  })
                }
              </div>
              <Button onClick={() => {
                this.manageModal('transferModal', false)
                this.setState({transferCustomer: null})
              }} type="button" color="grey">Voltar</Button>
              <Button onClick={this.transferGroup.bind(this)} disabled={this.state.transferCustomer === null}>Transferir</Button>
            </div>
          </Modal>
          <Modal
            open={this.state.modal}
            onClose={() => this.manageModal('modal', false)}
            center
          >
            <div style={{textAlign: 'center'}}>
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
            </div>
          </Modal>
          <Modal
            open={this.state.modalDelete}
            onClose={() => this.manageModal('modalDelete', false)}
            center
          >
            <div style={{textAlign: 'center'}}>
              <h3>Atenção</h3>
              <p>Tem certeza que deseja apagar o Grupo?</p>
              <br />
              <Button onClick={() => this.manageModal('modalDelete', false)} type="button" color="grey">Voltar</Button>
              <Button type="button" onClick={() => this.confirmDeleteGroup()}>Sim, desejo continuar</Button>
            </div>
          </Modal>
        </div>
      }
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    groupSubscriptions: state.groups.groupSubscriptions,
    groupSubscription: state.groups.groupSubscription,
    groupData: state.groups.groupData,
    userLogged: state.auth.userLogged,
    loading: state.ui.loading
  }
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(GroupPayment)
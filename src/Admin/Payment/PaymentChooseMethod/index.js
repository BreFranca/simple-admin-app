import React from 'react'

import { compose } from "redux"
import { connect } from "react-redux"

import imageCVC from "../../../_assets/images/cvc.png"

import { Button } from "../../../components/atoms/Button"
import { FontIcon } from "../../../components/atoms/FontIcon"

import CPF from 'gerador-validador-cpf'

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatCPF,
    formatCNPJ
  } from './utils';

import * as actions from "../../../store/actions"

import pagarme from 'pagarme'

import PaymentCard from "../PaymentCard"
import PaymentCardHeader from "../PaymentCardHeader"
import { PaymentInput } from "../PaymentInput"
import { PaymentTabs, PaymentTab, PaymentTabContent } from "../PaymentTabMethod"

import { Container } from './styles'

class PaymentMethod extends React.Component {
    state = {
        credit_card: {
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            issuer: null
        },
        focused: null,
        activeTab: 0,
        preview: false,
        show_form: false,
        payment_method: "credit_card",
        documentOption: 'cpf'
    }

    componentDidMount = () => {
        if(this.props.newPlan === null) {
            this.props.history.push(`/admin/payments/${this.props.match.params.idGroup}/upgrade`)
        }
        this.props.loadGroup(this.props.match.params.idGroup)
          .then(response => {
              const { data } = response

              this.props.loadLastSubscription(this.props.match.params.idGroup)
              .then(response => {
                    if(response) {
                        this.setState({
                            payment_method: response.payment_method,
                            idSubscription: response.id
                        })
                        this.setState({
                            credit_card: {
                                ...this.state.credit_card,
                                number: "",
                                name: "",
                                expiry: "",
                                issuer: null
                            },
                            show_form: true
                        })
                    } else {
                        this.setState({
                            credit_card: {
                                ...this.state.credit_card,
                                number: "",
                                name: "",
                                expiry: "",
                                issuer: null
                            },
                            show_form: true,
                            payment_method: "credit_card"
                        })
                    }
              })

              this.setState({
                  groupData: data
              })
          })
    }


    handleOptionChange = (changeEvent) => {
        console.log(changeEvent)
        this.setState({
            documentOption: changeEvent.target.value
        });
    }

    handleChange = ({ target }) => {
        if (target.name === 'cpf') {
            target.value = formatCPF(target.value)
            this.setState({ cpf: target.value })
            if (CPF.validate(target.value)) {
              this.setState({validatedCpfError: null})
            } else {
              this.setState({validatedCpfError: "CPF Inválido"})
            }
        } else if(target.name === 'cnpj') { 
            target.value = formatCNPJ(target.value)
            this.setState({ cnpj: target.value })
        } else if (target.name === 'company') {
            this.setState({ company : target.value })
        } else {
            if (target.name === 'number') {
                target.value = formatCreditCardNumber(target.value);
            } else if (target.name === 'expiry') {
                target.value = formatExpirationDate(target.value);
            } else if (target.name === 'cvc') {
                target.value = formatCVC(target.value);
            }
        
            this.setState({
                credit_card: {
                    ...this.state.credit_card,
                    [target.name]: target.value
                }
            });
        }
    };


    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleSubmit = () => {
        const { credit_card, payment_method, idSubscription } = this.state
        const { newPlan, groupData, userLogged } = this.props

        let props = {
            planId: newPlan.plan_id,
            paymentMethod: payment_method
        }
        if(idSubscription) {
            props = {
                ...props,
                idSubscription: idSubscription,
            }
        } else {
            props = {
                ...props,
                customerInfo: {
                    id: userLogged._id,
                    email: userLogged.email,
                    name: userLogged.name
                },
                groupInfo: {
                    name: groupData.name,
                    id: groupData._id
                },
            }
        }

        if(payment_method === "credit_card") {
            if(this.state.cpf){
                props.customerInfo.documentType = 'cpf'
                props.customerInfo.document = this.state.cpf.replace(/\D+/g, '');
            }
            pagarme.client.connect({ encryption_key: process.env.REACT_APP_ENCRYPTION_KEY_PAGARME })
            .then(client => {
                return client.security.encrypt({
                    card_number: credit_card.number,
                    card_holder_name: credit_card.name,
                    card_expiration_date: credit_card.expiry,
                    card_cvv: credit_card.cvc
                })
            })
            .then(cardHash => {
                props = {
                    ...props,
                    cardHash: cardHash
                }
                this.props.paymentNewPlan(props)
                .then(response => {
                    if(response) {
                        if(response.status === 500) {
                            this.props.setAlert(response.data.details.response.errors[0].message, 'danger')
                        } else if(response.status === 400) {
                            this.props.setAlert(response.data.details, 'danger')
                        } else {
                            this.props.setAlert('Pagamento atualizado com sucesso', 'success')
                            this.props.history.push(`/admin/groups/${this.props.match.params.idGroup}/dashboard`)
                        }
                    } else {
                        this.props.setAlert('Pagamento atualizado com sucesso', 'success')
                        this.props.history.push(`/admin/groups/${this.props.match.params.idGroup}/dashboard`)
                    }
                })
            })
        } else {
            if(this.state.cpf){
                props.customerInfo.documentType = 'cpf'
                props.customerInfo.document = this.state.cpf.replace(/\D+/g, '');
            }
            if(this.state.cnpj){
                props.customerInfo.name = this.state.company
                props.customerInfo.documentType = 'cnpj'
                props.customerInfo.document = this.state.cnpj.replace(/\D+/g, '');
            }
            this.props.paymentNewPlan(props)
            .then(response => {
                this.props.setAlert('Pagamento atualizado com sucesso', 'success')
                this.props.history.push(`/admin/groups/${this.props.match.params.idGroup}/dashboard`)
            })
        }
    }

    handleChangeCard = () => {
        this.setState({
            show_form: true,
            credit_card: {
                number: "",
                name: "",
                expiry: "",
                cvc: "",
                issuer: null
            }
        })
    }

    chooseValue = (event) => {
        this.setState({
            payment_method: event.target.value
        })
    }

    render() {
        const { credit_card, focused, show_form, payment_method } = this.state
        return(
            <Container>
                <PaymentCard>
                    <PaymentCardHeader title="Escolher meio de Pagamento" />
                    <PaymentTabs>
                        <PaymentTab value="credit_card" onClick={this.chooseValue} className={payment_method === "credit_card" ? "active" : null }>
                            <FontIcon name="credit-card" /> Cartão de crédito
                        </PaymentTab>
                        <PaymentTab value="boleto" onClick={this.chooseValue} className={payment_method === "boleto" ? "active" : null }>
                            <FontIcon name="file" /> Boleto bancário
                        </PaymentTab>
                    </PaymentTabs>
                    <PaymentTabContent className={payment_method === "credit_card" ? "active" : null }>
                        <div className="content-card">
                            {show_form ?
                                <div className="form-card">
                                    <div className="input-group">
                                        <PaymentInput
                                            label="Número do Cartão"
                                            type="tel"
                                            name="number"
                                            pattern="[\d| ]{16,22}"
                                            required={true}
                                            onChange={this.handleChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <PaymentInput
                                            label="Nome do Titular"
                                            type="text"
                                            name="name"
                                            maxLength="100"
                                            className="form-control"
                                            required={true}
                                            onChange={this.handleChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <PaymentInput
                                            label="Número do CPF"
                                            placeholder="Digite o número do seu CPF"
                                            type="tel"
                                            name="cpf"
                                            pattern="\d\d/\d\d"
                                            required={true}
                                            onChange={this.handleChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                        {
                                            this.state.validatedCpfError ?
                                            <span className="validateError">{this.state.validatedCpfError}</span> :
                                            null
                                        }
                                    </div>
                                    <div className="input-back">
                                        <div className="input-group">
                                            <PaymentInput
                                                label="Validade"
                                                type="tel"
                                                name="expiry"
                                                pattern="\d\d/\d\d"
                                                required
                                                onChange={this.handleChange}
                                                onFocus={this.handleInputFocus}
                                                />
                                        </div>
                                        <div className="input-group input-cvc">
                                            <PaymentInput
                                                label="Código"
                                                type="tel"
                                                name="cvc"
                                                pattern="\d{3,4}"
                                                required={true}
                                                onChange={this.handleChange}
                                                onFocus={this.handleInputFocus}
                                                />
                                            <img src={imageCVC} alt="CVC" />
                                        </div>
                                    </div>
                                </div>
                            : null }
                            <div className="card-content">
                                <Cards
                                    number={credit_card.number}
                                    name={credit_card.name}
                                    expiry={credit_card.expiry}
                                    cvc={credit_card.cvc}
                                    focused={focused}
                                    preview={true}
                                    placeholders={{name: "Seu nome aqui", valid: "Validade"}}
                                    locale={{valid: "Validade"}}
                                    issuer={credit_card.issuer}
                                />
                                {show_form ? null : 
                                    <div className="btn-card">
                                        <button onClick={this.handleChangeCard}>Alterar cartão de crédito</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </PaymentTabContent>

                    <PaymentTabContent className={payment_method === "boleto" ? "active" : null }>
                        <div className="radio-bar input-group">
                            <span className="input-radio">
                                <input type="radio" value="cpf" checked={this.state.documentOption === 'cpf'} onChange={this.handleOptionChange.bind(this)}/>
                                    <span className="radio-text">CPF</span>
                            </span>
                            <span className="input-radio">
                                <input type="radio" value="cnpj" checked={this.state.documentOption === 'cnpj'}  onChange={this.handleOptionChange.bind(this)}/>
                                    <span className="radio-text">CNPJ</span>
                            </span>
                        </div>
                        {   this.state.documentOption === 'cpf' ? 
                            <div className="input-cpf">
                                <PaymentInput
                                    label="Número do CPF"
                                    placeholder="Digite o número do seu CPF"
                                    type="tel"
                                    name="cpf"
                                    pattern="\d\d/\d\d"
                                    required={true}
                                    onChange={this.handleChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div> : 
                            <div>
                                <div className="input-cpf input-group">
                                    <PaymentInput
                                        label="Número do CNPJ"
                                        placeholder="Digite o número do seu CNPJ"
                                        type="tel"
                                        name="cnpj"
                                        pattern="\d\d/\d\d"
                                        required={true}
                                        onChange={this.handleChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="input-group">
                                    <PaymentInput
                                        label="Nome da Empresa"
                                        type="text"
                                        name="company"
                                        maxLength="100"
                                        className="form-control"
                                        required={true}
                                        onChange={this.handleChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                            </div>
                        }
     
                        {
                            this.state.validatedCpfError ?
                            <span className="validateError">{this.state.validatedCpfError}</span> :
                            null
                        }
                        <p>O prazo para pagamento do seu boleto é de 7 dias, e o prazo de liberação do grupo começa a ser contado a partir da confirmação de pagamento pela instituição bancária.</p>
                    </PaymentTabContent>
                    <div className="btns">
                        <Button onClick={this.handleSubmit}>Continuar Compra</Button>
                    </div>
                </PaymentCard>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        userLogged: state.auth.userLogged,
        groupData: state.groups.groupData,
        lastSubscription: state.payments.lastSubscription,
        newPlan: state.payments.newPlan
    }
  }

export default compose(
    connect(
      mapStateToProps,
      actions
    )
  )(PaymentMethod)
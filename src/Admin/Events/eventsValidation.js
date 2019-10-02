const eventsValidation = values => {
  const errors = []
  if (!values.length < 2){
    errors.name = 'O campo nao pode ser vazio'
  }
  return errors
}

export default eventsValidation
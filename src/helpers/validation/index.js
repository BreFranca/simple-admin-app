export const required = value => (value || typeof value === 'number' ? undefined : 'Obrigatório')
export const twoOptions = value => (value.length > 2 ? undefined : 'O mínimo de 2 opções para cada pergunta são requeridas')


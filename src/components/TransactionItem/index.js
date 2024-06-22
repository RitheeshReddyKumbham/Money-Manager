import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteClicked} = props
  const {id, title, amount, type} = transactionDetails

  const onDelete = () => {
    deleteClicked(id)
  }

  return (
    <li className="trans">
      <p className="vals">{title}</p>
      <p className="vals">Rs {amount}</p>
      <p className="vals">{type}</p>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem

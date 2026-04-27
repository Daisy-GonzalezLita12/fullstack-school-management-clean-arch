export const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <p>¿Estás seguro?</p>
      <button onClick={onConfirm}>Sí</button>
      <button onClick={onClose}>No</button>
    </div>
  )
}

export default ConfirmModal;

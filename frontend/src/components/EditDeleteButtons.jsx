export default function EditDeleteButtons({
  onClick,
  openForm,
  handleDelete,
  ariaLabel,
  classForm,
}) {
  return (
    <div className="edit-del-btns">
      <button
        className="edit-btn orange"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        aria-controls={classForm}
        onClick={() => {
          onClick();
          openForm();
        }}
      >
        Modifier
      </button>
      <button className="delete-btn red" onClick={handleDelete}>
        Supprimer
      </button>
    </div>
  );
}

export default function EditCreateButtons({
  onClick,
  ariaExpanded,
  ariaLabel,
  ariaControls,
  action,
  textBtn,
}) {
  const isCreate = action === "create";
  const isEdit = action === "edit";
  // "edit-btn orange"
  return (
    <button
      className={
        isEdit
          ? "edit-btn orange action-btn"
          : isCreate
            ? "create-btn green action-btn"
            : "open-form-btn action-btn"
      }
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      onClick={onClick}
    >
      {textBtn}
    </button>
  );
}

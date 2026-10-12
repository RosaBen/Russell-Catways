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
          ? "edit-btn orange"
          : isCreate
            ? "create-btn green"
            : "open-form-btn"
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

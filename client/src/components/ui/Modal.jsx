import Button from "./Button";

function Modal({
  children,
  btnClassNames,
  iconClassNames,
  btnTitle,
  actionBtnTitle,
  handleModalAction,
  task,
}) {
  return (
    <div className="font-figtree">
      <Button
        classNames={btnClassNames}
        iconClassNames={iconClassNames}
        onClick={() =>
          document.getElementById(`my_modal_${task?._id}`).showModal()
        }
      >
        {btnTitle && btnTitle}
      </Button>
      <dialog id={`my_modal_${task?._id}`} className="modal">
        <div className="modal-box bg-white">
          {children}
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">{actionBtnTitle[1]}</button>
              <button
                className="btn bg-red-700 text-white border-none hover:opacity-90 hover:border-solid hover:text-black"
                onClick={handleModalAction}
              >
                {actionBtnTitle[0]}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
